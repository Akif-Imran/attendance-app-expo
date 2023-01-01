import axios from "axios";

const baseURL = "http://192.168.100.12:7049/api";
// const baseURL = "http://192.168.1.184:7049/api"
export const api = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json'
    },
});