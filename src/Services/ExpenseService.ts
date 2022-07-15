import axios from 'axios'
import { API_URL } from './authService';
import { Agent } from 'https';

export const Expense_URL = `${API_URL}/api/Expense`


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


export function GetExpenses() {
    return axios.get(`${Expense_URL}`, config);
}


export function GetExpenseById(id: number) {
    return axios.get(`${Expense_URL}/${id}`, config);
}

export function PostExpense(model: any) {
    console.log('model values in PostExpense -- ', model);
    return axios.post(`${Expense_URL}`,
        model,config
    );
}

export function UpdateExpense(id: number, model: any) {
    console.log('Id in UpdateExpense Service ^^ == ', id);
    
    model.Id = id;

    console.log('model values in UpdateExpense Service ^^ == ', model);

    return axios.put(`${Expense_URL}/${id}`, model,config);
}

export function DeleteExpense(id: number, DeletedBy : any) {
    return axios.delete(`${Expense_URL}/${id}?DeletedBy=${DeletedBy}`,config);
}
