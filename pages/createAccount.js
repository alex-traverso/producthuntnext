import React from 'react'
import Layout from '../components/layout/Layout';


// validaciones
import useValidation from '../hooks/useValidation';
import validateCreateAccount from '../validation/validateCreateAccount';



const CreateAccount = () => {

    const INITIAL_STATE = {
        name: '',
        email: '',
        password: ''
    }

    const { values, errors, submitForm, handleChange, handleSubmit } = useValidation( INITIAL_STATE, validateCreateAccount, createAccount );
    
    const { name, email, password } = values;
    
    function createAccount() {
        console.log( "Creando cuenta" );
    }
    
    return (
    <div>
        <Layout>
            <>
                <h1 className='create-account-title text-center'>Crear Cuenta</h1>
                    <form
                    onSubmit={handleSubmit}
                    >
                    <div className='form-field'>
                        <label htmlFor="name">Nombre</label>
                        <input
                            type="text" 
                            id='name'
                            placeholder='Tu nombre'
                            name='name'
                            value={name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='form-field'>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email" 
                            id='email'
                            placeholder='Tu email'
                            name='email'
                            value={email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='form-field'>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id='password'
                            placeholder='Tu Password'
                            name='password'
                            value={password}
                            onChange={handleChange}
                        />
                    </div>

                    <input className='form-btn' type="submit"
                            value='Crear Cuenta'
                    />
                </form>
            </>
        </Layout>
    </div>
)
}

export default CreateAccount;