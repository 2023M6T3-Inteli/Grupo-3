import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://localhost:5500/' // 'colocar dps o nosso site hospedado na aws'
})
axios.defaults.headers.common['Content-Type'] = 'application/json';

export const setAuthorizationHeader = (token: string) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export default instance;