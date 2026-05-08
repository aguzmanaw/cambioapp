import { createTheme } from "@mui/material/styles";

import { orangePalette } from "./colors";

import { deepPurple, grey, pink, yellow } from "@mui/material/colors";



const theme = createTheme({

palette: {

mode: "light",

primary: {

light: yellow[100],

main: orangePalette[700],

dark: orangePalette[800],

contrastText: grey[50],

},

secondary: {

light: deepPurple[50],

main: deepPurple[600],

dark: deepPurple[900],

contrastText: grey[50],

},

warning: {

light: orangePalette[100],

main: orangePalette[900],

dark: orangePalette[1100],

contrastText: "#fff",

},

error: {

light: pink["A100"],

main: pink["A400"],

dark: pink["A700"],

contrastText: "#fff",

},

/*background: {

paper: yellow[100],

},

*/

//#f50057 color para status un rojo como slack

shape: {

borderRadius: 16,

},

},

});



export default theme;

/*

components: {

MuiListItemButton: {

styleOverrides: {

root: {

backgroundColor: "blue",

},

},

},

},



*/