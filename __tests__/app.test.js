 const app = require("../app.js");
const data = require("../db/data/test-data");
const db = require("../db/data/test-data/index");
const seed = require("../db/seeds/seed");
const request = require("supertest");

beforeEach(() => {
  return seed(data);
});

// afterAll(() => {
//   db.end();
// });

describe("GET /api/categories", () => {
  test("response containing an array of category objects, each of which should have the following properties slug, description", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then(({body}) => {
        body.forEach((category) => {
          expect(category).toMatchObject({
            slug:expect.any(String),
            description:expect.any(String)
          })
        })
      })
  });
})