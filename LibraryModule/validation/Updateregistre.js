
const validator = require('validator')

function Updateregistre(data){
    let errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telRegex = /^(20|52|21|22|23|24|25|27|71)\d{6}$/;

    if (!validator.isLength(data.name, { min: 3, max: 50 })) {
        errors.name = 'Le champ nom doit contenir entre 3 et 10 caractères';
      }
  
    

    if (!telRegex.test(data.tel)) {
        errors.tel = 'Le champ téléphone doit être un numéro de téléphone valide';
      }
      

     
    if (!validator.isLength(data.location, { min: 3, max: 50 })) {
      errors.location = 'Le champ nom doit contenir entre 3 et 150 caractères';
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

module.exports = Updateregistre