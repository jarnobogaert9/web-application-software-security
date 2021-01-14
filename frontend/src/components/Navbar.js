import { useAuth0 } from '@auth0/auth0-react';
import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

const AuthNav = () => {
  const { isAuthenticated } = useAuth0();
  return (isAuthenticated ? <LogoutButton /> : <LoginButton />)
}

const Navbar = () => {
  const history = useHistory();
  return (
    <div>
      <Container>

        <Menu>

          <Menu.Item
            name='browse'
          >
            Browse
        </Menu.Item>

          <Menu.Item
            name='submit'

          >
            Submit
        </Menu.Item>

          <Menu.Menu position='right'>
            <Menu.Item
              onClick={() => history.push('/profile')}
            >
              Profile
            </Menu.Item>

            {/* <Menu.Item
            name='help'
            >
            Help
          </Menu.Item> */}
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