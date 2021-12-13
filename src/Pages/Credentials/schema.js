import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export const loginSchema = yupResolver(
  yup.object().shape({
    email: yup.string().email("Email is not valid!").required("Email is required!"),
    password: yup.string().required("Password is required!")
  })
);
