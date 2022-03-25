import * as Yup from "yup";

export const donationSchema = Yup.object().shape({
  firstName: Yup.string()
    .trim()
    .min(1, "Please enter your official first name")
    .required("First name is required."),
  lastName: Yup.string()
    .trim()
    .min(1, "Please enter your official last name")
    .required("Last name is required."),
  email: Yup.string()
    .trim()
    .email("Please enter a valid email address")
    .required("Email is required."),
  donationAmount: Yup.number()
    .min(1, "Amount cannot be lower than 1.")
    .required("Please enter a donation amount."),
});
