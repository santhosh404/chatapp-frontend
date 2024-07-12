import axios from "axios";
import { instance } from "./instance";


export const signUp = async (payload) => {
    try {
        const response = await instance.post('/user/signup', payload);
        if(response) {
            return response.data;
        }
    }
    catch(err) {
        throw err;
    }
}

export const signIn = async (payload) => {
    try {
        const response = await instance.post('/user/signin', payload);
        if(response) {
            return response.data;
        }
    }
    catch(err) {
        throw err;
    }
}