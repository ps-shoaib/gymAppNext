import axios from 'axios'
import { API_URL } from './authService';
import { Agent } from 'https';

export const EmployeeCategory_URL = `${API_URL}/api/EmployeeCategory`


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




export function GetEmployeeCategories() {
    return axios.get(`${EmployeeCategory_URL}`, config);
}


export function GetEmployeeCategoryById(id: number) {
    return axios.get(`${EmployeeCategory_URL}/${id}`, config);
}

export function PostEmployeeCategory(model: any) {
    console.log('model values in PostEmployeeCategory -- ', model);
    return axios.post(`${EmployeeCategory_URL}`,
        model, config
    );
}

export function UpdateEmployeeCategory(id: number, model: any) {
    model.id = id;
    return axios.put(`${EmployeeCategory_URL}/${id}`, model, config);
}

export function DeleteEmployeeCategory(id: number) {
    return axios.delete(`${EmployeeCategory_URL}/${id}`, config);
}
