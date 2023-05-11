import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://localhost:5500/' // 'colocar dps o nosso site hospedado na aws'
})

export default instance;