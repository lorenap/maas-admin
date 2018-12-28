import React from 'react';
import {
  Typography,
  Button,
  Input,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'
import './login.css'
import SimpleSnackBar from '../../components/SnackbarGeneric/SnackbarGeneric'
import Loading from '../../components/Loading'


const styles = theme => ({
  main: {
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    fontFamily: 'roboto',
    display: 'flex',
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    minHeight: '600px',
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit * 0}px ${theme.spacing.unit * 4}px `,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  },
  formDown: {
    marginTop: '50px',
    width: '100%', // Fix IE 11 issue.
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  },
  typography: {
    marginTop: theme.spacing.unit * 2,
  },
  typographyL: {
    marginTop: theme.spacing.unit * 3,
    color: 'blue'
  },
  logo: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconButton: {
    marginRight: theme.spacing.unit * 1.5
  },
  submit: {
    marginTop: theme.spacing.unit * 2,
  },
  submitIcon: {
    height: '6vh',
    color: 'black',
    backgroundColor: 'white',
    marginTop: theme.spacing.unit * 2,
  },
});

const NormalButton = withStyles({
  label: {
    textTransform: 'none',
  },
})(Button);

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      message: '',
      title: ''
    }

    this.loading = React.createRef();
    //this.http = new Http(this.loading, this.props ? this.props.history : {});
  }


  navegarParaVenda = () => {
    this.props.history.push({
      pathname: '/venda',
      state: { isEmpty: true }
    })
  }

  onSubmit () {
    const email = document.getElementById('email').value.toLowerCase();
    const senha = document.getElementById('password').value;

    this.http.post(`account/auth/autenticar`, { email, senha })
      .then(r => {
        if (r.data) {
          localStorage.setItem('user', JSON.stringify(r.data));
          localStorage.setItem('token', JSON.stringify(r.data.token));
          return this.testSeller(r.data.id);
        }
        this.showSnackbar('Usuário não encontrado');
      }).catch(err => {
        let motivo = 'Erro ao tentar realizar login.'
        if (err.response && err.response.data && err.response.data.motivo) {
          motivo = err.response.data.motivo
        }
        this.showSnackbar(motivo);
        console.log(err)
      })
  }

  onRegister () {
    this.props.history.push('/cadastro')
  }

  handleClose () {
    this.setState({
      open: false
    })
  }

  showSnackbar (message) {
    this.setState({
      open: true,
      message: message,
    }, () => setTimeout(() => this.setState({
      open: false
    }), 3000));
  }

  render () {
    const { open, message } = this.state
    const { classes } = this.props

    return (
      <main className={`${classes.main}  loginContainer`}>
        <Loading ref={this.loading} />

        <div className={classes.paper}>
          <div className={`${classes.logo} loginLogoContainer`}>
            <img src={require('../../assets/images/semSlogan.png')} alt="logo" width={'200px'} height={'50px'}></img>
          </div>
          <form className={`${classes.form} loginFormContainer`}>
            <div className={classes.form}>
              <FormControl className={classes.inputField} margin="normal" required fullWidth>
                <InputLabel shrink={true} htmlFor="email">E-mail</InputLabel>
                <Input id="email" name="email" autoComplete="email" autoFocus />
              </FormControl>
              <FormControl className={classes.inputField} margin="normal" required fullWidth>
                <InputLabel shrink={true} htmlFor="password">Senha</InputLabel>
                <Input name="password" type="password" id="password" autoComplete="current-password" />
              </FormControl>
              <NormalButton
                // type="submit"
                fullWidth
                onClick={() => this.onSubmit()}
                variant="contained"
                color="primary"
                className={'entrarButton'}
              >
                Entrar
            </NormalButton>
              <Typography className={'dividerText esqueciSenha'} component='h4'>
                Esqueci minha senha
            </Typography>
            </div>
            <div className={classes.formDown}>
              <Typography className={'dividerText semCadastro'} component='h4'>
                <span>Não possui cadastro?</span>
              </Typography>
              <NormalButton
                // type="submit"
                fullWidth
                onClick={() => this.onRegister()}
                color="primary"
                variant="contained"
                className={'iconButton criarConta'}
              >
                <img
                  className={classes.iconButton}
                  alt={'F'}
                  src={require('../../assets/images/softLogo.svg')}
                  width={25}
                  height={25}></img>
                Criar conta
          </NormalButton>
              <NormalButton
                // type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={'iconButton google'}
              >
                <img
                  className={classes.iconButton}
                  alt={'G'}
                  src={require('../../assets/images/googlelogo.png')}
                  width={25}
                  height={25}></img>
                <span>Entrar com Google</span>
              </NormalButton>
              <NormalButton
                // type="submit"
                fullWidth
                color="primary"
                variant="contained"
                className={'iconButton facebook'}
              >
                <img
                  className={classes.iconButton}
                  alt={'F'}
                  src={require('../../assets/images/facebookLogo.svg')}
                  width={25}
                  height={25}></img>
                Entrar com Facebook
          </NormalButton>
            </div>
          </form>
          <SimpleSnackBar
            open={open}
            message={message}
            variant={'warning'}
            handleClose={() => { this.handleClose() }}
          />
        </div>
      </main>
    )
  }
}

export default withStyles(styles)(Login)
