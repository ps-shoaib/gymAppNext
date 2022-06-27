import axios from 'axios'
import { API_URL } from './authService';
import { Agent } from 'https';

export const Expense_URL = `${API_URL}/api/Expense`


const agent = new Agent({
    rejectUnauthorized: false
});


export function GetExpenses() {
    return axios.get(`${Expense_URL}`, {httpsAgent : agent});
}


export function GetExpenseById(id: number) {
    return axios.get(`${Expense_URL}/${id}`, {httpsAgent : agent});
}

export function PostExpense(model: any) {
    console.log('model values in PostExpense -- ', model);
    return axios.post(`${Expense_URL}`,
        model
    );
}

export function UpdateExpense(id: number, model: any) {
    console.log('Id in UpdateExpense Service ^^ == ', id);
    
    model.Id = id;

    console.log('model values in UpdateExpense Service ^^ == ', model);

    return axios.put(`${Expense_URL}/${id}`, model);
}

export function DeleteExpense(id: number) {
    return axios.delete(`${Expense_URL}/${id}`);
}
