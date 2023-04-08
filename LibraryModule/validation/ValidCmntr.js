
const validator = require('validator')

function ValidCmntr(data){
    let errors = {};
    const regexvide = /^\s*$/;
   
 
    if (regexvide.test(data.description)) {
        errors.description = "Required commentaire ";
      }

    
    // Vérifier s'il y a des erreurs
    const isValid = Object.keys(errors).length === 0;
  
    return {
      errors,
      isValid,
    };

}

module.exports = ValidCmntr