import request from "supertest";
import app from "../../app.js";

let authToken;
describe("POST /passengers", () => {
  beforeAll(async () => {
    // Simulate a user login to obtain the authentication token
    const loginResponse = await request(app)
      .post("/api/login") // Replace with your actual login route
      .send({ email: "admin@gmail.com", password: "1234567" }); // Provide valid login credentials

    // Store the authentication token obtained from the login response
    authToken = loginResponse.body.jwtToken;
    console.log(authToken);
  }, 60000);

  it("should not able to create a  without email", async () => {
    // Define the passenger data you want to send in the request
    const passengerData = {
      name: "John Doe",
      email: "",
      NIC: "123456789V",
      contactNumber: "0712345678",
      address: "123 Main St, Colombo",
      accountBalance: 1000,
    };

    // Make a POST request to the "create passenger" endpoint
    const response = await request(app)
      .post("/api/createPerPassenger")
      .send(passengerData)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${authToken}`);
    // Assert the HTTP response status code (400 indicates a bad request)
    expect(response.status).toBe(400);

    // Optionally, you can further assert the response body or structure
    // For example, you can check if the response contains an error message indicating that "Email is required"
    expect(response.body.error).toBe("Email is required");
  });
});

it("should create a new permanent passenger with all required fields and a unique email and NIC", async () => {
  const passengerData = {
    name: "",
    email: "email@gmail.com",
    NIC: "123456789V",
    contactNumber: "0712345678",
    address: "123 Main St, Colombo",
    accountBalance: 1000,
  };

  // Make a POST request to the "create passenger" endpoint
  const response = await request(app)
    .post("/api/createPassenger")
    .send(passengerData)
    .set("Accept", "application/json")
    .set("Authorization", `Bearer ${authToken}`);
  // Assert the HTTP response status code (400 indicates a bad request)
  expect(response.statusCode).toEqual(400);

  expect(response.body.error).toBe("Name is required");
});
