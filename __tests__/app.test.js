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


describe("GET /api/reviews", () => {
  test("response containing an array of category objects, each of which should have the following properties slug, description", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({body}) => {
        body.forEach((category) => {
          expect(category).toMatchObject({
            review_id:expect.any(Number),
            title:expect.any(String),
            designer:expect.any(String),
            owner:expect.any(String),
            review_img_url:expect.any(String),
            review_body:expect.any(String),
            category:expect.any(String),
            created_at:expect.any(String),
            votes:expect.any(Number),
            comment_count:expect.any(String)
          })
        })
      })
  });
  test.only("GET:200 array is sorted by descending order by default ", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeSortedBy('created_at', { descending: true });
  });
})
})
