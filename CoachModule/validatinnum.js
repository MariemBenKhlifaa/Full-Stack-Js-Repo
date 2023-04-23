
const validator = require('validator')
let errors = {};
function ControleSaisie(data){
    let errors = {};
    const regexvide = /^\s*$/;
   
    const telRegex = /^(20|50|95|21|22|23|24|25|27|71)\d{6}$/;


  
      if (!telRegex.test(data)) {
        errors.tel = 'Le champ téléphone doit être un numéro de téléphone valide';
      }
    if (regexvide.test(data)) {
        errors.tel = "Required tel";
      }  
     
     
    
    // Vérifier s'il y a des erreurs
    const isValid = Object.keys(errors).length === 0;
  
    return {
      errors,
      isValid,
    };
}
module.exports = ControleSaisie