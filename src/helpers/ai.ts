import axios from 'axios';

const baseURL = "http://192.168.100.12:8000";
// const baseURL = "http://192.168.43.222:8000";
// export const baseURLAI = "http://192.168.43.222"

export const ai = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    }
})
export const aiImage = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "multipart/form-data"
    },
})