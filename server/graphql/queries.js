const graphql = require('graphql')
const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull 

} = graphql;

// importing types
const {  UserType } = require("./objectTypes")

// importing models
const User = require("../models/UserModel")



const Query = new GraphQLObjectType({
    name: "Query",
    fields:{
        // for fetching all the user's from the database
        user: {
            type: new GraphQLList(UserType),
            resolve(parent, args){
                return User.find({})
            }
        }
    }
})

module.exports = Query