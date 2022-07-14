import axios from 'axios'
import { API_URL } from './authService';
import { Agent } from 'https';

export const Employee_URL = `${API_URL}/api/Employee`


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


export function GetEmployees() {
    return axios.get(`${Employee_URL}`, config);
}


export function GetEmployeeById(id: number) {
    return axios.get(`${Employee_URL}/${id}`, config);
}

export function PostEmployee(model: any) {
    console.log('model values in PostEmployee -- ', model);
    return axios.post(`${Employee_URL}`,
        model,config
    );
}

export function UpdateEmployee(id: number, model: any) {
    model.id = id;
    return axios.put(`${Employee_URL}/${id}`, model,config);
}

export function DeleteEmployee(id: number) {
    return axios.delete(`${Employee_URL}/${id}` ,config);
}
