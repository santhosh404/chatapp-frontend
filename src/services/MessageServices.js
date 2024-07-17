import { instance } from "./instance";


export const getAllMessages = async (chatId) => {
    try {
        const response = await instance.get(`message/all-messages?chatId=${chatId}`, {
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

export const sendMessage = async (payload) => {
    try {
        const response = await instance.post('message/send-message', payload, {
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