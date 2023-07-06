const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("./controllers");

const handleRequest = (req, res) => {
  const { method, url } = req;

  try {
    if (method === "GET" && url === "/api/users") {
      getAllUsers(req, res);
    } else if (method === "GET" && url.startsWith("/api/users/")) {
      const userId = url.split("/").pop();
      getUserById(req, res, userId);
    } else if (method === "POST" && url === "/api/users") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });

      req.on("end", () => {
        const { username, age, hobbies } = JSON.parse(body);
        req.body = { username, age, hobbies };
        createUser(req, res);
      });
    } else if (method === "PUT" && url.startsWith("/api/users/")) {
      const userId = url.split("/").pop();
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });

      req.on("end", () => {
        const { username, age, hobbies } = JSON.parse(body);
        req.body = { username, age, hobbies };
        updateUser(req, res, userId);
      });
    } else if (method === "DELETE" && url.startsWith("/api/users/")) {
      const userId = url.split("/").pop();
      deleteUser(req, res, userId);
    } else {
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ message: "Not found" }));
    }
  } catch (error) {
    console.error("An error occurred:", error);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Internal server error" }));
  }
};

module.exports = { handleRequest };
