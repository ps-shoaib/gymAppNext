import axios from 'axios'
import { API_URL } from './authService';




export const Administration_URL = `${API_URL}/api/Administration`


export function GetAllUsers() {
    return axios.get(`${Administration_URL}`);
}


export function GetUserById(id: number) {
    return axios.get(`${Administration_URL}/${id}`);
}

export function PostUser(model: any) {
    console.log('model values in PostAdministration -- ', model);
    return axios.post(`${Administration_URL}`,
        model
    );
}

export function UpdateUser(id: number, model: any) {
    model.id = id;
    return axios.put(`${Administration_URL}/${id}`, model);
}

export function DeleteUser(id: number) {
    return axios.delete(`${Administration_URL}/${id}`);
}
