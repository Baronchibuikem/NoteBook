const graphql = require('graphql')
const User = require('../models/UserModel')
const { UserType } = require('./objectTypes');

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

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const keys = require("../config/keys")


// const login = async (_, {email, passport}) => {
//     const user = await User.findOne({where: {email}})

//     // if user does not exist
//     if(!user){
//         throw new Error("No user with that email")
//     }

//     // compare the password with the one from db
//     const valid = await bcrypt.compare(password, user.passport)

//     // if the passwords don't match
//     if(!valid){
//         throw new Error("Incorrect password")
//     }

//     // if passwords match
//     const payload = { id: user.id, name: user.name, email: user.email };
//     return jwt.sign(
//         payload,
//         keys.secretOrKey,
//         {expiresIn: "6h"}
//     )

// }


const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields:{
        signup: {
            type: UserType,
            args: {
                firstName: {type: new GraphQLNonNull(GraphQLString)},
                lastName: {type: new GraphQLNonNull(GraphQLString)},
                email: {type: new GraphQLNonNull(GraphQLString)},
                password: {type: new GraphQLNonNull(GraphQLString)},
                
            },
            resolve: async(parent, args)=>{                
                 const user = await User.findOne({ email: args.email })
                  if (user) {
                    throw new Error("Email already exists")                      
                  }
                  const newUser = new User({
                    firstName: args.firstName,
                    lastName: args.lastName,
                    email: args.email,        
                    password: await bcrypt.hash(args.password, 10)                
                  }); 
                  newUser.save()               
              //     bcrypt.genSalt(10, (err, salt) => {
              //       bcrypt.hash(newUser.password, salt, (err, hash) => {
              //         if (err) throw err;
              //         newUser.password = hash;
              //         newUser.save()
              //         console.log(newUser, "new user saved")
              //     });                      
              // })
                  console.log(newUser.lastName)
                 return jwt.sign(
                  { id: newUser.id, email: newUser.email, lastName: newUser.lastName },
                  keys.secretOrKey,
                  { expiresIn: "6h" },
                );
        },
        login: {
            type: UserType,
            args: {
                email: {type: new GraphQLNonNull(GraphQLString)},
                password: {type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parent, args){
                // const user = await User.findOne({where: args.email})
                // console.log(user)

                // // if user does not exist
                // if(!user){
                //     throw new Error("No user with that email")
                // }

                // // compare the password with the one from db
                // const valid = await bcrypt.compare(args.password, user.passport)

                // // if the passwords don't match
                // if(!valid){
                //     throw new Error("Incorrect password")
                // }

                // // if passwords match
                // const payload = { id: user.id, name: user.name, email: user.email };
                // return jwt.sign(
                //     payload,
                //     keys.secretOrKey,
                //     {expiresIn: "6h"}
                // )
                const email = args.email
                const password = args.password
                User.findOne({ email }).then((user) => {
                    // Check for user
                    console.log(user)
                    if (!user) {
                        throw new Error("No user with that email")
                    }
                    // Check Password
                    bcrypt.compare(password, user.password).then((isMatch) => {
                      if (isMatch) {
                        // User Matched
                        console.log("running ...........")
                        const payload = { id: user.id, email: user.email }; // Create JWT Payload
                        console.log(payload)
                        // Sign Token
                        return jwt.sign(
                          payload,
                          keys.secretOrKey,
                          { expiresIn: "6h" },
                          (err, token) => {
                            return ({
                              success: true,
                              token: "Bearer " + token
                            });
                          }
                        );
                      } else {
                        throw new Error("Incorrect password")
                      }
                    });
                  });
            }
        }
    }
}})

module.exports = Mutation