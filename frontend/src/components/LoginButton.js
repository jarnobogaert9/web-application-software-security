import React from "react";
import { Button } from '@material-ui/core'
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button
      variant="contained" color="secondary"
      onClick={() => loginWithRedirect()}
    >
      Log In
    </Button>
  );
};

export default LoginButton;