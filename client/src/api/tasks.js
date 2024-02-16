import api from '../utils/apiHelper';


export const getTasks = async () => {
    try {
        const res = await api.get(`/tasks`);
        return res;
    } catch (err) {
        return err.response.data;
    }
}
    
export const getTask = async (id) => {
    try {
        const res = await api.get(`/tasks/${id}`);
        return res;
    } catch (err) {
        return err.response.data;
    }
}

export const addTask = async (task) => {
    try {
        const res = await api.post(`/tasks`, task);
        return res;
    } catch (err) {
        return err.response.data;
    }
}

export const updateTask = async (id, task) => {
    try {
        const res = await api.put(`/tasks/${id}`, task);
        return res;
    } catch (err) {
        return err.response.data;
    }
}

export const deleteTask = async (id) => {
    try {
        const res = await api.delete(`/tasks/${id}`);
        return res;
    } catch (err) {
        return err.response.data;
    }
}
