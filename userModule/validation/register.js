
const validator = require('validator')
function validatorRegister(data){
    let errors = {};
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const regexvide = /^\s*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (regexvide.test(data.name)) {
      errors.name = "Required firstName";
    }
  
    if (regexvide.test(data.lastname)) {
      errors.lastname = "Required lastName";
    } 

    if(!emailRegex.test(data.email))  
    {
        errors.email = "format email invalid";
    }
    
    if (regexvide.test(data.username)) {
      errors.username = "Required username";
    }
    
    if (!passwordRegex.test(data.pwd)) {
      errors.pwd = "8 caractères minimum, contient au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial";
    }
    
    // Vérifier s'il y a des erreurs
    const isValid = Object.keys(errors).length === 0;
  
    return {
      errors,
      isValid,
    };
}
module.exports = validatorRegister