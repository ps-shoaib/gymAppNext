import axios from "axios"
import { string } from "yup"


export const API_URL = process.env.API_URL  || 'https://gym-api.ps-beta.com'

console.log('api url == ', API_URL);


 const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/api/Account/GetUserByToken`
 const LOGIN_URL = `${API_URL}/api/Account/Login`
 const REGISTER_URL = `${API_URL}/api/Account/SignUp`
 const REQUEST_PASSWORD_URL = `${API_URL}/api/Account/forgotPassword`
 const CONFIRM_EMAIL_URL = `${API_URL}/api/Account/ConfirmEmail`


 export function login( Email: string, Password: string) {
  
    console.log('Login URL --- ',LOGIN_URL);
    
    return axios.post(LOGIN_URL, {Email, Password})
  }
  
  // Server should return AuthModel
  export function register(Email: string, Firstname: string, Lastname: string, Password: string) {
  
    return axios.post(REGISTER_URL, {
      Email,
      Firstname,
      Lastname,
      Password,
    })
  }
  
  //-----------------------------------------
  export function confirmEmail(model : any) {
    console.log(
      'in confirm Email Function---- at line 34--- AuthCURD---model---',
       model
      );
    
    return axios.post(CONFIRM_EMAIL_URL, model)
  }
  
  // Server should return object => { result: boolean } (Is Email in DB)
  export function requestPassword(email: string) {
    return axios.post(REQUEST_PASSWORD_URL, {email})
  }
  
  export function getUserByToken() {
    // Authorization head should be fulfilled in interceptor.
    // Check common redux folder => setupAxios
    return axios.get(GET_USER_BY_ACCESSTOKEN_URL)
  }
  