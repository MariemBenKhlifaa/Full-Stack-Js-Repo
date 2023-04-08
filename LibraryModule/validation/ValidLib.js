
const validator = require('validator')

function ValidLib(data){
    let errors = {};
    const regexvide = /^\s*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telRegex = /^(20|52|21|22|23|24|25|27|71)\d{6}$/;

    if (!validator.isLength(data.name, { min: 3, max: 50 })) {
        errors.name = 'Le champ nom doit contenir entre 3 et 10 caractères';
      }
    if (regexvide.test(data.name)) {
        errors.name = "Required name";
      }

    if (regexvide.test(data.img)) {
        errors.img = "Required photo";
      }
 

    if (!telRegex.test(data.tel)) {
        errors.tel = 'Le champ téléphone doit être un numéro de téléphone valide';
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
    if (regexvide.test(data.pays)) {
        errors.pays = "Required pays";
      } 
  
      if(!emailRegex.test(data.email))  
      {
          errors.email = "format email invalid";
      }
    
    // Vérifier s'il y a des erreurs
    const isValid = Object.keys(errors).length === 0;
  
    return {
      errors,
      isValid,
    };

}

module.exports = ValidLib