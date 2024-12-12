import { HttpResponse, http } from 'msw';

export const handlers = [
  http.post('/api/auth/login', async ({ request }) => {
    const form = (await request.json()) as {
      email: string;
      password: string;
    };

    if (form.email === 'dev1@gm' && form.password === '123456') {
      return HttpResponse.json({
        userId: 1,
      });
    }

    return new HttpResponse(null, {
      status: 401,
      statusText: 'Login failed',
    });
  }),
  http.post('/api/auth/register', () => {
    return HttpResponse.json({
      message: 'User registered successfully',
    });
  }),
  http.get('/getId', () => {
    return HttpResponse.json({
      message: 'Get Id successfully',
    });
  }),
];
