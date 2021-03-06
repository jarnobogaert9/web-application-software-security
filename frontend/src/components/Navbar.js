import { useAuth0 } from '@auth0/auth0-react';
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { Container, Menu } from 'semantic-ui-react';
import isAdmin from '../auth/isAdmin';
import { getUser } from '../services/userService';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

const AuthNav = () => {
  const { isAuthenticated } = useAuth0();
  return (isAuthenticated ? <LogoutButton /> : <LoginButton />)
}

const Navbar = () => {
  const history = useHistory();
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [admin, setAdmin] = useState(true);

  const checkIfAdmin = async () => {
    const token = await getAccessTokenSilently();
    const { sub } = await getUser({ token });
    const admin = await isAdmin(token, sub);
    setAdmin(admin)
  }

  useEffect(() => {
    if (isAuthenticated) {
      checkIfAdmin();
    }
  }, []);

  return (
    <div>
      <Container>
        <Menu>
          <Menu.Item onClick={() => {
            history.push('/')
            history.replace('/');
          }}>
            Home
          </Menu.Item>
          {isAuthenticated &&
            !admin && <Menu.Item onClick={() => history.push('/travellogs')}>
              Your Travel Logs
            </Menu.Item>
          }

          {isAuthenticated &&
            !admin &&
            <Menu.Item onClick={() => history.push('/travellogs/create')}>
              Create Travel Log
            </Menu.Item>
          }

          <Menu.Menu position='right'>
            {isAuthenticated &&
              admin &&
              <Menu.Item onClick={() => history.push('/admin')}>
                Admin page
              </Menu.Item>
            }
            {isAuthenticated &&
              <Menu.Item onClick={() => history.push('/profile')}>
                Profile
              </Menu.Item>
            }
            <Menu.Item>
              <AuthNav />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </Container>
    </div>
  )
}

// const Navbar = () => {
//   return (
//     <div>
//       <AppBar position="static">
//         <Container>
//           <Toolbar>
//             <Typography variant="h6" className={classes.title}>Travelr.</Typography>
//             {/* <Link to="/">Home</Link> */}
//             {/* <Link to="/profile">Profile</Link> */}
//             <AuthNav />
//           </Toolbar>
//         </Container>
//       </AppBar>
//     </div>
//   )
// }

export default Navbar
