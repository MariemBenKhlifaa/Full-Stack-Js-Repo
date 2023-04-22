const validator = require('validator')

function Uppart(data){
    let errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telRegex = /^(20|52|21|22|23|24|25|27|71)\d{6}$/;
    const regexvide = /^\s*$/;

    if (!validator.isLength(data.fullName, { min: 3, max: 50 })) {
        errors.fullName = 'Le champ fullName doit contenir entre 3 et 10 caractères';
      }
  
    

    if (!telRegex.test(data.phone)) {
        errors.phone = 'Le champ téléphone doit être un numéro de téléphone valide';
      }
      

      if (!validator.isInt(data.guestSize, { max: 5 })) {
        errors.guestSize = 'désolé il faut pas depasser 5 personnes';
      }
  
      if(!emailRegex.test(data.userEmail))  
      {
          errors.userEmail = "format email invalid";
      }
    
      if (regexvide.test(data.participateAt)) {
        errors.participateAt = "Required date";
      } 
    // Vérifier s'il y a des erreurs
    const isValid = Object.keys(errors).length === 0;
  
    return {
      errors,
      isValid,
    };

}

module.exports = Uppart