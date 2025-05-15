import request from 'supertest';
import { describe, it, expect, beforeAll } from 'vitest';
import { createServer } from 'http';
import app from '../src/app';

const server = createServer(app);

let token = '';
let postId = 0;

describe('Post API', () => {
  beforeAll(async () => {
    // 🔥 Registrar usuario antes
    await request(server)
      .post('/api/auth/register')
      .send({
        nombre: 'Post',
        apellido: 'Tester',
        alias: 'posttester',
        fecha_nacimiento: '1995-01-01',
        email: 'posttester@example.com',
        password: 'Password@123',
      });

    // 🔥 Login y obtener token
    const res = await request(server)
      .post('/api/auth/login')
      .send({
        email: 'posttester@example.com',
        password: 'Password@123',
      });

    token = res.body.token;
  });

  it('should create a new post', async () => {
    const res = await request(server)
      .post('/api/posts')
      .set('Authorization', `Bearer ${token}`)
      .send({ contenido: 'Este es un post de prueba' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id');
    postId = res.body.id;

  });

  expect(postId).toBeDefined();

  it('should list all posts', async () => {
    const res = await request(server)
      .get('/api/posts')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('should react to a post', async () => {
    const res = await request(server)
      .post('/api/posts/react')
      .set('Authorization', `Bearer ${token}`)
      .send({ postId, type: 'like' });

    expect(res.status).toBe(200);
  });

  it('should comment on a post', async () => {
    const res = await request(server)
      .post('/api/posts/comment')
      .set('Authorization', `Bearer ${token}`)
      .send({ postId, content: 'Comentario de prueba' });

    expect(res.status).toBe(200);
  });

  it('should repost a post', async () => {
    const res = await request(server)
      .post('/api/posts/repost')
      .set('Authorization', `Bearer ${token}`)
      .send({ originalPostId: postId });

    expect(res.status).toBe(200);
  });
});
