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
  userName: yup
  .string()
  .trim()
  .required("User name can not be empty")
  .test("isPerfectString", "Enter a valid Username", (arg) =>
    /^[A-Za-z ]+$/.test(arg)
  ),
});

