// import { Link } from 'react-router-dom'
// import './header.css'
// export const Header = () => {
//   return (
//     <header>
//       <div className="container-header">
//         <Link className="link" to="/">
//           <h2>BookLand</h2>
//         </Link>

//         <nav>
//           <Link className="link" to="/login">
//             Login
//           </Link>
//           <Link className="link" to="/signup">
//             Cadastrar
//           </Link>
//           <Link className="link" to="/cart">
//             Carrinho
//           </Link>
//         </nav>
//       </div>
//     </header>
//   )
// }




import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuItem from './menuItem/menuItem';
import LogoMenu from './menuItem/logo';

import "./header.css"


interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;


export default function Header(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box>

          <LogoMenu />

      </Box>
      <Divider />
      <List>

         <MenuItem />


      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (

    <Box sx={{ display: 'flex' }} >
      <CssBaseline />
      <AppBar component="nav" className="menu-container-web">
        <Box>
        <Toolbar className='container-menu'>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />

          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
          
            <LogoMenu />
         
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            
           
               <MenuItem />
             
          </Box>
        </Toolbar>
        </Box>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    
    </Box>
  );

}
