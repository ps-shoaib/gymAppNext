import axios from 'axios'
import { API_URL } from './authService';
import { Agent } from 'https';

export const ExpenseType_URL = `${API_URL}/api/ExpenseType`

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

export function GetExpenseTypes() {
    return axios.get(`${ExpenseType_URL}`, config);
}


export function GetExpenseTypeById(id: number) {
    return axios.get(`${ExpenseType_URL}/${id}`, config);
}

export function PostExpenseType(model: any) {
    console.log('model values in PostExpenseType -- ', model);
    return axios.post(`${ExpenseType_URL}`,
        model,config
    );
}

export function UpdateExpenseType(id: number, model: any) {
    model.id = id;
    return axios.put(`${ExpenseType_URL}/${id}`, model,config);
}

export function DeleteExpenseType(id: number, DeletedBy : any) {
    return axios.delete(`${ExpenseType_URL}/${id}?DeletedBy=${DeletedBy}`,config);
}
