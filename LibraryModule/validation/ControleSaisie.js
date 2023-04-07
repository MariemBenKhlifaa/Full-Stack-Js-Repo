
const validator = require('validator')

function ControleSaisie(data){
    let errors = {};
    const regexvide = /^\s*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (regexvide.test(data.nom)) {
      errors.nom = "Required nom";
    }
    if (regexvide.test(data.image)) {
        errors.image = "Required photo";
      }
    if (regexvide.test(data.prenom)) {
      errors.prenom = "Required prenom";
    } 

    if(!emailRegex.test(data.email))  
    {
        errors.email = "format email invalid";
    }
    
    if (regexvide.test(data.age)) {
      errors.age = "Required age";
    }
    if (regexvide.test(data.tel)) {
        errors.tel = "Required tel";


      }  if (regexvide.test(data.Duration)) {
        errors.Duration = "Required Duration";
      }

      if (regexvide.test(data.city)) {
        errors.city = "Required city";
      }
    
    // Vérifier s'il y a des erreurs
    const isValid = Object.keys(errors).length === 0;
  
    return {
      errors,
      isValid,
    };
}
module.exports = ControleSaisie