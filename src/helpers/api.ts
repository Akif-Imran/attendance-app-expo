import axios from "axios";

export const session = "Spring-2022";
export const baseURL = "http://192.168.100.12:7048/api";
// export const baseURL = "http://192.168.43.222:7048/api"
export const api = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json'
    },
});