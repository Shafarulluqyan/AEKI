const request = require("supertest");
const { describe, it, expect } = require("@jest/globals");
const app = require("../app");
const { sequelize } = require("../models");
const { Customer, Bookmark } = require("../models/customer");
const jwt = require("../helpers/jwt");

let access_token;

beforeAll(async () => {
  const products = require("../data/products.json").map((product) => {
    product.createdAt = product.updatedAt = new Date();
    return product;
  });
  await sequelize.queryInterface.bulkInsert("Products", products);

  const customers = require("../data/customer.json").map((customer) => {
    customer.createdAt = customer.updatedAt = new Date();
    return customer;
  });
  await sequelize.queryInterface.bulkInsert("Customers", customers);

  const custBookmark = [
    {
      ProductId: "1",
      CustomerId: "1",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
  await sequelize.queryInterface.bulkInsert("Bookmarks", custBookmark);
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Customers", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Products", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("Register Customer", () => {
  it("Berhasil register", async () => {
    const postRegister = {
      email: "azka@gmail.com",
      password: "azka",
    };
    const response = await request(app)
      .post("/pub/register")
      .send(postRegister);
    // console.log(response.body);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty(
      "message",
      `account with ${postRegister.email} success to create`
    );
  });
  it("Email tidak diberikan / tidak diinput", async () => {
    const postRegister = {
      password: "azka",
    };
    const response = await request(app)
      .post("/pub/register")
      .send(postRegister);
    // console.log(response.body, "jj");
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "email is required");
  });
  it("Password tidak diberikan / tidak diinput", async () => {
    const postRegister = {
      email: "azka@gmail.com",
    };
    const response = await request(app)
      .post("/pub/register")
      .send(postRegister);
    console.log(response.body, "jj");
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "password is required");
  });
  it("Email diberikan string kosong", async () => {
    const postRegister = {
      email: "",
      password: "azka",
    };
    const response = await request(app)
      .post("/pub/register")
      .send(postRegister);
    console.log(response.body, "<<<");
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Email format is invalid");
  });
  it("Password diberikan string kosong", async () => {
    const postRegister = {
      email: "azka@gmail.com",
      password: "",
    };
    const response = await request(app)
      .post("/pub/register")
      .send(postRegister);
    console.log(response.body, "<<<");
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "password is required");
  });
  it("Email sudah terdaftar", async () => {
    const postRegister = {
      email: "azka@gmail.com",
      password: "azka",
    };
    const response = await request(app)
      .post("/pub/register")
      .send(postRegister);
    console.log(response.body, "<<<");
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Email already registered");
  });
  it("Format Email salah / invalid", async () => {
    const postRegister = {
      email: "azka@gmail",
      password: "azka",
    };
    const response = await request(app)
      .post("/pub/register")
      .send(postRegister);
    console.log(response.body, "<<<");
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Email format is invalid");
  });
});

describe("Login Customer", () => {
  it("Berhasil Login", async () => {
    const postLogin = {
      email: "azka@gmail.com",
      password: "azka",
    };
    const response = await request(app).post("/pub/login").send(postLogin);
    console.log(response.body, "<<<<");
    expect(response.status).toBe(200);
  });
  it("Memberikan password yang salah", async () => {
    const postLogin = {
      email: "azka@gmail.com",
      password: "dsad",
    };
    const response = await request(app).post("/pub/login").send(postLogin);
    console.log(response.body, "<<<<");
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", `Invalid email/password`);
  });
  it("Email yang diinput tidak terdaftar di database", async () => {
    const postLogin = {
      email: "azka4141242131@gmail.com",
      password: "azka",
    };
    const response = await request(app).post("/pub/login").send(postLogin);
    console.log(response.body, "<<<<");
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", `Invalid email/password`);
  });
});

describe("Customer Entitas Utama", () => {
  it("Berhasil mendapatkan Entitas Utama (tanpa access_token) tanpa menggunakan query filter parameter", async () => {
    const response = await request(app).get("/pub/products");
    console.log(response.body, "<<<< ini customer");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });
  it("Berhasil mendapatkan Entitas Utama (tanpa access_token) dengan 1 query filter parameter", async () => {
    const response = await request(app).get("/pub/products?productName=name");
    // console.log(response.body, "<<<< ini customer by id");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });
  it("Berhasil mendapatkan  Entitas Utama serta panjang yang sesuai (tanpa access_token) ketika memberikan page tertentu (cek paginationnya)", async () => {
    const response = await request(app).get(
      "/pub/products?page[size]=5&page[number]=2"
    );
    // console.log(response.body, "<<<< ini customer length pagination");
    expect(response.body.products.length).toBe(8);
  });
  it("Berhasil mendapatkan 1  Entitas Utama sesuai dengan params id yang diberikan", async () => {
    const response = await request(app).get("/pub/products/3");
    // console.log(response.body, "<<<< ini customer");
    expect(response.status).toBe(200);
  });
  it("Gagal mendapatkan Entitas Utama karena params id yang diberikan tidak ada di database / invalid", async () => {
    const response = await request(app).get("/pub/products/40");
    console.log(response.body, "<<<< ini customer");
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty(
      "message",
      `Not Found`
    );
  });
});

describe("Customer Bookmark", () => {
  it("Berhasil mendapatkan list bookmark / favorite sesuai dengan user yang login", async () => {
    const postLogin = {
      email: "azka@gmail.com",
      password: "azka",
    };
    let response = await request(app).post("/pub/login").send(postLogin);

    access_token = response.body.access_token;
    // console.log(access_token, "<<<<ini data acces token");
    let bookmark = await request(app)
      .get("/pub/bookmarks")
      .set("access_token", access_token);
    // console.log(bookmark, "<<<< ini data bookmark");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Berhasil menambahkan bookmark dengan id yang sesuai", async () => {
    const postLogin = {
      email: "azka@gmail.com",
      password: "azka",
    };
    let response = await request(app).post("/pub/login").send(postLogin);

    access_token = response.body.access_token;
    // console.log(access_token, "<<<<ini data acces token");
    let bookmark = await request(app)
      .get("/pub/bookmarks")
      .set("access_token", access_token);
    console.log(bookmark.body, "<<<< ini data bookmark");
    expect(response.status).toBe(200);
  });

  it("Gagal menambahkan bookmark karena id entity yang dikirim tidak terdapat di database", async () => {
    const postLogin = {
      email: "azka@gmail.com",
      password: "azka",
    };
    let response = await request(app).post("/pub/login").send(postLogin);

    access_token = response.body.access_token;
    let bookmark = await request(app)
      .get("/pub/bookmarks/4")
      .set("access_token", access_token);
    expect(response.status).toBe(200);
  });

  it("Gagal mendapatkan list bookmark / favorite karena belum login", async () => {
    let response = await request(app).get("/pub/bookmarks/4");
    expect(response.status).toBe(401);
  });
  it("Gagal mendapatkan list bookmark / favorite karena token yang diberikan tidak valid (random string)", async () => {
    const postLogin = {
      email: "azka@gmail.com",
      password: "azka",
    };
    let response = await request(app).post("/pub/login").send(postLogin);

    access_token = "response.body.access_token";
    let bookmark = await request(app)
      .get("/pub/bookmarks/")
      .set("access_token", access_token);
    expect(response.status).toBe(200);
  });
});
