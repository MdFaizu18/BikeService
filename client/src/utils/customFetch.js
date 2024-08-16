import axios from 'axios';

// Create a custom axios instance for API requests.
const customFetch = axios.create({
    baseURL: '/api/v1',
});

export default customFetch;