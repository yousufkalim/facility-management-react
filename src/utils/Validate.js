import { toast } from "react-toastify";
import { kRegExpEmail, kRegExpPassword, kRegExpPhone, kRegExpUserName } from "./Constants";

function isEmpty(str) {
  return !str || str.length === 0;
}

class Validators {
  static noValidator() {
    return null;
  }

  static nullValidator(name, value) {
    if (isEmpty(value)) {
      return `${name} can't be empty`;
    }
    return null;
  }

  static selectValidator(name, value) {
    if (isEmpty(value)) {
      return `${name} must be selected`;
    }
    return null;
  }

  static lengthValidator(name, value, length) {
    if (isEmpty(value)) {
      return `${name} can't be empty`;
    }

    if (String(value).length < length) {
      return `${name} can't be less than ${length} characters`;
    }

    return null;
  }

  static emailValidator(name, value) {
    if (isEmpty(value)) {
      return `${name} can't be empty`;
    }

    const regexMatch = value.match(kRegExpEmail);

    if (!regexMatch) {
      return `${name} is invalid`;
    }

    return null;
  }

  static passwordValidator(name, value) {
    if (isEmpty(value)) {
      return `${name} can't be empty`;
    }

    const regexMatch = value.match(kRegExpPassword);

    if (!regexMatch) {
      return `${name} must be 8 characters and include uppercase, lowercase, special character and number`;
    }

    return null;
  }

  static phoneNoValidator(name, value) {
    if (isEmpty(value)) {
      return `${name} can't be empty`;
    }

    const regexMatch = value.match(kRegExpPhone);

    if (!regexMatch) {
      return `${name} is invalid`;
    }

    return null;
  }

  static userNameValidator(name, value) {
    if (isEmpty(value)) {
      return `${name} can't be empty`;
    }

    const regexMatch = value.match(kRegExpUserName);

    if (!regexMatch) {
      return `${name} can only contain alphabets, numbers or underscore`;
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
