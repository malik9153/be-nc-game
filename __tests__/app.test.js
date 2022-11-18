 const app = require("../app.js");
const data = require("../db/data/test-data");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const request = require("supertest");
const endpoints = require('../endpoints.json')

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});

describe("GET /api", () => {
  test.only("all api reqeusts", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({body}) => {
          expect(body.endpoints).toMatchObject(endpoints)
      })
  });
})

describe("GET /api/categories", () => {
  test("response containing an array of category objects, each of which should have the following properties slug, description", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then(({body}) => {
        body.category.forEach((category) => {
          expect(category).toMatchObject({
            slug:expect.any(String),
            description:expect.any(String)
          })
        })
      })
  });
})


describe("GET /api/reviews", () => {
  test("response containing an array of review objects, each of which should have the following properties slug, description", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({body}) => {
          body.reviews.forEach((category) => {
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
  test("GET:200 array is sorted by date ascending order  ", () => {
    return request(app)
      .get("/api/reviews?order=ASC")
      .expect(200)
      .then(({body}) => {
          expect(body.reviews).toBeSortedBy('created_at', { ascending: true });
    });
      })

 test("GET:200 array is sorted by date descending order by default ", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews).toBeSortedBy('created_at', { descending: true });
  });
})

test("GET:200 array is sorted by date ascending order  ", () => {
  return request(app)
    .get("/api/reviews?sort_by=review_id")
    .expect(200)
    .then(({body}) => {
        expect(body.reviews).toBeSortedBy('review_id', { descending: true });
  });
    })

  test("GET:200 selects the reviews by the category value specified in the query ", () => {
    return request(app)
      .get("/api/reviews?category=euro game")
      .expect(200)
      .then(({body}) => {
          body.reviews.forEach((category) => {
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
}) 

test("GET:200 selects the reviews by the all the values specified in the query ", () => {
  return request(app)
    .get("/api/reviews?category=euro game&sort_by=review_id&order=ASC")
    .expect(200)
    .then(({body}) => {
        body.reviews.forEach((category) => {
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
}) 
})



describe('5-GET/api/reviews/:review_id', () => {
  test('status:200, responds with a single matching review object ', () => {
    const review_id = 2;
    return request(app)
      .get(`/api/reviews/${review_id}`)
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews).toMatchObject({
          review_id: 2,
    title: 'Jenga',
    category: 'dexterity',
    designer: 'Leslie Scott',
    owner: 'philippaclaire9',
    review_body: 'Fiddly fun for all the family',
    review_img_url: 'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
    created_at: '2021-01-18T10:01:41.251Z',
    votes: 5
        });
      });

     
  })

  test('status:200, responds with a single matching review object with additional comment count ', () => {
    const review_id = 2;
    return request(app)
      .get(`/api/reviews/${review_id}`)
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews).toEqual({
          review_id: 2,
    title: 'Jenga',
    category: 'dexterity',
    designer: 'Leslie Scott',
    owner: 'philippaclaire9',
    review_body: 'Fiddly fun for all the family',
    review_img_url: 'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
    created_at: '2021-01-18T10:01:41.251Z',
    votes: 5,
    comment_count:'3'
        });
      });

     
  })
  
  test('GET 404- valid but non-existent review_id ', () => {
    const review_id = 1000000;
    return request(app)
      .get(`/api/reviews/${review_id}`)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toEqual('ID not found !');
      });
  });;
});

describe('6. GET /api/reviews/:review_id/comments', () => {
  test('status:200, responds with multiple matching comment objects', () => {
    const review_id = 3;
    return request(app)
      .get(`/api/reviews/${review_id}/comments`)
      .expect(200)
      
      .then(({body}) => {
        expect(body.comments.length).toBeGreaterThan(0);
        body.comments.forEach((comment) => {
          expect(comment).toMatchObject({
            body:expect.any(String),
            author:expect.any(String),
            review_id:expect.any(Number),
            votes:expect.any(Number),
            created_at:expect.any(String),
          })
        })
      })
  });

  test('GET 200- get empty array if review_id exists but has no comments ', () => {
    const review_id = 1;
    return request(app)
      .get(`/api/reviews/${review_id}/comments`)
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toEqual([]);
      });
  });
 
  test('GET 404- valid but non-existent review_id ', () => {
    const review_id = 1000;
    return request(app)
      .get(`/api/reviews/${review_id}/comments`)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toEqual('ID not found !');
      });
  });

 });
 
 
 describe(`7. POST /api/reviews/:review_id/comments`, () => {
  test(`responds with the posted comment`, () => {
    return request(app)
    .post('/api/reviews/3/comments')
    .send(
      {
        username:"mallionaire",
        body:"I loved this game too!"
    })
    .expect(201)
    .then(({body}) => {
      expect(body.comment).toEqual({ 
      body: 'I loved this game too!',
      votes: 0,
      author: 'mallionaire',
      comment_id: 7,
      review_id: 3,
      created_at: expect.any(String),

      })
    })
  })
  test(`responds with an error if post body is empty or missing one of paremters`,() => {
    return request(app)
    .post('/api/reviews/3/comments')
    .send({username:"mallionaire"})
    .expect(400)
    .then(({body}) => {
      expect(body.msg).toEqual("POST body empty or missing parameter")
    })
     
  })

  test(`GET 404- valid but non-existent review_id`,() => {
    return request(app)
    .post('/api/reviews/10000/comments')
    .send(
      {
        username:"mallionaire",
        body:"I loved this game too!"
    })
    .expect(404)
    .then(({body}) => {
      expect(body.msg).toEqual("ID not found !")
    })
     
  })
})

 
describe(`8. PATCH /api/reviews/:review_id`, () => {
  test(`responds with the updated review`, () => {
    return request(app)
    .patch('/api/reviews/3')
    .send(
      { inc_votes : 5 }
      )
    .expect(200)
    .then(({body}) => {
      expect(body.reviews).toMatchObject([
        {category: "social deduction",
        created_at: "2021-01-18T10:01:41.251Z", 
        designer: "Akihisa Okui",
        owner: "bainesface",
        review_body: "We couldn't find the werewolf!",
        review_id: 3,
        review_img_url: "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
        title: "Ultimate Werewolf",
        votes: 10
      }])
    })
  })

  test(`responds with the updated review when inc votes has a negetive number`, () => {
    return request(app)
    .patch('/api/reviews/3')
    .send(
      { inc_votes : -5 }
      )
    .expect(200)
    .then(({body}) => {
      expect(body.reviews).toMatchObject([
        {category: "social deduction",
        created_at: "2021-01-18T10:01:41.251Z", 
        designer: "Akihisa Okui",
        owner: "bainesface",
        review_body: "We couldn't find the werewolf!",
        review_id: 3,
        review_img_url: "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
        title: "Ultimate Werewolf",
        votes: 0
      }])
    })
  })
  test(`GET 404- valid but non-existent review_id`,() => {
    return request(app)
    .patch('/api/reviews/10000')
    .send(
      { inc_votes : -5 }
      )
    .expect(404)
    .then(({body}) => {
      expect(body.msg).toEqual("ID not found !")
    })
     
  })
})

describe(" GET /api/users", () => {
  test("response containing an array of objects, each object should have the following property:`username,name,avatar_url`", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({body}) => {
        body.users.forEach((object) => {
          expect(object).toMatchObject({
            username:expect.any(String),
            name:expect.any(String),
            avatar_url:expect.any(String)
          })
        })
      })
  });
  
})


describe("12. DELETE /api/comments/:comment_id", () => {
  test("delete the given comment by `comment_id && responds with status 204 and no content ", () => {
    return request(app)
      .delete("/api/comments/2")
      .expect(204)
      .then(({body}) => {
        console.log(body)
        expect(Object.keys(body).length).toEqual(0)
      })
  });
  test("responds with ID  not found if comment id is not included ", () => {
    return request(app)
      .delete("/api/comments/10000")

      .expect(404)
        
        .then(({body}) => {
          expect(body.msg).toEqual("ID not found !")
        })
         
      })
})
