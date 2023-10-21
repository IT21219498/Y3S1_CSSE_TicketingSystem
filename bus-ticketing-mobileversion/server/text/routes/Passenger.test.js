import request from 'supertest';
import app from '../../app.js';

let authToken;
describe('POST /passengers', () => {
  beforeAll(async () => {
    // Simulate a user login to obtain the authentication token
    const loginResponse = await request(app)
      .post('/api/login') // Replace with your actual login route
      .send({ email: 'admin@gmail.com', password: '1234567' }); // Provide valid login credentials

    // Store the authentication token obtained from the login response
    authToken = loginResponse.body.jwtToken;
    console.log(authToken);
  }, 60000);

  //negative test case
  it('start journey without a valid Id', async () => {
    // Make a POST request to the "create passenger" endpoint
    const response = await request(app)
      .put('/api/startOrEndJourney/323')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${authToken}`);

    // Assert the HTTP response status code (400 indicates a bad request)
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('please enter a valid id');
  });

  //negative test case
  it('start journey with a invalid passenger id', async () => {
    // Make a POST request to the "create passenger" endpoint
    const response = await request(app)
      .put('/api/startOrEndJourney/652ce128e567967469d198ad')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${authToken}`);

    // Assert the HTTP response status code (400 indicates a bad request)
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Passenger not found');
  });

  //positive test case
  it('start journey with a valid id', async () => {
    // Make a POST request to the "create passenger" endpoint
    const response = await request(app)
      .put('/api/startOrEndJourney/652ce128e567967469d195ad')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200);
  });

  //negative test case
  it('create a permanent passenger with empty email', async () => {
    // Define the passenger data you want to send in the request
    // email, name, nic, contactNo, address, password, accBalance, type
    const permanantPassenger = {
      email: '',
      name: 'test',
      nic: 'test',
      contactNo: 'test',
      address: 'test',
      password: 'test',
      accBalance: 'test',
      type: 'test',
    };
    // Make a POST request to the "create passenger" endpoint
    const response = await request(app)
      .post('/api/createPermanantPassenger')
      .send(permanantPassenger)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${authToken}`);

    // Assert the HTTP response status code (400 indicates a bad request)
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Email is required');
  });
});
