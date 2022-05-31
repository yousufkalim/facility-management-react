import { Validators, formValidator } from "../utils/Validate";

function login(data) {
  const valFuncArr = [
    () => Validators.emailValidator("Email", data["email"]),
    () => Validators.lengthValidator("Password", data["password"], 8),
  ];

  const validated = formValidator(valFuncArr);

  return validated;
}

function registration(data) {
  const valFuncArr = [
    () => Validators.nullValidator("Name of Company", data["name_of_company"]),
    () => Validators.nullValidator("First Name", data["first_name"]),
    () => Validators.nullValidator("Last Name", data["last_name"]),
    () => Validators.emailValidator("Email Address", data["email"]),
    () => Validators.nullValidator("Phone Number", data["phone"]),
    () => Validators.lengthValidator("Password", data["password"], 8),
    () => Validators.nullValidator("Confirm Password", data["confirm_password"]),
  ];

  const validated = formValidator(valFuncArr);

  return validated;
}

export { login, registration };
