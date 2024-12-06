import { User } from "../../models/User";
import bcrypt, { compare } from "bcrypt";
import { isAuthenticated } from "../../utils/auth";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();



const SECRET_KEY = process.env.SECRET_KEY || 'default_secret_key';;

export const userResolver = {

    Query: {
        me: isAuthenticated(async(_:any, __:any, context:any) =>{
            // this check is not needed as we have applied middleware
            // if(!context.user){
            //     throw new Error("Not authenticated");
            // }
            return await User.findById(context.user.id);

        }),

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

            return {user, token};
        },

        registerUser: async(_:any, {input}: {input:any}) =>{
            const {firstName, lastName, username, email, password, role} = input;
            
            const userExist = await User.findOne({
                $or: [{email: email}, {username: username}]
            });

            // checking existing user
            if(userExist?.email == email){
                throw new Error("User with this email already exists");
            }
            if(userExist?.username == username){
                throw new Error("User with this username already exists");
            }
            
            // hash the password
            const hashedPass = await bcrypt.hash(password, 10);
            
            // add the user
            const user = new User({
                firstName,
                lastName,
                username,
                email,
                password: hashedPass,
                role,
            });

            await user.save();

            if(!SECRET_KEY){
                throw new Error("SECRET_KEY is not defined")
            }
            const token = jwt.sign({id: user._id, role:user.role}, SECRET_KEY, {
                expiresIn: '1d',
            });

            return {user, token};
        },

    },
};