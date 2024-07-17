import axios from "axios";


export const instance = axios.create({
    baseURL: 'https://ping-kar.onrender.com/api/v1', 
    headers: {
        'Content-Type': 'application/json',
        timeout : 30000,
    },
})

