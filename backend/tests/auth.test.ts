import request from 'supertest';
import { describe, it, expect, beforeAll } from 'vitest';
import app from '../src/app';
import { createServer } from 'http';

let token = '';
const server = createServer(app);

describe('Auth API', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        nombre: 'Test',
        apellido: 'User',
        alias: 'testuser',
        fecha_nacimiento: '2000-01-01',
        email: 'testuser@example.com',
        password: 'Password@123',
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('token');
  });

  it('should login an existing user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'Password@123',
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });
});
