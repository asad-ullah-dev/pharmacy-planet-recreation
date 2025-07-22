import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export const registerSchema = yup.object({
  firstName: yup
    .string()
    .min(2, "First name must be at least 2 characters")
    .required("First name is required"),
  lastName: yup
    .string()
    .min(2, "Last name must be at least 2 characters")
    .required("Last name is required"),
  dobDay: yup
    .string()
    .required("Day is required")
    .matches(/^(0?[1-9]|[12][0-9]|3[01])$/, "Please enter a valid day"),
  dobMonth: yup
    .string()
    .required("Month is required")
    .matches(/^(0?[1-9]|1[012])$/, "Please enter a valid month"),
  dobYear: yup
    .string()
    .required("Year is required")
    .matches(/^(19|20)\d{2}$/, "Please enter a valid year"),
  phoneNumber: yup.string().required("Phone is required"),
  gender: yup
    .string()
    .oneOf(["male", "female", "other"], "Please select a valid gender")
    .required("Gender is required"),
  streetAddress: yup
    .string()
    .min(5, "Street address must be at least 5 characters")
    .required("Street address is required"),
  county: yup.string().required("Country is required"),
  city: yup.string().required("City is required"),
  zipCode: yup.string().required("ZIP/Postal code is required"),
  ethnicGroup: yup.string().required("Ethnic group is required"),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    )
    .required("Password is required"),
  agreeTerms: yup
    .mixed()
    .oneOf([true], "You must agree to the terms and conditions")
    .required("You must agree to the terms and conditions"),
});

export const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
});

export const resetPasswordSchema = yup.object({
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    )
    .required("Password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Password confirmation is required"),
});
