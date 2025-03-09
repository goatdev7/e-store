import { productResolvers } from "./productResolvers";
import { userResolver } from "./userResolver";
import { mergeResolvers } from "@graphql-tools/merge";
import {cartResolvers} from "./cartResolvers";
import { orderResolver } from "./orderResolver";

const resolverArray = [userResolver, productResolvers, cartResolvers, orderResolver];
export const resolvers = mergeResolvers(resolverArray);