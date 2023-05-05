import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import dotenv from "dotenv/config";
import mongoose from "mongoose";
import context from "./context/index.js";
import { resolvers } from "./resolvers/index.js";
import { typeDefs } from "./schema/index.js";

const PORT = process.env.PORT || 8800;

mongoose.connect(process.env.ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB connected");
}).catch(err => {
  console.log(err);
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  context,
  listen: { port: PORT }
});

console.log(`🚀 Server listening at: ${url}`);