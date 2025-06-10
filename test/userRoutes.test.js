const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('../server');
const User = require('../models/User');

// Clears the User collection
before(async () => {
    await User.deleteMany({});
});

// Registers new user
describe('User Endpoints', () => {
    it('should register a new user', async () => {
        const res = await request(app).post('/api/users/register').send({
            name: 'Login Tester ',
            email: 'logintest@google.com',
            password: 'pass12345',
        });
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property(
            'message',
            'User registered successfully'
        );
    });

    // Tests user login
    it('Login an existing user & return token', async () => {

        await request(app).post('/api/users/register').send({
            name: 'Login Tester',
            email: 'logintest@google.com',
            password: 'pass12345',
        });

        const res = await request(app).post('/api/users/login').send({
            email: 'logintest@google.com',
            password: 'pass12345',
        });
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('token');
    });
});