import { instance } from "./instance";

export const getUsers = async (user) => {
    try {
        const response = await instance.get(`/user?search=${user}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        });
        if (response) {
            return response.data;
        }
    }
    catch (err) {
        throw err;
    }
}

export const handleInitiateChat = async (payload) => {
    try {
        const response = await instance.post('/chat/create-chat', payload, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        });
        if (response) {
            return response.data;
        }
    }
    catch (err) {
        throw err;
    }
}
 
export const getUserChats = async () => {
    try {
        const response = await instance.get('/chat/my-chat', {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        });
        if (response) {
            return response.data;
        }
    }
    catch (err) {
        throw err;
    }
}