import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import {Logout, InfoOutlined} from '@mui/icons-material'
import { auth } from '../utils/firebase'

export default function MenuAppBar(props) {
  return (
    <Box sx={{ flexGrow: 1, marginBottom : '3%' }}>
      <AppBar position="static" style={{backgroundColor: '#2D68C4'}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Dashboard
          </Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={()=>props.setShowInfo(true)}
                color="inherit"
              >
                <InfoOutlined />
              </IconButton>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={props.logOut}
                color="inherit"
              >
                <Logout />
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}