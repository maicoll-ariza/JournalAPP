import { useMemo, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import { AuthLayout } from "../layout/authLayout"
import { useForm } from "../../hooks"
import { starRegisterUserWithEmailAndPassword } from "../../store/auth"

const formData = {
  email: '',
  password: '',
  displayName: ''
}

const formValidations = {
  email: [ ( value ) => value.includes('@'), 'El email debe tener @' ],
  password: [ ( value ) => value.length >=6 , 'El password debe tener mas de 5 letras' ],
  displayName: [ ( value ) => value.length >=1, 'El nombre es requerido' ]
}

export const RegisterPage = () => {

    const [ formSubmited, setFormSubmited] = useState(false);

    const dispatch = useDispatch();
    const { errorMessage, status } = useSelector( state => state.Auth)

    const isCheckingAuthentication = useMemo( ()=> status==='checking', [status])

    const { email, password, displayName, 
            emailValid, passwordValid, displayNameValid, 
            onInputChange, onResetForm, formState, isFormValid } = useForm( formData, formValidations );

    const onSubmit = (e) => {
      e.preventDefault();
      setFormSubmited(true);
      if(!isFormValid) return;
      dispatch( starRegisterUserWithEmailAndPassword({ email, password, displayName}) );
    }

    return (
        <AuthLayout title='Crear cuenta' >
            <form onSubmit={ onSubmit }>
            <Grid container>

                <Grid item
                    xs={12}
                    sx={{ mt:2 }} >
                    <TextField 
                        type='text'
                        label='Nombre completo'
                        placeholder='Nombre'
                        fullWidth
                        name="displayName"
                        value={ displayName }
                        onChange={ onInputChange }
                        error={ !!displayNameValid && formSubmited }
                        helperText={ displayNameValid  }
                    />
                </Grid>

                <Grid item
                    xs={12}
                    sx={{ mt:2 }} >
                    <TextField 
                        type='email'
                        label='Correo'
                        placeholder='usuario@correo.com'
                        fullWidth
                        name="email"
                        value= { email }
                        onChange={ onInputChange }
                        error={ !!emailValid && formSubmited }
                        helperText={ emailValid  }
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
                        value= { password }
                        onChange={ onInputChange }
                        error={ !!passwordValid && formSubmited }
                        helperText={ passwordValid }
                    />
                </Grid>

                <Grid container
                  spacing={ 2 }
                  sx={{ mb: 2,  mt: 1}}
                >
                  <Grid item
                    xs={ 12 }
                    display={ !!errorMessage ? '' : 'none' } >
                    <Alert severity="error" >
                        {errorMessage}
                    </Alert>
                  </Grid>
                  <Grid item
                    xs={ 12 }>
                    <Button 
                      disabled={ isCheckingAuthentication }
                      variant='contained'
                      type='submit'
                      fullWidth
                    >Registrarse</Button>
                  </Grid>

                </Grid>

                <Grid container 
                  direction={'row'} justifyContent={ 'end' } >
                    <Typography sx={{ mr: 1} }>¿Ya tienes una cuenta?</Typography>
                  <Link component={ RouterLink } to='/auth/login' color= 'inherit' >
                    Iniciar sesión
                  </Link>
                </Grid>

              </Grid>

          </form>
        </AuthLayout>
    )
}
