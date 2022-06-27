import axios from 'axios'
import { API_URL } from './authService';
import { Agent } from 'https';

export const ExpenseType_URL = `${API_URL}/api/ExpenseType`

const agent = new Agent({
    rejectUnauthorized: false
});

export function GetExpenseTypes() {
    return axios.get(`${ExpenseType_URL}`, {httpsAgent : agent});
}


export function GetExpenseTypeById(id: number) {
    return axios.get(`${ExpenseType_URL}/${id}`, {httpsAgent : agent});
}

export function PostExpenseType(model: any) {
    console.log('model values in PostExpenseType -- ', model);
    return axios.post(`${ExpenseType_URL}`,
        model
    );
}

export function UpdateExpenseType(id: number, model: any) {
    model.id = id;
    return axios.put(`${ExpenseType_URL}/${id}`, model);
}

export function DeleteExpenseType(id: number) {
    return axios.delete(`${ExpenseType_URL}/${id}`);
}
