import React, { useCallback, useRef } from 'react';

import * as Yup from 'yup';
import {useAuth} from '../../hooks/AuthContext';
import {useToast} from '../../hooks/ToastContext';

import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';



import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';


interface SignInFormData {
    email:string,
    password:string
}

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const {signIn} =useAuth();
    const {addToast} =useToast();

    // console.log(user)

    const handleSubmit= useCallback(async (data: SignInFormData) =>{
        try {
            formRef.current?.setErrors({})
            const schema = Yup.object().shape({
                email: Yup.string().required('Email obrigatório').email('Digite um e-mail valido!'),
                password: Yup.string().min(6, 'Nmínimo 6 digitos'),
            });
            await schema.validate(data, {
                abortEarly: false,
            });
            await signIn({
                email:data.email,
                password:data.password,
            });

        } catch (error) {
            if( error instanceof Yup.ValidationError) {
                const errors = getValidationErrors(error);

            formRef.current?.setErrors(errors)
            }
            //Caso a condição seja falsa, ou seja, não exista o erro do tipo validation error, então disparar um toast

            addToast({
                type: 'info',
                title:  'Error na autenticação',
                description: 'Ocorreu um erro ao fazer login',
            });

            
        }
    },[signIn, addToast])

    return (
        <Container>

            <Content>
                <img src={logoImg} alt="Gobarber" />


                <Form ref={formRef} onSubmit={handleSubmit} >

                    <h1>Faça seu Logon</h1>

                    <Input icon={FiMail} name="email" placeholder="E-mail" />
                    <Input icon={FiLock} name="password" type="password" placeholder="Senha" />
                    <Button type="submit">Entrar</Button>

                    <a href="forgot">Esqueci minha senha</a>
                </Form>
                <a href="Login">
                    <FiLogIn />
                    Criar conta
                </a>
            </Content>
            <Background />
        </Container>

    )
}

export default SignIn;

