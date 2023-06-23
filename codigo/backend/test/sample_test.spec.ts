import http from 'k6/http';
import { sleep, check } from 'k6';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

export function handleSummary(data) {
  return {
    'C:/Users/Inteli/Documents/GitHub/Grupo-3/codigo/backend/test/reports.html':
      htmlReport(data),
  };
}

// export let options = {
//   stages: [
//     { duration: '1s', target: 1 },
//     { duration: '10s', target: 10 },
//     { duration: '10s', target: 0 },
//   ],
// };

const API_BASE_URL = 'http://localhost:5500';
let accessToken = '';

export default function () {
  const headers = {
    'Content-Type': 'application/json',
    accept: '*/*',
  };

  // // Generate unique credentials for each virtual user
  // const username = `user${__VU}`; // Use VU number in the username
  // const email = `${username}@dell.com`;
  // const password = `password${__VU}`; // Use VU number in the password

  const payloadSignup = JSON.stringify({
    email: 'email@email.com',
    password: 'password',
    username: 'username',
    acceptTerms: true,
    admin: false
  });

  const resSignup = http.post(`${API_BASE_URL}/auth/signup`, payloadSignup, {
    headers,
  });

  check(resSignup, { 'status is 200': (r) => r.status === 200 });

  const payloadPost = JSON.stringify({
    title: 'My Post 44',
    description: 'This is my example post',
    image: 'image.jpeg',
    content: 'Content of the post',
    active: true,
  });
  const resPost = http.post(`${API_BASE_URL}/post`, payloadPost, headers);

  // Sign in and retrieve access token
  if (!accessToken) {
    const payloadLogin = JSON.stringify({
      email: 'yves@dell.com',
      password: 'adoleta',
    });

    const resLogin = http.post(`${API_BASE_URL}/auth/signin`, payloadLogin, {
      headers,
    });

    check(resLogin, { 'status is 200': (r) => r.status === 200 });

    accessToken = resLogin.json('access_token');
  }

  headers['Authorization'] = `Bearer ${accessToken}`;

  const response = http.batch([
    ['GET', `${API_BASE_URL}/users`],
    ['GET', `${API_BASE_URL}/post`],
    ['GET', `${API_BASE_URL}/ranking`],
  ]);

  check(resPost, { 'status is 201': (r) => r.status === 201 });
  check(response, { 'status is 200': (r) => r.status === 200 });
  sleep(1);
}
