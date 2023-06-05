import http from 'k6/http';
import { sleep, check } from 'k6';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

export function handleSummary(data) {
  return {
    'C:/Users/Inteli/Documents/GitHub/Grupo-3/codigo/backend/test/reports.html':
      htmlReport(data),
  };
}

export let options = {
  stages: [
    { duration: '5s', target: 1 },
    { duration: '10s', target: 5 },
    { duration: '5s', target: 0 },
  ],
};

const API_BASE_URL = 'http://localhost:5500';

export default function () {
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const payloadLogin = JSON.stringify({
    email: 'yves@dell.com',
    password: 'adoleta',
  });

  const payloadPost = JSON.stringify({
    title: 'My Post 44',
    description: 'This is my example post',
    image: 'image.jpeg',
    content: 'Content of the post',
    active: true,
  });

  const payloadSignup = JSON.stringify({
    email: 'admi@dell.com',
    password: 'adoleta',
    name: 'admi',
    username: 'admi',
    location: 'Rondonópolis',
    acceptTerms: true,
    admin: true,
  });

  const payloadDeletePost = JSON.stringify({
    postId: '16ec526a-d892-4e24-b8da-e6a820d35afd',
  });

  const payloadLikePost = JSON.stringify({
    postId: 'f30876e2-d651-496d-9930-d1e2ba7763a9',
  });

  const resPost = http.post(`${API_BASE_URL}/post`, payloadPost, params);

  //   const resPostDelete = http.delete(
  //     `${API_BASE_URL}/post/delete/:postId`,
  //     payloadDeletePost,
  //     params,
  //   );

  //   const resSignup = http.post(
  //     `${API_BASE_URL}/auth/signup`,
  //     payloadSignup,
  //     params,
  //   );

  const resLogin = http.post(
    `${API_BASE_URL}/auth/signin`,
    payloadLogin,
    params,
  );

  const resLike = http.post(`${API_BASE_URL}/post`, payloadLikePost, params);

  const response = http.batch([
    ['GET', `${API_BASE_URL}/users`],
    ['GET', `${API_BASE_URL}/post`],
    ['GET', `${API_BASE_URL}/ranking`],
  ]);

  check(resLogin, { 'status is 200': (r) => r.status === 200 });
  check(resPost, { 'status is 200': (r) => r.status === 200 });
  //   check(resSignup, { 'status is 200': (r) => r.status === 200 });
  //   check(resPostDelete, { 'status is 200': (r) => r.status === 200 });
  check(resLike, { 'status is 200': (r) => r.status === 200 });
  check(response, { 'status is 200': (r) => r.status === 200 });
  sleep(1);
}
