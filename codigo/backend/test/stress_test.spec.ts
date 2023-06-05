import { sleep, check } from 'k6';
import http from 'k6/http';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js"

export function handleSummary(data) {
  return {
    "C:/Users/Inteli/Documents/GitHub/Grupo-3/codigo/backend/test/reports.html": htmlReport(data),
  }
};

//o teste de estresse determina como a sua aplicação irá reagir em momentos extremos, mostrando um break point de que quantidade de usuários o sistema vai falhar
export let options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  stages: [
    { duration: '2m', target: 100 }, // abaixo do normal
    { duration: '5m', target: 100 },
    { duration: '2m', target: 200 }, // nível de normalidade
    { duration: '5m', target: 200 },
    { duration: '2m', target: 300 }, // próximo ao breaking point
    { duration: '5m', target: 300 },
    { duration: '2m', target: 400 }, // além do breaking point
    { duration: '5m', target: 400 },
    { duration: '10m', target: 0 }, // estágio de recuperação, usuários diminuindo
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
