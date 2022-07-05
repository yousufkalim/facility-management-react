import { Validators, formValidator } from '../utils/Validate';

function login(data) {
  const valFuncArr = [
    () => Validators.emailValidator('Email', data['email']),
    () => Validators.lengthValidator('Password', data['password'], 8),
  ];

  const validated = formValidator(valFuncArr);

  return validated;
}

function registration(data) {
  const valFuncArr = [
    () => Validators.nullValidator('Name of Company', data['name_of_company']),
    () => Validators.nullValidator('First Name', data['first_name']),
    () => Validators.nullValidator('Last Name', data['last_name']),
    () => Validators.emailValidator('Email Address', data['email']),
    () => Validators.nullValidator('Phone Number', data['phone']),
    () => Validators.lengthValidator('Password', data['password'], 8),
    () => Validators.nullValidator('Confirm Password', data['confirm_password']),
  ];

  const validated = formValidator(valFuncArr);

  return validated;
}

function addTicket(data) {
  const valFuncArr = [
    () => Validators.selectValidator('Building', data['building']),
    () => Validators.selectValidator('Building Level', data['building_level']),
    () => Validators.selectValidator('Category', data['category']),
    // () => Validators.nullValidator("Title", data["title"]),
    // () => Validators.selectValidator("Priority", data["priority"]),
    // () => Validators.selectValidator("Assignee", data["assignee"]),
  ];

  const validated = formValidator(valFuncArr);

  return validated;
}

function addUser(data) {
  const valFuncArr = [
    () => Validators.nullValidator('First Name', data['first_name']),
    () => Validators.nullValidator('Last Name', data['last_name']),
    () => Validators.emailValidator('Email Address', data['email']),
    () => Validators.nullValidator('Phone Number', data['phone']),
    () => Validators.selectValidator('Enterprise', data['enterprise']),
    () => Validators.nullValidator('Building', data['building']),
  ];

  const validated = formValidator(valFuncArr);

  return validated;
}

function addBuilding(data) {
  const valFuncArr = [
    () => Validators.nullValidator('Title', data['title']),
    () => Validators.nullValidator('Color', data['color']),
    () => Validators.arrayValidator('level', data['levels']),
  ];

  const validated = formValidator(valFuncArr);

  return validated;
}

function updateAdmin(data) {
  const valFuncArr = [
    () => Validators.nullValidator('First Name', data['first_name']),
    () => Validators.nullValidator('Last Name', data['last_name']),
    () => Validators.emailValidator('Email', data['email']),
    () => Validators.nullValidator('Phone', data['phone']),
  ];

  const validated = formValidator(valFuncArr);

  return validated;
}

export { login, registration, addTicket, addUser, addBuilding, updateAdmin };
