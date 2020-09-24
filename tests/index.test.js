const request = require('supertest');
const { app } = require('../index');

describe('Server', () => {
    it('should test that true === true', () => {
        expect(true).toBe(true);
    });

    describe('GET /organizations', () => {
        it('should return a 200 status and json response', (done) => {
            request(app)
                .get('/organizations')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(done);
        });
    });

    describe('POST /organizations', () => {
        it('should return a 200 status and json response', (done) => {
            request(app)
                .get('/organizations')
                .send({
                    name: 'Test Corp.',
                    'public': true,
                    employees: 22,
                    started: '1970-01-01T00:00:00.000Z'
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end(done);
        });
    });
});
