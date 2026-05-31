import request from "supertest";
import app from "../app";

describe("GET /api", () => {
  it("should return 200 to ensure that the api is running", async () => {
    const res = await request(app).get("/api");

    expect(res.statusCode).toBe(200);
  });
});
