import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";
import {typeDefs} from "./schema/typeDefs";
import {resolvers} from "./schema/resolvers";

const startServer = async () =>{
    try{
        // Connection to mongo
        await mongoose.connect("mongodb://127.0.0.1:27017/ullah-store");
        console.log("MongoDB connected");

        // Server creation
        const server = new ApolloServer({typeDefs, resolvers});

        // Server starting
        server.listen({port:4000}, () =>
            console.log("Server ready at http://127.0.0.1:4000")
    );
    }catch (error){
        console.log("Error starting up the server", error);
    }
};

startServer();