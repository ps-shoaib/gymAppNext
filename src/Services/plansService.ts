import axios from 'axios'
import { API_URL } from './authService';

import { Agent } from 'https';

export const Plan_URL = `${API_URL}/api/Plan`


const agent = new Agent({
    rejectUnauthorized: false
});

export function GetPlans() {
    return axios.get(`${Plan_URL}`, {httpsAgent : agent});
}


export function GetPlanById(id: number) {
    return axios.get(`${Plan_URL}/${id}`, {httpsAgent : agent});
}

export function PostPlan(model: any) {
    console.log('model values in PostPlan -- ', model);
    return axios.post(`${Plan_URL}`,
        model
    );
}

export function UpdatePlan(id: number, model: any) {
    model.id = id;
    return axios.put(`${Plan_URL}/${id}`, model);
}

export function DeletePlan(id: number) {
    return axios.delete(`${Plan_URL}/${id}`);
}
