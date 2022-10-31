const swaggerAutogen = require("swagger-autogen")();
const appConfig = require("./config/app");

const doc = {
  info: {
    title: "Authentication with Auth0 Example",
  },
  host: "",
  schemes: ["http", "https"],
  securityDefinitions: {
    Authorization: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      description: "Authentication token (Bearer)",
      example: "Bearer <your token>",
    },
  },
  security: [
    {
      Authorization: [],
    },
  ],
};

const outputFile = "./swagger-docs.json";
const endpointsFiles = ["./index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
