import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from 'semantic-ui-react';

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    // <Button
    //   variant="contained" color="secondary"
    //   onClick={() =>
    //     logout({
    //       returnTo: window.location.origin,
    //     })
    //   }
    // >
    //   Log Out
    // </Button>
    <Button
      color="red"
      onClick={() => logout({
        returnTo: window.location.origin,
      })}
    >
      Log Out
    </Button>
    // <button onClick={() =>
    //   logout({
    //     returnTo: window.location.origin,
    //   })
    // }></button>
  );
};

export default LogoutButton;