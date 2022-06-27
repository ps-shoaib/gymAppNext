import axios from 'axios'
import { API_URL } from './authService';
import { Agent } from 'https';

export const Employee_URL = `${API_URL}/api/Employee`


const agent = new Agent({
    rejectUnauthorized: false
});


export function GetEmployees() {
    return axios.get(`${Employee_URL}`, { httpsAgent: agent });
}


export function GetEmployeeById(id: number) {
    return axios.get(`${Employee_URL}/${id}`, { httpsAgent: agent });
}

export function PostEmployee(model: any) {
    console.log('model values in PostEmployee -- ', model);
    return axios.post(`${Employee_URL}`,
        model
    );
}

export function UpdateEmployee(id: number, model: any) {
    model.id = id;
    return axios.put(`${Employee_URL}/${id}`, model);
}

export function DeleteEmployee(id: number) {
    return axios.delete(`${Employee_URL}/${id}`);
}
