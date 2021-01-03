const graphql = require('graphql')
const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean
} = graphql;

// import models
const User = require('../models/UserModel')


const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id : {type: GraphQLID},
        lastName: {type: GraphQLString},
        email: {type: GraphQLString},
    })
})


module.exports = {UserType}