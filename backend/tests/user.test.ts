import request from 'supertest';
import { describe, it, expect, beforeAll } from 'vitest';
import { createServer } from 'http';
import app from '../src/app';

const server = createServer(app);

let token = '';

describe('User API', () => {
  beforeAll(async () => {
    // 🔥 Registrar usuario antes
    await request(server)
      .post('/api/auth/register')
      .send({
        nombre: 'User',
        apellido: 'Tester',
        alias: 'usertester',
        fecha_nacimiento: '1990-01-01',
        email: 'usertester@example.com',
        password: 'Password@123',
      });

    // 🔥 Login y obtener token
    const res = await request(server)
      .post('/api/auth/login')
      .send({
        email: 'usertester@example.com',
        password: 'Password@123',
      });

    token = res.body.token;
  });

  it('should get profile data', async () => {
    const res = await request(server)
      .get('/api/users/profile')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('nombre');
    expect(res.body).toHaveProperty('email');
  });

  it('should update profile', async () => {
    const res = await request(server)
      .put('/api/users/update-profile')
      .set('Authorization', `Bearer ${token}`)
      .send({
        nombre: 'Updated',
        apellido: 'Tester',
        alias: 'updatedtester',
        fecha_nacimiento: '1991-02-02',
      });

    expect(res.status).toBe(200);
  });

  it('should change password', async () => {
    const res = await request(server)
      .put('/api/users/change-password')
      .set('Authorization', `Bearer ${token}`)
      .send({
        oldPassword: 'Password@123',
        newPassword: 'NewPassword@123',
      });

    expect(res.status).toBe(200);
  });
});
