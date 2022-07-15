import axios from 'axios'
import { API_URL } from './authService';


import { Agent } from 'https';



import Cookie from 'js-cookie'


export const Member_URL = `${API_URL}/api/Member`

export const Employee_URL = `${API_URL}/api/Employee`




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



export function GetMembers() {
    return axios.get(`${Member_URL}`, config);
}


export function GetActiveMembers() {
    return axios.get(`${Member_URL}/GetActiveMembers`, config);
}

export function GetMemberById(id: number) {
    return axios.get(`${Member_URL}/${id}`, config);
}

export function PostMember(model: any) {
    console.log('model values in PostMember -- ', model);
    return axios.post(`${Member_URL}`,
        model,config
    );
}

export function UpdateMember(id: number, model: any) {
    model.id = id;
    return axios.put(`${Member_URL}/${id}`, model,config);
}

export function DeleteMember(id: number, DeletedBy : any) {
    return axios.delete(`${Member_URL}/${id}?DeletedBy=${DeletedBy}`,config);
}

export function GetTrainers() {
    return axios.get(`${Employee_URL}/GetTrainers`, config);
}


