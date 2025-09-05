import axios from "axios";

export const api = axios.create({
    baseURL: 'http://host.docker.internal:3001'
});