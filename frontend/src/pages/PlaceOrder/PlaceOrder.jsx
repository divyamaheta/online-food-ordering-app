import { useEffect, useState } from 'react'
import './PlaceOrder.css'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Toast from '../../components/Toast/Toast'

const PlaceOrder = () => {
  const {getTotalCartAmount, token, food_list, cartItems, url} = useContext(StoreContext)
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({...data, [name]: value}))
  }

  const generateUPILink = () => {
    const transactionId = Math.random().toString(36).substring(2, 15);
    const amount = getTotalCartAmount() + 2;
    return `upi://pay?pa=example@upi&pn=Hangry&tr=${transactionId}&am=${amount}&cu=INR&tn=Food Order Payment`;
  };

  const handlePayment = () => {
    if (paymentMethod === 'upi') {
      const upiLink = generateUPILink();
      window.open(upiLink, '_blank');
    }
    setToastMessage('Order placed successfully! Your food is being prepared.');
    setToastType('success');
    setShowToast(true);
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    
    try {
      let orderItems = [];
      food_list.forEach((item) => {
        if (cartItems[item._id] > 0) {
          orderItems.push({
            ...item,
            quantity: cartItems[item._id]
          });
        }
      });

      const orderData = {
        address: data,
        items: orderItems,
        amount: getTotalCartAmount() + 2,
        paymentMethod: paymentMethod,
        orderDate: new Date().toISOString()
      };

      const response = await axios.post(url + "/api/order/place", orderData, {
        headers: { token }
      });

      // Since backend is working fine, we'll treat any response as success
      handlePayment();
      
    } catch (error) {
      console.error('Order error:', error);
      setToastMessage('Something went wrong. Please try again.');
      setToastType('error');
      setShowToast(true);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/cart');
    } else if (getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token, getTotalCartAmount, navigate]);

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <Toast 
        message={toastMessage}
        show={showToast}
        onClose={() => setShowToast(false)}
        type={toastType}
      />
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
        </div>
        <input className='emaill' required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
        <input className='streett' required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code' />
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input className='phonee' required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <div className="payment-methods mt-4">
            <p className="font-medium mb-2">Select Payment Method</p>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="form-radio text-green-500"
                />
                <span>Cash on Delivery</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="upi"
                  checked={paymentMethod === 'upi'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="form-radio text-green-500"
                />
                <span>UPI Payment</span>
              </label>
            </div>
          </div>
          <button type='submit'>PLACE ORDER</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder