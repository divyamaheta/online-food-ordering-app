import React, { useContext, useState } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import Toast from '../Toast/Toast'
import PropTypes from 'prop-types';

function FoodItem ({id, name, price, description, image}) {
  const {cartItems, addToCart, removeFromCart, url} = useContext(StoreContext);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const handleAddToCart = () => {
    addToCart(id);
    setToastMessage(`${name} added to cart`);
    setToastType('success');
    setShowToast(true);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(id);
    setToastMessage(`${name} removed from cart`);
    setToastType('error');
    setShowToast(true);
  };

  return (
    <div className='food-item'>
        <Toast 
          message={toastMessage}
          show={showToast}
          onClose={() => setShowToast(false)}
          type={toastType}
        />
        <div className="food-item-img-container">
            <img className='food-item-image' src={url+"/images/"+image} alt="" />
            {!cartItems[id]
                ? <img className='add' onClick={handleAddToCart} src={assets.add_icon_white} alt="" />
                : <div className='food-item-counter'>
                    <img onClick={handleRemoveFromCart} src={assets.remove_icon_red} alt='' />
                    <p className='cartitemsp'>{cartItems[id]}</p>
                    <img onClick={handleAddToCart} src={assets.add_icon_green} alt='' />
                  </div>
            }
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p className='namewe'>{name}</p>
                <img className='ratingstars' src={assets.rating_starts} alt="" />
            </div>
            <p className="food-item-desc">{description}</p>
            <p className="food-item-price">${price}</p>
        </div>
    </div>
  )
}

FoodItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
};

export default FoodItem