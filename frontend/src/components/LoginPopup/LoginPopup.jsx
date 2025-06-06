import { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"
import Toast from '../Toast/Toast'
import PropTypes from 'prop-types'

const LoginPopup = ({setShowLogin}) => {

  const {url,setToken} = useContext(StoreContext)
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const [currState,setCurrState] = useState("Login")
  const [data,setData] = useState({
    name:"",
    email:"test@gmail.com",
    password:"123456789"
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const onLogin = async (event) => {
    event.preventDefault()
    try {
      let newUrl = url;
      if (currState==="Login"){
        newUrl += "/api/user/login"
      }
      else{
        newUrl += "/api/user/register"
      }

      const response = await axios.post(newUrl,data);

      if (response.data.success){
        setToastMessage(currState === "Login" ? 'Logged in successfully!' : 'Account created successfully!');
        setToastType('success');
        setShowToast(true);
        setToken(response.data.token);
        localStorage.setItem("token",response.data.token)
        setTimeout(() => {
          setShowLogin(false);
        }, 1500);
      }
      else{
        setToastMessage(response.data.message || 'Authentication failed');
        setToastType('error');
        setShowToast(true);
      }
    } catch (error) {
      setToastMessage(
        error.response?.data?.message || 'Something went wrong. Please try again.'
      );
      setToastType('error');
      setShowToast(true);
    }
  }

  return (
    <div className='login-popup'>
      <Toast 
        message={toastMessage}
        show={showToast}
        onClose={() => setShowToast(false)}
        type={toastType}
      />
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={()=>{
            if (currState === "Login") {
              setToastMessage('Login cancelled');
              setToastType('error');
              setShowToast(true);
            }
            setTimeout(() => setShowLogin(false), 1500);
          }} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
          {currState==="Login"?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required/>}
          <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required/>
          <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required/>
        </div>
        <button type='submit'>{currState==="Sign Up"?"Create account":"Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required/>
          <p className='continuee'>By continuing, i agree to the terms of use & privacy policy</p>
        </div>
        {currState==="Login"
        ?<p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>
        :<p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login here</span></p>
        }
      </form>
    </div>
  )
}

LoginPopup.propTypes = {
  setShowLogin: PropTypes.func.isRequired
};

export default LoginPopup