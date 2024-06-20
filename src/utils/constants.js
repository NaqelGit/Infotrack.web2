import axios from 'axios';
import { getToken } from './functions';
//const _baseURL = 'http://34.18.77.113';
const _baseURL = 'http://localhost:5216';

export const httpClient = axios.create({
    baseURL: _baseURL,
    headers: {
        Authorization: `Bearer ${ await getToken()}`, 
        'Content-Type': 'application/json'
   }
});
