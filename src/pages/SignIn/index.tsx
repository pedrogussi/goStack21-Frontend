import React, { useCallback, useRef } from 'react';

import * as Yup from 'yup';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';



import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';


const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);



    const handleSubmit= useCallback(async (data: object) =>{
        try {
            formRef.current?.setErrors({})
            const schema = Yup.object().shape({
                email: Yup.string().required('Email obrigatório').email('Digite um e-mail valido!'),
                password: Yup.string().min(6, 'Nmínimo 6 digitos'),
            });
            await schema.validate(data, {
                abortEarly: false,
            });

        } catch (error) {
            console.log(error)

            const errors = getValidationErrors(error);

            formRef.current?.setErrors(errors)
        }
    },[])

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

