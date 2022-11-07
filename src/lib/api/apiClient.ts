import axios from 'axios';
import config from '../../config';

const host = config.API_HOST;

const apiClient = axios.create({
  baseURL: host,
  withCredentials: true,
});

export default apiClient;
