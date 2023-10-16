const request = require("supertest");
const app = require("../app");
const Passenger = require("../models/Passenger");

describe("Passenger routes", () => {
  let passenger;

  beforeEach(async () => {
    passenger = new Passenger({
      email: "test@example.com",
      name: "Test Passenger",
      nic: "123456789V",
      contactNo: "0712345678",
      address: "123, Test Street, Test City",
      accBalance: 1000,
      transactions: [],
      userId: [],
      passengerType: "Permanant",
    });
    await passenger.save();
  });

  afterEach(async () => {
    await Passenger.deleteMany();
  });

  describe("POST /passenger", () => {
    it("should create a new passenger", async () => {
      const res = await request(app)
        .post("/passenger")
        .send({
          email: "newpassenger@example.com",
          name: "New Passenger",
          nic: "987654321V",
          contactNo: "0776543210",
          address: "456, New Street, New City",
          accBalance: 500,
          transactions: [],
          userId: [],
          passengerType: "Temporary",
        })
        .expect(201);

      expect(res.body).toHaveProperty("_id");
      expect(res.body.email).toBe("newpassenger@example.com");
      expect(res.body.name).toBe("New Passenger");
      expect(res.body.nic).toBe("987654321V");
      expect(res.body.contactNo).toBe("0776543210");
      expect(res.body.address).toBe("456, New Street, New City");
      expect(res.body.accBalance).toBe(500);
      expect(res.body.transactions).toEqual([]);
      expect(res.body.userId).toEqual([]);
      expect(res.body.passengerType).toBe("Temporary");
    });
  });

  describe("GET /passenger/:id", () => {
    it("should get a passenger by id", async () => {
      const res = await request(app)
        .get(`/passenger/${passenger._id}`)
        .expect(200);

      expect(res.body).toHaveProperty("_id");
      expect(res.body.email).toBe("test@example.com");
      expect(res.body.name).toBe("Test Passenger");
      expect(res.body.nic).toBe("123456789V");
      expect(res.body.contactNo).toBe("0712345678");
      expect(res.body.address).toBe("123, Test Street, Test City");
      expect(res.body.accBalance).toBe(1000);
      expect(res.body.transactions).toEqual([]);
      expect(res.body.userId).toEqual([]);
      expect(res.body.passengerType).toBe("Permanant");
    });

    it("should return 404 if passenger not found", async () => {
      const res = await request(app)
        .get(`/passenger/123456789012345678901234`)
        .expect(404);

      expect(res.body).toEqual({ message: "Passenger not found" });
    });
  });

  describe("PUT /passenger/:id", () => {
    it("should update a passenger by id", async () => {
      const res = await request(app)
        .put(`/passenger/${passenger._id}`)
        .send({
          email: "updated@example.com",
          name: "Updated Passenger",
          nic: "123456789V",
          contactNo: "0712345678",
          address: "123, Test Street, Test City",
          accBalance: 2000,
          transactions: [],
          userId: [],
          passengerType: "Temporary",
        })
        .expect(200);

      expect(res.body).toHaveProperty("_id");
      expect(res.body.email).toBe("updated@example.com");
      expect(res.body.name).toBe("Updated Passenger");
      expect(res.body.nic).toBe("123456789V");
      expect(res.body.contactNo).toBe("0712345678");
      expect(res.body.address).toBe("123, Test Street, Test City");
      expect(res.body.accBalance).toBe(2000);
      expect(res.body.transactions).toEqual([]);
      expect(res.body.userId).toEqual([]);
      expect(res.body.passengerType).toBe("Temporary");
    });

    it("should return 404 if passenger not found", async () => {
      const res = await request(app)
        .put(`/passenger/123456789012345678901234`)
        .send({
          email: "updated@example.com",
          name: "Updated Passenger",
          nic: "123456789V",
          contactNo: "0712345678",
          address: "123, Test Street, Test City",
          accBalance: 2000,
          transactions: [],
          userId: [],
          passengerType: "Temporary",
        })
        .expect(404);

      expect(res.body).toEqual({ message: "Passenger not found" });
    });
  });

  describe("DELETE /passenger/:id", () => {
    it("should delete a passenger by id", async () => {
      const res = await request(app)
        .delete(`/passenger/${passenger._id}`)
        .expect(200);

      expect(res.body).toHaveProperty("_id");
      expect(res.body.email).toBe("test@example.com");
      expect(res.body.name).toBe("Test Passenger");
      expect(res.body.nic).toBe("123456789V");
      expect(res.body.contactNo).toBe("0712345678");
      expect(res.body.address).toBe("123, Test Street, Test City");
      expect(res.body.accBalance).toBe(1000);
      expect(res.body.transactions).toEqual([]);
      expect(res.body.userId).toEqual([]);
      expect(res.body.passengerType).toBe("Permanant");

      const deletedPassenger = await Passenger.findById(passenger._id);
      expect(deletedPassenger).toBeNull();
    });

    it("should return 404 if passenger not found", async () => {
      const res = await request(app)
        .delete(`/passenger/123456789012345678901234`)
        .expect(404);

      expect(res.body).toEqual({ message: "Passenger not found" });
    });
  });
});
const request = require("supertest");
const app = require("../app");
const Journey = require("../models/Journey");

describe("POST /passenger/journey", () => {
  it("should create a new journey", async () => {
    const res = await request(app)
      .post("/passenger/journey")
      .set("Authorization", `Bearer ${token}`)
      .send({
        startLocation: "Kandy",
      });

    expect(res.statusCode).toEqual(201);

    const journey = await Journey.findOne({ _id: res.body.journey._id });
    expect(journey.startLocation).toEqual("Kandy");
    expect(journey.busDriver).toEqual(req.user._id);
  });
});
