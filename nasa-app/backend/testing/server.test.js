const request = require('supertest');
const express = require('express');
const axios = require('axios');
const app = require('../server');

// nasa-app/backend/server.test.js
jest.mock('axios');

afterAll(() => {
  jest.resetModules();
});

describe('NASA API Server', () => {
  describe('GET /apod', () => {
    it('should return 400 if start_date or end_date is missing', async () => {
      const res = await request(app).get('/apod');
      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/start_date and end_date are required/);
    });

    it('should return APOD data for valid dates', async () => {
      const mockData = [{ date: '2023-01-01', title: 'Test APOD' }];
      axios.get.mockResolvedValueOnce({ data: mockData });
      const res = await request(app).get('/apod?start_date=2023-01-01&end_date=2023-01-01');
      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockData);
    });
  });

  describe('GET /mars-photos', () => {
    it('should return 400 if sol is missing', async () => {
      const res = await request(app).get('/mars-photos');
      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/sol is required/);
    });

    it('should return camera usage counts for valid sol', async () => {
      const mockPhotos = [
        { camera: { name: 'FHAZ' } },
        { camera: { name: 'RHAZ' } },
        { camera: { name: 'FHAZ' } },
      ];
      axios.get.mockResolvedValueOnce({ data: { photos: mockPhotos } });
      const res = await request(app).get('/mars-photos?sol=1000');
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ FHAZ: 2, RHAZ: 1 });
    });
  });

  describe('GET /api/neo-feed', () => {
    it('should return 400 if start_date or end_date is missing', async () => {
      const res = await request(app).get('/api/neo-feed');
      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/start_date and end_date are required/);
    });

    it('should return NEO feed data for valid dates', async () => {
      const mockData = { element_count: 5, near_earth_objects: {} };
      axios.get.mockResolvedValueOnce({ data: mockData });
      const res = await request(app).get('/api/neo-feed?start_date=2023-01-01&end_date=2023-01-02');
      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockData);
    });
  });
});