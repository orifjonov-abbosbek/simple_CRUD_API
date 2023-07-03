const http = require("http");
const {
  handleGetAllUsers,
  handleGetUserById,
  handleCreateUser,
  handleUpdateUser,
  handleDeleteUser,
} = require("./routes/routes");

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === "GET" && url === "/api/users") {
    handleGetAllUsers(req, res);
  } else if (method === "GET" && url.startsWith("/api/users/")) {
    const userId = url.split("/").pop();
    handleGetUserById(req, res, userId);
  } else if (method === "POST" && url === "/api/users") {
    handleCreateUser(req, res);
  } else if (method === "PUT" && url.startsWith("/api/users/")) {
    const userId = url.split("/").pop();
    handleUpdateUser(req, res, userId);
  } else if (method === "DELETE" && url.startsWith("/api/users/")) {
    const userId = url.split("/").pop();
    handleDeleteUser(req, res, userId);
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Not found" }));
  }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
