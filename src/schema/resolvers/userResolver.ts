import { User } from "../../models/User";
import bcrypt, { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


const SECRET_KEY = process.env.SECRET_KEY || 'default_secret_key';;

export const userResolver = {

    Query: {

    },

    Mutation: {
        loginUser: async (_: any, { input }: { input: any }) => {
            const { identifier, password } = input;

            // finding the user by either email or username
            const user = await User.findOne({
                $or: [{ email: identifier }, { username: identifier }]
            });
            if (!user) {
                throw new Error("Invalid Credentials");
            }

            // checking passwords:
            const validPass = bcrypt.compare(password, user.password);
            if (!validPass) {
                throw new Error("Invalid Credentials");
            }
            if(!SECRET_KEY){
                throw new Error("SECRET_KEY is not defined")
            }
            const token = jwt.sign({id: user._id, role:user.role}, SECRET_KEY, {
                expiresIn: '1d',
            });

            return {token, user};
        }

    }
}