import { productResolvers } from "./productResolvers";
import { userResolver } from "./userResolver";
import { mergeResolvers } from "@graphql-tools/merge";
import {cartResolvers} from "./cartResolvers";

const resolverArray = [userResolver, productResolvers, cartResolvers];
export const resolvers = mergeResolvers(resolverArray);