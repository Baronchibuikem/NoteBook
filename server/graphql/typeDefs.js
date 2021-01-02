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
const User = require('../models/UserModel')


const TestType = new GraphQLObjectType({
    name: "Info",
    fields: () => ({
        name: {type: GraphQLString}
    })
})

const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id : {type: GraphQLID},
        lastName: {type: GraphQLString}
    })
})


module.exports = {TestType, UserType}