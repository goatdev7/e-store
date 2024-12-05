import { productResolvers } from "./productResolvers";
import { userResolver } from "./userResolver";
import { mergeResolvers } from "@graphql-tools/merge";

const resolverArray = [userResolver, productResolvers];
export const resolvers = mergeResolvers(resolverArray);