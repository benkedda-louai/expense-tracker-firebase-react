import {Navigate, useNavigate} from 'react-router-dom'
import { auth, provider } from '../../config/firebase-config'
import { signInWithPopup } from 'firebase/auth'
import './auth.css'
import {useGetUserInfo} from '../../hooks/useGetUserInfo'
import { useEffect } from 'react'
export const Auth = () => {
  const navigate = useNavigate();
  const isAuth = useGetUserInfo;
    const SignIn = async() => {
        const result = await signInWithPopup(auth, provider);
        const authInfo = {
            userId: result.user.uid,
            name: result.user.displayName,
            profilePhoto: result.user.photoURL,
            isAuth: true,
        }
        //set the authInfo in the localStorage with the auth key
        localStorage.setItem("auth", JSON.stringify(authInfo));
        //if the user was auth navigate them to expense_tracker page
        navigate("/expense_tracker")
        console.log(authInfo.isAuth);
  }
    if (isAuth) {
      return <Navigate to="/expense_tracker" />
    }
    return (
      <div className="login-page">
        <p>Sign In With Google to Continue</p>
        <button className="login-with-google-btn" onClick={SignIn}>
          Sign In With Google
        </button>
      </div>
    );
    };