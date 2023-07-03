const http = require("http");
const app = require("./src/server");

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(4000, "localhost", done);
});

afterAll((done) => {
  server.close(done);
});

describe("API Tests", () => {
  it('should respond with status code 200 and "Test route" message when making a GET request to /api/test', (done) => {
    const options = {
      hostname: "localhost",
      port: 4000,
      path: "/api/test",
      method: "GET",
    };

    const req = http.request(options, (res) => {
      expect(res.statusCode).toBe(200);

      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        expect(data).toBe("Test route");
        done();
      });
    });

    req.on("error", (err) => {
      done(err);
    });

    req.end();
  });
});
