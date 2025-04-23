import axios from 'axios';
import Clerk from '@clerk/nextjs';

export class ApiClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        if (!baseUrl) {
            throw new Error('BASE_URL is not defined');
        }
        this.baseUrl = baseUrl;
    }

    async get(path: string, params: any = {}, headers: any = {}) {
        try {
            const response = await axios.get(`${this.baseUrl}${path}`, { params, headers });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async post(path: string, data: any = {}, headers: any = {}) {
        try {
            const response = await axios.post(`${this.baseUrl}${path}`, data, { headers });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async put(path: string, data: any = {}, headers: any = {}) {
        try {
            const response = await axios.put(`${this.baseUrl}${path}`, data, { headers });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async delete(path: string, headers: any = {}) {
        try {
            const response = await axios.delete(`${this.baseUrl}${path}`, { headers });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async patch(path: string, data: any = {}, headers: any = {}) {
        try {
            const response = await axios.patch(`${this.baseUrl}${path}`, data, { headers });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

if (!baseUrl) {
    throw new Error('BASE_URL is not defined');
}

export const apiClient = new ApiClient(baseUrl);