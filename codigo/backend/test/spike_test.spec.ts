import { sleep, check } from 'k6';
import http from 'k6/http';

export let options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  stages: [
    { duration: '10s', target: 100 }, 
    { duration: '1m', target: 100 },
    { duration: '10s', target: 1000 }, 
    { duration: '3m', target: 1000 },
    { duration: '10s', target: 100 }, 
    { duration: '3m', target: 100 },
    { duration: '10s', target: 0 }, 
  ],
};

const API_BASE_URL = 'http://localhost:5500';

export default function () {
  http.batch([
    ['GET', `${API_BASE_URL}/users`],
    ['GET', `${API_BASE_URL}/post`],
    ['POST', `${API_BASE_URL}/post`],
    ['GET', `${API_BASE_URL}/post/comment`],
    ['GET', `${API_BASE_URL}/ranking`],
    ['POST', `${API_BASE_URL}/user/setup/tags`],
    ['POST', `${API_BASE_URL}/auth/signup`],
    ['POST', `${API_BASE_URL}/auth/signin`],
    ['POST', `${API_BASE_URL}/auth/logout`],
    ['POST', `${API_BASE_URL}/auth/refresh`],
    ['POST', `${API_BASE_URL}/post/likes/:postId`],
    ['POST', `${API_BASE_URL}/post/comment/:postId`],
    ['DELETE', `${API_BASE_URL}/post/delete/:postId`],
    ['PUT', `${API_BASE_URL}/post/edit/:postId`],
  ]);
  sleep(1);
}
