const graphql = require('graphql')
const { GraphQLSchema } = graphql;
// import queries
const Query = require("./queries")
const Mutation = require("./mutations")


module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation
})