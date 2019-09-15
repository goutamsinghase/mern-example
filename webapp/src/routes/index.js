import SignIn from "../containers/signin";
import AuthLayout from "../containers/auth-layout";

export const routes = [
  {
    path: "/auth/item/list",
    component: AuthLayout,
    exact: true
  },
  {
    path: "/login",
    component: SignIn
  }
];
