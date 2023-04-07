
const validator = require('validator')

function ValidLib(data){
    let errors = {};
    const regexvide = /^\s*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (regexvide.test(data.name)) {
      errors.name = "Required name";
    }
    if (regexvide.test(data.img)) {
        errors.img = "Required photo";
      }
    if (regexvide.test(data.pays)) {
      errors.pays = "Required pays";
    } 

    if(!emailRegex.test(data.email))  
    {
        errors.email = "format email invalid";
    }
    
  
    if (regexvide.test(data.tel)) {
        errors.tel = "Required tel";

    }
    if (regexvide.test(data.adresse)) {
        errors.adresse = "Required adresse";

    }
    if (regexvide.test(data.img)) {
        errors.img = "Required photo";

    }

    
    // Vérifier s'il y a des erreurs
    const isValid = Object.keys(errors).length === 0;
  
    return {
      errors,
      isValid,
    };

}

module.exports = ValidLib