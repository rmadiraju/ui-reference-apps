import request from 'supertest';
import app from '../src/index.js';

describe('Backend API Tests', () => {
  describe('Health Check', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/health');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'OK');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('uptime');
      expect(response.body).toHaveProperty('environment');
    });
  });

  describe('API Endpoints', () => {
    describe('GET /api/message', () => {
      it('should return a message', async () => {
        const response = await request(app).get('/api/message');
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('timestamp');
        expect(response.body).toHaveProperty('version');
        expect(response.body.message).toContain('Hello from UI Reference Backend');
      });
    });

    describe('GET /api/data', () => {
      it('should return sample data', async () => {
        const response = await request(app).get('/api/data');
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('items');
        expect(response.body).toHaveProperty('total');
        expect(response.body).toHaveProperty('timestamp');
        expect(Array.isArray(response.body.items)).toBe(true);
        expect(response.body.total).toBe(4);
        expect(response.body.items).toHaveLength(4);
      });

      it('should return items with correct structure', async () => {
        const response = await request(app).get('/api/data');
        
        response.body.items.forEach(item => {
          expect(item).toHaveProperty('id');
          expect(item).toHaveProperty('name');
          expect(item).toHaveProperty('description');
          expect(typeof item.id).toBe('number');
          expect(typeof item.name).toBe('string');
          expect(typeof item.description).toBe('string');
        });
      });
    });

    describe('POST /api/echo', () => {
      it('should echo the message', async () => {
        const testMessage = 'Hello World';
        const response = await request(app)
          .post('/api/echo')
          .send({ message: testMessage });
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('echo', testMessage);
        expect(response.body).toHaveProperty('timestamp');
      });

      it('should return 400 for missing message', async () => {
        const response = await request(app)
          .post('/api/echo')
          .send({});
        
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'Message is required');
      });

      it('should return 400 for empty message', async () => {
        const response = await request(app)
          .post('/api/echo')
          .send({ message: '' });
        
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'Message is required');
      });
    });
  });

  describe('Error Handling', () => {
    it('should return 404 for unknown endpoints', async () => {
      const response = await request(app).get('/api/unknown');
      
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Endpoint not found');
      expect(response.body).toHaveProperty('path');
    });
  });

  describe('CORS', () => {
    it('should include CORS headers', async () => {
      const response = await request(app).get('/health');
      
      expect(response.headers).toHaveProperty('access-control-allow-origin');
    });
  });
}); 