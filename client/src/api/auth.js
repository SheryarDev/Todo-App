import axios from '../utils/apiHelper';

const BASE_URL = "http://localhost:5000/api";
export const login = async (data) => {
    try {
        const res = await axios.post(`${BASE_URL}/auth/login`, data);
        return res;
    } catch (err) {
        return err.response.data;
    }
}
    
export const register = async (data) => {
    try {
        const res = await axios.post(`${BASE_URL}/auth/register`, data);
        return res;
    } catch (err) {
        return err.response.data;
    }
}

export const me = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/auth/me`);
        return res;
    } catch (err) {
        return err.response.data;
    }
}