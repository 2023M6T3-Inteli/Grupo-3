import { sleep, check } from 'k6';
import http from 'k6/http';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js"

export function handleSummary(data) {
  return {
    "C:/Users/Inteli/Documents/GitHub/Grupo-3/codigo/backend/test/reports.html": htmlReport(data),
  }
};

export let options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  // stages: [
  //   { duration: '10s', target: 100 }, 
  //   { duration: '1m', target: 100 },
  //   { duration: '10s', target: 500 }, 
  //   { duration: '1m', target: 5000 },
  //   { duration: '10s', target: 300 }, 
  //   { duration: '1m', target: 100 },
  //   { duration: '10s', target: 0 }, 
  // ],
  stages: [
    { duration: '30s', target: 100 },
    { duration: '50s', target: 1000 },
    { duration: '20s', target: 0 },
  ],
};

const API_BASE_URL = 'http://localhost:5500';

export default function () {
  http.batch([
    ['GET', `${API_BASE_URL}/users`],
    ['GET', `${API_BASE_URL}/post`],
    // ['POST', `${API_BASE_URL}/post`],
    // ['GET', `${API_BASE_URL}/post/comment`],
    ['GET', `${API_BASE_URL}/ranking`],
    // ['POST', `${API_BASE_URL}/user/setup/tags`],
    // ['POST', `${API_BASE_URL}/auth/signup`],
    // ['POST', `${API_BASE_URL}/auth/signin`],
    // ['POST', `${API_BASE_URL}/auth/logout`],
    // ['POST', `${API_BASE_URL}/auth/refresh`],
    // ['POST', `${API_BASE_URL}/post/likes/:postId`],
    // ['POST', `${API_BASE_URL}/post/comment/:postId`],
    // ['DELETE', `${API_BASE_URL}/post/delete/:postId`],
    // ['PUT', `${API_BASE_URL}/post/edit/:postId`],
  ]);
  sleep(1);
}
