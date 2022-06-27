import axios from 'axios'
import { API_URL } from './authService';
import { Agent } from 'https';

export const Fee_URL = `${API_URL}/api/Fee`


const agent = new Agent({
    rejectUnauthorized: false
});

export function GetFees() {
    return axios.get(`${Fee_URL}`, {httpsAgent : agent});
}

export function GetAllDueFees(){
    return axios.get(`${Fee_URL}/DueFees`, {httpsAgent : agent});
}


export function GetDueFeeById(id : number) {
    return axios.get(`${Fee_URL}/DueFees/${id}`, {httpsAgent : agent});
}

export function GetFeeById(id: number) {
    return axios.get(`${Fee_URL}/${id}`, {httpsAgent : agent});
}

export function PostFee(model: any) {
    console.log('model values in PostFee -- ', model);
    return axios.post(`${Fee_URL}`,
        model
    );
}

export function UpdateFee(id: number, model: any) {
    model.id = id;
    return axios.put(`${Fee_URL}/${id}`, model);
}

export function DeleteFee(id: number) {
    return axios.delete(`${Fee_URL}/${id}`);
}


