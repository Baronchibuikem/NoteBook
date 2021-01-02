const types = require("./schema")
const {} = types


const resolvers = {
    Query: {
      fields: {
          info: {
              resolve(parent, args){
                  return "Hi there"
              }
          }
      }
  }
}


module.exports = resolvers