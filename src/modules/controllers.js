// controllers.js

const { v4: uuidv4 } = require("uuid");

let users = [

    {
        username: 'john',
        age: 34,
        hobbies: 'playing'
    }
];

const getAllUsers = (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(users));
};

const getUserById = (req, res, userId) => {
  const user = users.find((u) => u.id === userId);

  if (!user) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "User not found" }));
    return;
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(user));
};

const createUser = (req, res) => {
  const { username, age, hobbies } = req.body;

  if (!username || !age) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Missing required fields" }));
    return;
  }

  const newUser = {
    id: uuidv4(),
    username,
    age,
    hobbies: hobbies || [],
  };

  users.push(newUser);

  res.statusCode = 201;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(newUser));
};

const updateUser = (req, res, userId) => {
  const { username, age, hobbies } = req.body;

  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "User not found" }));
    return;
  }

  const updatedUser = {
    id: userId,
    username: username || users[userIndex].username,
    age: age || users[userIndex].age,
    hobbies: hobbies || users[userIndex].hobbies,
  };

  users[userIndex] = updatedUser;

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(updatedUser));
};

const deleteUser = (req, res, userId) => {
  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "User not found" }));
    return;
  }

  users.splice(userIndex, 1);

  res.statusCode = 204;
  res.end();
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
