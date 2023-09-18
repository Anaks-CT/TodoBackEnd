import * as yup from "yup";

export const todoSchema = yup.object().shape({
  title: yup.string().trim().required("Todo can not be empty"),
  completed: yup.boolean(),
});
