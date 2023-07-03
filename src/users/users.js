// src/users.js

const { v4: uuidv4 } = require("uuid");

let users = [
  {
    username: "johndoe",
    age: 23,
    hobbies: "reading, playing video games",
  },

  {
    username: "maksim",
    age: 23,
    hobbies: "reading, coding",
  },

  {
    username: "oleg",
    age: 33,
    hobbies: "reading, coding",
  },
];

function getAllUsers() {
  return users;
}

function getUserById(userId) {
  return users.find((user) => user.id === userId);
}

function createUser(username, age, hobbies) {
  const newUser = {
    id: uuidv4(),
    username,
    age,
    hobbies,
  };
  users.push(newUser);
  return newUser;
}

function updateUser(userId, username, age, hobbies) {
  const user = users.find((user) => user.id === userId);
  if (user) {
    user.username = username;
    user.age = age;
    user.hobbies = hobbies;
  }
  return user;
}

function deleteUser(userId) {
  const userIndex = users.findIndex((user) => user.id === userId);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
