import axios from 'axios'
import { API_URL } from './authService';
import { Agent } from 'https';

import Cookie from 'js-cookie'

export const AdministrationManager_URL = `${API_URL}/api/Administration`





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



export function GetAllUsers() {
    return axios.get(`${AdministrationManager_URL}/AllUsers` ,config);
}

export function GetUserById(id: string) {

    return axios.get(`${AdministrationManager_URL}/EditUserGet/${id}` ,config);

}

export function PostUser(model: any) {
    console.log('model values in PostRole -- ', model);
    return axios.post(`${AdministrationManager_URL}/CreateUserAccount`,
        model, config
    );
}

export function UpdateUser(id: any, model: any) {
    return axios.put(`${AdministrationManager_URL}/EditUserPut/${id}`, model, config);
}

export function DeleteUser(id: string, DeletedBy : any) {
    return axios.delete(`${AdministrationManager_URL}/DeleteUser/${id}?DeletedBy=${DeletedBy}`, config);
}
