const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("./controllers");

const handleRequest = (req, res) => {
  const { method, url } = req;

  if (method === "GET" && url === "/api/users") {
    getAllUsers(req, res);
  } else if (method === "GET" && url.startsWith("/api/users/")) {
    const userId = url.split("/").pop();
    getUserById(req, res, userId);
  } else if (method === "POST" && url === "/api/users") {
    createUser(req, res);
  } else if (method === "PUT" && url.startsWith("/api/users/")) {
    const userId = url.split("/").pop();
    updateUser(req, res, userId);
  } else if (method === "DELETE" && url.startsWith("/api/users/")) {
    const userId = url.split("/").pop();
    deleteUser(req, res, userId);
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Not found" }));
  }
};

module.exports = { handleRequest };
