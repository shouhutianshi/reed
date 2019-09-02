const axios = require( "axios");
import { baseURL } from '../../config';

const instance = axios.create({
	baseURL,
	timeout: 3000,
});

instance.interceptors.request.use(config => config, error => Promise.reject(error));

instance.interceptors.response.use(response => response.data, error => Promise.reject(error));

module.exports = instance;
