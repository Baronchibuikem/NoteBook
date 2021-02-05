const Validator = require('validator')
const isEmpty = require("./isEmpty");

// setting up validation for registration form

module.exports = function validateRegisterInput(data){
    let errors = {};

    data.firstName = !isEmpty(data.firstName) ? data.firstName : ""
    data.lastName = !isEmpty(data.lastName) ? data.lastName : ""
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password = !isEmpty(data.password2) ? data.password2 : '';

    if(!Validator.isLength(data.firstName, {min: 2, max: 30})){
        errors.firstName = "firstName must be between 2 and 30 characters"
    }

    if(Validator.isEmpty(data.firstName)){
        errors.firstName = "firstName field is required"
    }

    if(!Validator.isLength(data.lastName, {min: 2, max: 30})){
        errors.lastName = "lastName must be between 2 and 30 characters"
    }

    if(Validator.isEmpty(data.lastName)){
        errors.lastName = "lastName field is required"
    }

    if(Validator.isEmpty(data.email)){
        errors.email ='Email field is required';
    }

    if(!Validator.isEmail(data.email)){
        errors.email ='Email is invalid';
    }

    if(Validator.isEmpty(data.password)){
        errors.password ='Password field is required';
    }

    if(!Validator.isLength(data.password, {min:8 })){
        errors.password ='Password field is required';  
    }

    if(Validator.isEmpty(data.password2)){
        errors.password2 ='Confirm Passwords field is required';
    }

    if(!Validator.equals(data.password, data.password2)){
        errors.password2 = 'Passwords must match';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
