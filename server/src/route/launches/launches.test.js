const request = require('supertest');

const app = require('../../app');
const {mongoConnect, mongoDisconnect} = require('../../service/mongo');

describe('Launch API Test', () => {
    beforeAll(async () => {
        await mongoConnect();
    });

    beforeAll(async () => {
        await mongoDisconnect();
    })

    describe('Test GET /launches',()=>{
        test('It should respond with 200 success',async ()=>{
            await request(app).get('/launches')
                .expect('Content-Type', /json/)
                .expect(200);
        });
    });

    describe('Test POST /launches', () => {
        const launchComplateData = {
            mission : 'USS Enterprise',
            rocket: 'NCC NASA 147',
            target: 'Kepler ABC 7',
            launchDate: 'January 04, 2028'
        };

        const launchDataWithoutDate = {
            mission : 'USS Enterprise',
            rocket: 'NCC NASA 147',
            target: 'Kepler ABC 7', 
        }

        const launchDatawithInvalidDate =  {
            mission : 'USS Enterprise',
            rocket: 'NCC NASA 147',
            target: 'Kepler ABC 7',
            launchDate: 'invalide-date'
        }

        test('It should response with 201 success', async () => {
            const response = await request(app)
                .post('/launches')
                .send(launchComplateData)
                .expect('Content-Type', /json/)
                .expect(201);

            const requestDate =  new Date(launchComplateData.launchDate).valueOf();
            const responseDate = new Date(response.body.launchDate).valueOf();
            expect(requestDate).toBe(responseDate);
            expect(response.body).toMatchObject(launchDataWithoutDate);
        });


        test('It should cache missing required properties',async () => {
            const response = await request(app)
                .post('/launches')
                .send(launchDataWithoutDate)
                .expect('Content-Type', /json/)
                .expect(400);
                expect(response.body).toStrictEqual({error: 'Some field is missing'});
        });

        test('It should cache invalid date ', async () => {
            const response = await request(app)
                .post('/launches')
                .send(launchDatawithInvalidDate)
                .expect('Content-Type', /json/)
                .expect(400);
                expect(response.body).toStrictEqual({error: 'Invalid Date format'});
        });
    });

});
