import { useMemo } from "react"
import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Google } from '@mui/icons-material'
import { Link as RouterLink } from "react-router-dom"
import { AuthLayout } from "../layout/authLayout"
import { useForm } from "../../hooks"
import { checkingAuthentication, startGoogleSignIn, startSignInWithEmailAndPassword } from "../../store/auth"
import { useDispatch, useSelector } from "react-redux"

const formData = {
  email: '',
  password: ''
}
export const LoginPage = () => {

    const dispatch = useDispatch();
    const { status } = useSelector( state => state.Auth)

    const { email, password, onInputChange, onResetForm } = useForm(formData)

    const isAuthenticating = useMemo( ()=> status === 'checking', [status])
    
    const onLoginSubmit = (e) => {
      e.preventDefault();
      dispatch( startSignInWithEmailAndPassword( email, password ))
    }

    const onGoogleSignIn = () => {
      dispatch( startGoogleSignIn() );
    }

    return (
        <AuthLayout title='Iniciar sesión' >
            <form onSubmit={ onLoginSubmit }>
            <Grid container>

              <Grid item
                xs={12}
                sx={{ mt:2 }} >
                  <TextField 
                    type='email'
                    label='Correo'
                    placeholder='usuario@correo.com'
                    fullWidth
                    name="email"
                    value={ email }
                    onChange={ onInputChange }
                  />
                </Grid>

                <Grid item
                  xs={12}
                  sx={{ mt: 2 }}
                >
                  <TextField 
                    type='password'
                    label='Contraseña'
                    placeholder='password'
                    fullWidth
                    name="password"
                    value={ password }
                    onChange={ onInputChange }
                  />
                </Grid>

                <Grid container
                  spacing={ 2 }
                  sx={{ mb: 2,  mt: 1}}
                >
                  <Grid item
                    sm={ 6 }>
                    <Button 
                      disabled={ isAuthenticating }
                      variant='contained'
                      fullWidth
                      type='submit'
                    >Login</Button>
                  </Grid>
                  
                  <Grid item
                    sm={ 6 }>
                    <Button 
                      variant='contained'
                      disabled={ isAuthenticating }
                      onClick={ onGoogleSignIn }
                      fullWidth>
                        <Google />
                        <Typography sx={{ ml: 1}} >
                          Google
                        </Typography>
                      </Button>
                  </Grid>

                </Grid>

                <Grid container 
                  direction={'row'} justifyContent={ 'end' } >
                  <Link component={ RouterLink } to='/auth/register' color= 'inherit' >
                    Crear una cuenta
                  </Link>
                </Grid>

              </Grid>

          </form>
        </AuthLayout>
    )
}
