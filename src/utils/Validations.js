import { Validators, formValidator } from '../utils/Validate';

function login(data) {
  const valFuncArr = [
    () => Validators.emailValidator('Email', data['email']),
    // () => Validators.lengthValidator('Password', data['password'], 8),
  ];

  const validated = formValidator(valFuncArr);

  return validated;
}

function registration(data) {
  const valFuncArr = [
    () => Validators.nullValidator(`Nom de l'entreprise`, data['name_of_company']),
    () => Validators.nullValidator('Prénom', data['first_name']),
    () => Validators.nullValidator('Nom de famille', data['last_name']),
    () => Validators.emailValidator('Adresse e-mail', data['email']),
    () => Validators.phoneNoValidatorfrance('Numéro de téléphone', data['phone']),
    () => Validators.passwordValidator('Password', data['password']),
    () => Validators.passwordValidator('Confirm Password', data['confirm_password']),
    () => Validators.matchPasswordConfirmPassword('Password', data['password'], 'Confirm Password', data['confirm_password']),
    () => Validators.minlengthValidator(`Nom de l'entreprise`, data['name_of_company']),
    () => Validators.minlengthValidator('Prénom', data['first_name']),
    () => Validators.minlengthValidator('Nom de famille', data['last_name']),
  ];

  const validated = formValidator(valFuncArr);

  return validated;
}

function forgotPassword1(data) {
  const valFuncArr = [() => Validators.emailValidator('Email', data['email'])];

  const validated = formValidator(valFuncArr);

  return validated;
}

function forgotPassword2(data) {
  const valFuncArr = [
    () => Validators.nullValidator('Password', data['password']),
    () => Validators.nullValidator('Confirm Password', data['password_re']),
    () => Validators.matchPasswordConfirmPassword('Password', data['password'], 'Confirm Password', data['password_re']),
    () => Validators.passwordValidator('Password', data['password']),
    () => Validators.passwordValidator('Confirm Password', data['password_re']),
  ];

  const validated = formValidator(valFuncArr);

  return validated;
}

// forgotPassword1

function addTicketadmin(data) {
  const valFuncArr = [
    () => Validators.selectValidator('bâtiment', data['building']),
    () => Validators.selectValidator('Niveau du bâtiment', data['building_level']),
    () => Validators.selectValidator('Category', data['category']),
    // () => Validators.nullValidator("Title", data["title"]),
    // () => Validators.selectValidator("Priority", data["priority"]),
    () => Validators.selectValidator('Assignee', data['assignee']),
  ];

  const validated = formValidator(valFuncArr);

  return validated;
}
function addTicketuser(data) {
  const valFuncArr = [
    () => Validators.selectValidator('bâtiment', data['building']),
    () => Validators.selectValidator('Niveau du bâtiment', data['building_level']),
    () => Validators.selectValidator('Category', data['category']),
    // () => Validators.nullValidator("Title", data["title"]),
    // () => Validators.selectValidator("Priority", data["priority"]),
    //() => Validators.selectValidator('Assignee', data['assignee']),
  ];

  const validated = formValidator(valFuncArr);

  return validated;
}

function addUser(data) {
  const valFuncArr = [
    () => Validators.nullValidator('Prénom', data['first_name']),
    () => Validators.nullValidator('Nom de famille', data['last_name']),
    () => Validators.minlengthValidator('Prénom', data['first_name']),
    () => Validators.minlengthValidator('Nom de famille', data['last_name']),
    // () => Validators.domainEmailValidator('Adresse e-mail', data['email']),
    () => Validators.phoneNoValidatorfrance('Numéro de téléphone', data['phone']),
    () => Validators.nullValidator('Entreprise', data['enterprise']),
    //() => Validators.nullValidator('bâtiment', data['building']),
  ];

  const validated = formValidator(valFuncArr);

  return validated;
}

function addBuilding(data) {
  const valFuncArr = [
    () => Validators.nullValidator('Titre', data['title']),
    () => Validators.nullValidator('Couleur', data['color']),
    () => Validators.arrayValidator('niveau', data['levels']),
  ];

  const validated = formValidator(valFuncArr);

  return validated;
}

function updateAdmin(data) {
  const valFuncArr = [
    () => Validators.nullValidator('Prénom', data['first_name']),
    () => Validators.nullValidator('Nom de famille', data['last_name']),
    () => Validators.emailValidator('Adresse e-mail', data['email']),
    () => (data?.password ? Validators.passwordValidator('Password', data['password']) : null),
    () => Validators.phoneLengthValidator('Numéro de téléphone', data['phone']),
    () => Validators.minlengthValidator(`Nom de l'entreprise`, data['company_name']),
    () => Validators.minlengthValidator('Prénom', data['first_name']),
    () => Validators.minlengthValidator('Nom de famille', data['last_name']),
  ];

  const validated = formValidator(valFuncArr);

  return validated;
}

export {
  login,
  registration,
  forgotPassword1,
  forgotPassword2,
  addTicketadmin,
  addTicketuser,
  addUser,
  addBuilding,
  updateAdmin,
};
