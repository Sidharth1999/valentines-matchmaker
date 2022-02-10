import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  //height: 60,
  lineHeight: '60px',
}));

const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });

export default function FloatTextBig(props) {
  return (
      <div style={{padding: '3%'}}>
          <ThemeProvider theme={lightTheme}>
                <Item elevation={24}>
                   <p style={{fontSize: props.fontSize, color: '#FF008A', fontFamily: 'Snell Roundhand, cursive', fontWeight: 'bold'}}>
                    {props.text}
                   </p>
                </Item>
          </ThemeProvider>
      </div>
  );
}