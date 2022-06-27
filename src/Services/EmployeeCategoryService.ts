import axios from 'axios'
import { API_URL } from './authService';
import { Agent } from 'https';

export const EmployeeCategory_URL = `${API_URL}/api/EmployeeCategory`


const agent = new Agent({
    rejectUnauthorized: false
});




export function GetEmployeeCategories() {
    return axios.get(`${EmployeeCategory_URL}`, {
        httpsAgent: agent
    });
}


export function GetEmployeeCategoryById(id: number) {
    return axios.get(`${EmployeeCategory_URL}/${id}`, {
        httpsAgent: agent
    });
}

export function PostEmployeeCategory(model: any) {
    console.log('model values in PostEmployeeCategory -- ', model);
    return axios.post(`${EmployeeCategory_URL}`,
        model, {
        httpsAgent: agent
    }
    );
}

export function UpdateEmployeeCategory(id: number, model: any) {
    model.id = id;
    return axios.put(`${EmployeeCategory_URL}/${id}`, model, {
        httpsAgent: agent
    });
}

export function DeleteEmployeeCategory(id: number) {
    return axios.delete(`${EmployeeCategory_URL}/${id}`, {
        httpsAgent: agent
    });
}
