import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { red, indigo, lightBlue } from '@material-ui/core/colors';
import Login from '../pages/Login/Login'
import CssBaseline from '@material-ui/core/CssBaseline';
import { SuccessContext } from "../resources/SuccessContext/SuccessContext";

const theme = createMuiTheme({
  palette: {
    primary: { light: lightBlue[500], main: lightBlue[700], dark: lightBlue[900] },
    secondary: indigo,
    error: red,
    typography: {
      useNextVariants: true,
    },
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});

class AppRouter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      title: '',
      buttons: []
    }

    this.handleSuccessProps = (message, title, buttons) => {
      this.setState(state => ({
        message: message,
        title: title,
        buttons: buttons
      }))
    }
  }

  render() {
    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <SuccessContext.Provider value={{ state: this.state, changeValue: this.handleSuccessProps }}>
            <CssBaseline />
            <Route path="/" exact component={Login} />

           { /*<Route path="/" exact component={Login} />
            <Route path="/cadastro" component={AppBase} />
            <Route path="/sucesso" component={SuccessPage} />
            <Route path="/menu" component={AppMenu} />
            <Route path="/venda" component={AppBase} />
            <Route path="/codigoBarras" component={AppBase}/>
            <Route path="/intro" component={IntroSteps}/>
            <Route path="/consulta" component={AppBase} />
            <Route path="/pedido" component={AppBase} />
            <Route path="/produto" component={AppBase} />*/}
          </SuccessContext.Provider>
        </MuiThemeProvider>
      </Router>
    )
  }
}

export default AppRouter;
