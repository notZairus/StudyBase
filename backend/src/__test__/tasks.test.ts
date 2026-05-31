jest.mock("@clerk/express", () => ({
  clerkMiddleware: () => (req: any, res: any, next: any) => next(),
  getAuth: jest.fn(),
}));

jest.mock("../prisma/client", () => ({
  task: {
    create: jest.fn().mockResolvedValue({
      id: "task_123",
      name: "Science Assignment",
      description: "Finish alchemy exercises from chapter 5",
      color: "red",
      status: "PENDING",
      deadline: "2026-06-01T10:00:00.000Z",
    }),
  },
}));

import request from "supertest";
import app from "../app";
import { getAuth } from "@clerk/express";

const mockedGetAuth = getAuth as jest.MockedFunction<typeof getAuth>;

beforeEach(() => {
  jest.clearAllMocks();
});

describe("POST /api/tasks", () => {
  it("should return 201 when authenticated and the data sent is valid", async () => {
    mockedGetAuth.mockReturnValue({ userId: "user_test_123" } as any);

    const res = await request(app)
      .post("/api/tasks")
      .send({
        name: "Science Assignment",
        description: "Finish alchemy exercises from chapter 5",
        color: "red",
        subject: ["Science"],
        status: "PENDING",
        deadline: "2026-06-01T10:00:00.000Z",
      });

    expect(res.statusCode).toBe(201);
  });

  it("should return 403 when unauthenticated", async () => {
    mockedGetAuth.mockReturnValue({ userId: null } as any);

    const res = await request(app)
      .post("/api/tasks")
      .send({
        name: "Science Assignment",
        description: "Finish alchemy exercises from chapter 5",
        color: "red",
        subject: ["Science"],
        status: "PENDING",
        deadline: "2026-06-01T10:00:00.000Z",
      });

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Forbidden");
  });

  it("should return 400 when the data is not valid", async () => {
    mockedGetAuth.mockReturnValue({ userId: "user_test_123" } as any);

    const res = await request(app)
      .post("/api/tasks")
      .send({
        name: "",
        description: "Finish alchemy exercises from chapter 5",
        color: "red",
        subject: ["Science"],
        status: "PENDING",
        deadline: "2026-06-01T10:00:00.000Z",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("errors");
  });
});
