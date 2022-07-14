import axios from 'axios'
import { API_URL } from './authService';

import { Agent } from 'https';

export const Plan_URL = `${API_URL}/api/Plan`


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

export function GetPlans() {
    return axios.get(`${Plan_URL}`, config);
}


export function GetPlanById(id: number) {
    return axios.get(`${Plan_URL}/${id}`, config);
}

export function PostPlan(model: any) {
    console.log('model values in PostPlan -- ', model);
    return axios.post(`${Plan_URL}`,
        model
    );
}

export function UpdatePlan(id: number, model: any) {
    model.id = id;
    return axios.put(`${Plan_URL}/${id}`, model,config);
}

export function DeletePlan(id: number) {
    return axios.delete(`${Plan_URL}/${id}`,config);
}
