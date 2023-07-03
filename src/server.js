// server.js

require("dotenv").config();
const http = require("http");
const { handleRequest } = require("./modules/handlers");
const cluster = require("cluster");
const os = require("os");

if (cluster.isMaster) {
  const numWorkers = os.cpus().length - 1;

  console.log(`Master cluster setting up ${numWorkers} workers...`);

  for (let i = 0; i < numWorkers; i++) {
    cluster.fork();
  }

  cluster.on("online", (worker) => {
    console.log(`Worker ${worker.process.pid} is online`);
  });

  cluster.on("exit", (worker, code, signal) => {
    console.log(
      `Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`
    );
    console.log("Starting a new worker");
    cluster.fork();
  });
} else {
  const server = http.createServer(handleRequest);

  const PORT = process.env.PORT || 3000;

  server.listen(PORT, () => {
    console.log(`Worker ${process.pid} listening on port ${PORT}`);
  });

  // Close the server when the process is terminated
  process.on("SIGINT", () => {
    console.log(`Worker ${process.pid} received SIGINT signal`);
    server.close(() => {
      console.log(`Worker ${process.pid} has been gracefully terminated`);
      process.exit(0);
    });
  });
}
