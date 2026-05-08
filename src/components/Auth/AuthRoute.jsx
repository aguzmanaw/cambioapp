import { Redirect } from "wouter";

export function AuthRoute({ isAllowed, children }) {
  if (!isAllowed) return <Redirect to={"/"} />;

  return children;
}
