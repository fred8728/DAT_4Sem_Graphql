import express from "express";
import graphqlHTTP from "express-graphql";
import { schema } from "./data/schema";
import cors from 'cors'

const app = express();

app.use(cors())

app.get("/", (request, response) => {
  response.send("Test test GRAPHQL ");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(8080, () => console.log("Running server on localhost:8080/graphql"));
