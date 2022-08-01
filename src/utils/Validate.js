import { toast } from 'react-toastify';
import { kRegExpEmail, kRegExpPassword, kRegExpPhone, kRegExpUserName } from './Constants';

function isEmpty(str) {
  return !str || str.length === 0;
}
class Validators {
  static noValidator() {
    return null;
  }

  static nullValidator(name, value) {
    if (isEmpty(value)) {
      return `${name} ne peut pas être vide`; // can't be empty
    }
    return null;
  }

  static selectValidator(name, value) {
    if (isEmpty(value)) {
      return `${name} doit être sélectionné`; // must be selected
    }
    return null;
  }

  static lengthValidator(name, value, length) {
    if (isEmpty(value)) {
      return `${name} ne peut pas être vide`; // can't be empty
    }

    if (String(value).length < length) {
      return `${name} ne peut pas être inférieur à ${length} personnages`; // can't be less than ${length} characters
    }

    return null;
  }

  static arrayValidator(name, value) {
    if (value.length == 0) {
      return `Au moins un ${name} doit être sélectionné`; // At least one ${name} must be selected.
    }
    return null;
  }

  static emailValidator(name, value) {
    if (isEmpty(value)) {
      return `${name} ne peut pas être vide`; // can't be empty
    }

    const regexMatch = value.match(kRegExpEmail);

    if (!regexMatch) {
      return `${name} est invalide`; // is invalid
    }

    return null;
  }

  static passwordValidator(name, value) {
    if (isEmpty(value)) {
      return `${name} ne peut pas être vide`; // can't be empty
    }

    const regexMatch = value.match(kRegExpPassword);

    if (!regexMatch) {
      return `${name} doit comporter 8 caractères et inclure des majuscules, des minuscules, des caractères spéciaux et des chiffres`; // must be 8 characters and include uppercase, lowercase, special character and number
    }

    return null;
  }

  static phoneNoValidator(name, value) {
    if (isEmpty(value)) {
      return `${name} ne peut pas être vide`; // can't be empty
    }

    const regexMatch = value.match(kRegExpPhone);

    if (!regexMatch) {
      return `${name} est invalide`; // is invalid
    }

    return null;
  }

  static minlengthValidator(name,value){
   if(value?.length<4){
    return `${name} la longueur doit être d'au moins 4`;
   }
  }
 
  static matchPasswordConfirmPassword(password,passwordValue,confirmPassword,confirmPasswordValue){
        if(passwordValue!=confirmPasswordValue){
         return `${password} et ${confirmPassword} devrait être le même`
        }
  }

  static phoneLengthValidator(name, value) {
    if (isEmpty(value)) {
      return `${name} ne peut pas être vide`; // can't be empty
    }

    if (value.length < 10) {
      return `${name} doit comporter au moins 10 chiffres`; // must be 10 digits at least
    }

    if (value.length > 13) {
      return `${name} ne peut pas comporter plus de 13 chiffres`; // can't be more than 13 digits
    }

    return null;
  }

  static userNameValidator(name, value) {
    if (isEmpty(value)) {
      return `${name} ne peut pas être vide`; // can't be empty
    }

    const regexMatch = value.match(kRegExpUserName);

    if (!regexMatch) {
      return `${name} ne peut contenir que des lettres, des chiffres ou un trait de soulignement`; // can only contain alphabets, numbers or underscore
    }

    return null;
  }
}

function formValidator(valFuncArr) {
  for (let i = 0; i < valFuncArr.length; i++) {
    const objDataValidationError = valFuncArr[i]();

    if (objDataValidationError) {
      toast.error(objDataValidationError);
      return false;
    }
  }

  return true;
}

export { Validators, formValidator };
