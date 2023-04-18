const validator = require('validator')

function Csaisie(data){
    let errors = {};
    const regexvide = /^\s*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telRegex = /^(20|52|95|21|22|23|24|25|27|71)\d{6}$/;


  
    if (!validator.isLength(data.title, { min: 3, max: 50 })) {
        errors.title = 'Le champ title doit contenir entre 3 et 10 caractères';
      }
      if (regexvide.test(data.title)) {
        errors.title = "Required title";
      }
    
 
    if (!validator.isLength(data.organizer, { min: 3, max: 50 })) {
        errors.organizer = 'Le champ organizer doit contenir entre 3 et 10 caractères';
      }
      if (regexvide.test(data.organizer)) {
        errors.organizer = "Required organizer";
      } 
   
      if (regexvide.test(data.description)) {
        errors.description = "Required description";
      }
   
     
      if (regexvide.test(data.date)) {
        errors.date = "Required date";
      }
     
      if (regexvide.test(data.location)) {
        errors.location = "Required location";
      }
    
    // Vérifier s'il y a des erreurs
    const isValid = Object.keys(errors).length === 0;
  
    return {
      errors,
      isValid,
    };
}
module.exports = Csaisie