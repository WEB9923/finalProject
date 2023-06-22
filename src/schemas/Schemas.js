import * as yup from "yup";

const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
const LoginSchema = yup.object().shape({
   email: yup
      .string()
      .email("enter valid email address!")
      .required("email field is required!"),
   password: yup
      .string()
      .min(8, "length of the password must be at least 8 characters, so the entered password is incorrect")
      .matches(regex, "password must contain at least 1 uppercase letter,1 lowercase letter,1number,that is the password will not be valid!")
      .required("password field is required!")
}).required();
//****** register schema ******//
const RegisterSchema = yup.object().shape({
   username: yup
      .string()
      .min(3, "username must be at least 3 character")
      .max(12, "username must be a maximum of 12 character")
      .required("username field is required!"),
   email: yup
      .string()
      .email("enter valid email address!")
      .required("email field is required!"),
   firstname: yup
      .string()
      .required("firstname field is required!"),
   lastname: yup
      .string()
      .required("lastname field is required!"),
   phoneNumber: yup
      .number()
      .positive("enter only positive numbers")
      .integer("enter only integer numbers")
      .required("phone number field is required!"),
   password: yup
      .string()
      .min(8, "length of the password must be at least 8 characters!")
      .matches(regex, "password must contain at least 1 uppercase letter,1 lowercase letter,1number!")
      .required("password field is required!"),
   confirm: yup
      .string()
      .oneOf([yup.ref("password")], "passwords do not match!")
      .required("confirm password field is required")
}).required();

export {LoginSchema, RegisterSchema};