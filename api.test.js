const request = require("supertest");
const app = require("../index");

let token;

describe("Todo API", () => {
  it("logs in with correct credentials", async () => {
    const res = await request(app).post("/login").send({ username: "test", password: "1234" });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

  it("rejects invalid login", async () => {
    const res = await request(app).post("/login").send({ username: "wrong", password: "bad" });
    expect(res.statusCode).toBe(401);
  });

  it("adds a new todo", async () => {
    const res = await request(app)
      .post("/todos")
      .set("Authorization", `Bearer ${token}`)
      .send({ text: "First todo" });
    expect(res.statusCode).toBe(201);
    expect(res.body.text).toBe("First todo");
  });

  it("gets todos", async () => {
    const res = await request(app).get("/todos").set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("updates a todo", async () => {
    let todosRes = await request(app).get("/todos").set("Authorization", `Bearer ${token}`);
    let todoId = todosRes.body[0].id;

    const res = await request(app)
      .put(`/todos/${todoId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ text: "Updated todo" });

    expect(res.statusCode).toBe(200);
    expect(res.body.text).toBe("Updated todo");
  });

  it("deletes a todo", async () => {
    let todosRes = await request(app).get("/todos").set("Authorization", `Bearer ${token}`);
    let todoId = todosRes.body[0].id;

    const res = await request(app)
      .delete(`/todos/${todoId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(204);
  });

  it("fails to create todo without text", async () => {
    const res = await request(app)
      .post("/todos")
      .set("Authorization", `Bearer ${token}`)
      .send({});
    expect(res.statusCode).toBe(400);
  });

  it("rejects unauthenticated access", async () => {
    const res = await request(app).get("/todos");
    expect(res.statusCode).toBe(401);
  });
});
