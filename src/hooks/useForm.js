import { useEffect, useMemo, useState } from 'react';

export const useForm = ( initialForm = {}, formValidations = {} ) => {
  
    const [ formState, setFormState ] = useState( initialForm );
    const [formStateValid, setFormStateValid] = useState({});

    useEffect(() => {
        createValidators();
    }, [formState]);

    useEffect(() => {
        setFormState(initialForm)
      
    }, [initialForm])
    

    const isFormValid = useMemo( () => {
        for (const formValue of Object.keys(formStateValid)) {
            if ( formStateValid[formValue] !== null ) return false;
        }
        return true;
    }, [formStateValid])
    

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    const createValidators = () =>{
        const formCheckedValues = {}
            // FormField es la propiedad del objeto de formValidations. El primer caso sería email, luego password, luego displayName.
        for (const formField of Object.keys( formValidations )) {
            // desestructuro de esa propiedad la funcion y el mensaje que declaré
            // formValidations[formField] accede a la propiedad del formVlidations. Ejemplo: formValidations.email
            const [fn, errorMessage = 'Error de validación'] = formValidations[formField];
            //en la primera parte de la linea, al objeto creado de formCheckedValues se le agrega la propiedad computada de dicho valor evaluado. El valor resultando de la primera iteración sería: 
            // formCheckedValues = { email: }. En la segunda parte, se evalua la función pasandole como argumento la propiedad evaluada, para dicho caso sería formState.email. Dependiendo de la evaluación, se asignará nulo o el mensaje de error.
            formCheckedValues[`${ formField }Valid`] = fn( formState[formField] ) ? null : errorMessage
        }
        
        setFormStateValid( formCheckedValues );
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,

        ...formStateValid,
        isFormValid,
    }
}