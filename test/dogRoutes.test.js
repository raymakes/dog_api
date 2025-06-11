const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('../db');
const User = require('../models/User');
const Dog = require('../models/Dog');

let token;
let dogId;

describe('Dog Endpoints', function () {
    // register and login tester, clearing any existing ones
    before(async () => {
        await User.deleteMany({});
        await Dog.deleteMany({});

        await request(app).post('/api/users/register').send({
            name: 'Testing Things',
            email: 'testowner@google.com',
            password: 'pass987654',
        });

        const loginRes = await request(app)
            .post('/api/users/login')
            .send({ email: 'testowner@google.com', password: 'pass987654' });
        return token = loginRes.body.token;
    });

    describe('POST /api/dogs/register', () => {
        it('Register a new dog', async () => {
            const res = await request(app)
                .post('/api/dogs/register')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: 'Borg',
                    description: 'Floofer floof'
                });
            expect(res.status).to.equal(201);
            expect(res.body).to.have.property(
                'message',
                'Dog registered!'
            );
            expect(res.body).to.have.property('dog');
            dogId = res.body.dog._id;
        });
    });

    describe('POST /api/dogs/adopt/:dogId', () => {
        it('Adopt a dog', async () => {
            const res = await request(app)
                .post(`/api/dogs/adopt/${dogId}`)
                .set('Authorization', `Bearer ${token}`)
                .send();
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property(
                'message',
                'Dog adopted!');
        });
    });

    describe('DELETE /api/dogs/remove/:dogId', () => {
        it('Not remove an adopted dog', async () => {
            const res = await request(app)
                .delete(`/api/dogs/remove/${dogId}`)
                .set('Authorization', `Bearer ${token}`)
                .send();
            expect(res.status).to.equal(400);
            expect(res.body).to.have.property(
                'error',
                'Cannot remove an adopted dog'
            );
        });
    });

    describe('GET /api/dogs/registered', () => {
        it('List registered dogs for the user', async () => {
            const res = await request(app)
                .get('/api/dogs/registered')
                .set('Authorization', `Bearer ${token}`)
                .send();
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('dogs');
            expect(res.body.dogs).to.be.an('array');
        });
    });

    describe('GET /api/dogs/adopted', () => {
        it('List adopted dogs for the user', async () => {
            const res = await request(app)
                .get('/api/dogs/adopted')
                .set('Authorization', `Bearer ${token}`)
                .send();
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('dogs');
            expect(res.body.dogs).to.be.an('array');
        });
    });
});