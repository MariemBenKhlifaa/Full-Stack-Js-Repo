const validator = require("validator");

function UpAbo(data) {
  let errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const telRegex = /^(20|52|21|22|23|24|25|27|71)\d{6}$/;

  if (!validator.isLength(data.nom, { min: 3, max: 50 })) {
    errors.nom = "Le champ nom doit contenir entre 3 et 10 caractères";
  }

  if (!validator.isLength(data.prenom, { min: 3, max: 50 })) {
    errors.prenom = "Le champ nom doit contenir entre 3 et 10 caractères";
  }

  if (!telRegex.test(data.tel)) {
    errors.tel = "Le champ téléphone doit être un numéro de téléphone valide";
  }

  if (!emailRegex.test(data.email)) {
    errors.email = "format email invalid";
  }

  // Vérifier s'il y a des erreurs
  const isValid = Object.keys(errors).length === 0;

  return {
    errors,
    isValid,
  };
}

module.exports = UpAbo;
