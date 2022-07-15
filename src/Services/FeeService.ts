import axios from 'axios'
import { API_URL } from './authService';
import { Agent } from 'https';

export const Fee_URL = `${API_URL}/api/Fee`


import Cookie from 'js-cookie'

var UserObj = Cookie.get("UserObj");

console.log('UserObj == ', UserObj);

let token = "";

if (UserObj !== undefined) {
    token = JSON.parse(UserObj).accessToken;
}

console.log('token  in API service == ', token);


const agent = new Agent({
    rejectUnauthorized: false,
    
});

const config = {
    headers: {
        'Authorization': `Bearer ${token}`
    },
    httpsAgent : agent
}

export function GetFees() {
    return axios.get(`${Fee_URL}`, config);
}

export function GetAllDueFees(){
    return axios.get(`${Fee_URL}/DueFees`, config);
}


export function GetDueFeeById(id : number) {
    return axios.get(`${Fee_URL}/DueFees/${id}`, config);
}

export function GetFeeById(id: number) {
    return axios.get(`${Fee_URL}/${id}`, config);
}

export function PostFee(model: any) {
    console.log('model values in PostFee -- ', model);
    return axios.post(`${Fee_URL}`,
        model,config
    );
}

export function UpdateFee(id: number, model: any) {
    model.id = id;
    return axios.put(`${Fee_URL}/${id}`, model,config);
}

export function DeleteFee(id: number, DeletedBy : any) {
    return axios.delete(`${Fee_URL}/${id}?DeletedBy=${DeletedBy}`,config);
}


