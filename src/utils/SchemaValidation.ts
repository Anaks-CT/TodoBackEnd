import * as yup from "yup";

export const todoSchema = yup.object().shape({
  title: yup.string().trim().required("Todo can not be empty"),
  completed: yup.boolean(),
});

export const todoUpdateSchema = yup.object().shape({
  title: yup.string().trim().min(1, "Title cannot be empty"),
  completed: yup
    .boolean()
    .test(
      "is-boolean",
      "Completed must be a boolean value",
      (value) => typeof value === "boolean"
    ),
});

export const userSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required("Enter you email")
    .test("isvalidEmail", "Enter a valid Email", (arg) =>
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(arg)
    ),
});

