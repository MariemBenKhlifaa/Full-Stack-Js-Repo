
const validator = require('validator')

function ControleSaisie(data){
    let errors = {};
    const regexvide = /^\s*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telRegex = /^(20|52|95|21|22|23|24|25|27|71)\d{6}$/;


  
    if (!validator.isLength(data.nom, { min: 3, max: 50 })) {
        errors.nom = 'Le champ nom doit contenir entre 3 et 10 caractères';
      }
      if (regexvide.test(data.nom)) {
        errors.nom = "Required nom";
      }
    if (regexvide.test(data.image)) {
        errors.image = "Required photo";
      }
 
    if (!validator.isLength(data.nom, { min: 3, max: 50 })) {
        errors.prenom = 'Le champ nom doit contenir entre 3 et 10 caractères';
      }
      if (regexvide.test(data.prenom)) {
        errors.prenom = "Required prenom";
      } 
    if(!emailRegex.test(data.email))  
    {
        errors.email = "format email invalid";
    }
  
    if (!validator.isInt(data.age, { min: 18 })) {
        errors.age = 'Vous devez être majeur pour soumettre ce formulaire';
      }
      if (!validator.isInt(data.age, { max: 65 })) {
        errors.age = 'désolé vous devez etre moins de 65 ans';
      }
  
      if (regexvide.test(data.age)) {
        errors.age = "Required age";
      }
      if (!telRegex.test(data.tel)) {
        errors.tel = 'Le champ téléphone doit être un numéro de téléphone valide';
      }
    if (regexvide.test(data.tel)) {
        errors.tel = "Required tel";
      }  
     
      if (regexvide.test(data.Duration)) {
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