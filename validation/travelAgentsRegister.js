const Validator = require("validator");
const isEmpty = require("is-empty");
const PhoneNumberValidator = require("awesome-phonenumber");
let phoneNumber;

module.exports = function validateTravelAgentsRegisterInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.agencyCode = !isEmpty(data.agencyCode) ? data.agencyCode : "";
  data.phoneNumber = !isEmpty(data.phoneNumber) ? data.phoneNumber : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  // Name checks
  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = "First Name is required";
  }

  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = "Last Name is required";
  }

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // Agency Code checks
  if (Validator.isEmpty(data.agencyCode)) {
    errors.agencyCode = "Agency code is required";
  }

  // Phone Number checks
  if (Validator.isEmpty(data.phoneNumber)) {
    errors.phoneNumber = "Phone Number is required";
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Retype password can't be empty";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be between 6 and 30 characters";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
