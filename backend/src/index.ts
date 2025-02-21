import { ApolloServer, AuthenticationError } from "apollo-server";
import mongoose from "mongoose";
import { typeDefs } from "./schema/typeDefs";
import { resolvers } from "./schema/resolvers/index";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


const SECRET_KEY = process.env.SECRET_KEY || 'default_secret_key';;

const startServer = async () => {
    try {
        // Connection to mongo
        await mongoose.connect("mongodb://127.0.0.1:27017/ullah-store");
        console.log("MongoDB connected");

        // Server creation
        const server = new ApolloServer({
            typeDefs,
            resolvers,
            context: ({ req }) => {
                const token = req.headers.authorization?.split(' ')[1] || '';

                if (token) {
                    try {
                        // verify the token by decrypting
                        const decodedToken = jwt.verify(token, SECRET_KEY) as any;
                        return { user: decodedToken };
                    } catch (error) {
                        console.error("Invalid Token", token);
                        throw new AuthenticationError("Authentication token is invalid or expired!");
                    }

                }
                // throw new AuthenticationError("Authentication token is invalid or expired");
                return {};

            },

        });

        // Server starting
        server.listen({ port: 4000 }, () =>
            console.log("Server ready at http://127.0.0.1:4000")
        );
    } catch (error) {
        console.log("Error starting up the server", error);
    }
};

startServer();