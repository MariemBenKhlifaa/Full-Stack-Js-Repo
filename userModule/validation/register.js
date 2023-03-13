var express = require("express");
const isEmpty = require('./isEmpty')
const validator = require('validator')
module.exports = function validatorRegister(data){
    let errors ={};
    data.name = !isEmpty(data.name) ? data.name : ""
    data.lastName = !isEmpty(data.lastName) ? data.lastName : ""
    data.email = !isEmpty(data.email) ? data.email : ""
    data.pwd = !isEmpty(data.pwd) ? data.password : ""
    data.username = !isEmpty(data.username) ? data.username : ""

    if (validator.isEmpty(data.name)){
        errors.name = "Required firstName";
    }
    if (validator.isEmpty(data.lastName)){
        errors.lastName = "Required lastName";
    }   
    if (!validator.isEmail(data.email)){
        errors.email = "Required format email";
    }
    if (validator.isEmpty(data.email)){
        errors.email = "Required email";
    }
    if (validator.isEmpty(data.pwd)){
        errors.password = "Required password";
    }
    if (validator.isEmpty(data.username)){
        errors.username = "Required username";
    }
 
 
    
    return{
        errors,
        isValid : isEmpty(errors)
    }
}