import axios from 'axios'
import { API_URL } from './authService';


import { Agent } from 'https';



const agent = new Agent({
    rejectUnauthorized: false
});

export const Member_URL = `${API_URL}/api/Member`

export const Employee_URL = `${API_URL}/api/Employee`


export function GetMembers() {
    return axios.get(`${Member_URL}`, {httpsAgent : agent});
}


export function GetMemberById(id: number) {
    return axios.get(`${Member_URL}/${id}`, {httpsAgent : agent});
}

export function PostMember(model: any) {
    console.log('model values in PostMember -- ', model);
    return axios.post(`${Member_URL}`,
        model
    );
}

export function UpdateMember(id: number, model: any) {
    model.id = id;
    return axios.put(`${Member_URL}/${id}`, model);
}

export function DeleteMember(id: number) {
    return axios.delete(`${Member_URL}/${id}`);
}

export function GetTrainers() {
    return axios.get(`${Employee_URL}/GetTrainers`, {httpsAgent : agent});
}


