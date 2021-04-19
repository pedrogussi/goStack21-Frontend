import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';

import { FormHandles } from '@unform/core';

import { Form } from '@unform/web';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/apiClient';
import {useToast} from '../../hooks/ToastContext'
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer, Background } from './styles';


interface SignUpFormData {
    name:string;
    email:string;
    password:string;
}

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const {addToast} = useToast();
    const history = useHistory();
    const handleSubmit = useCallback(async (data: SignUpFormData) => {
        try {
            formRef.current?.setErrors({});


            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string().required('Email obrigatório').email('Digite um e-mail valido!'),
                password: Yup.string().min(6, 'Nmínimo 6 digitos'),
            });
            await schema.validate(data, {
                abortEarly: false,
            });
            await api.post('/users', data);
            history.push('/');
            addToast({
                type:'success',
                title: 'Cadastro Realizado',
                description: 'Já pode fazer seu login!!'
            });


        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errors = getValidationErrors(error);
                formRef.current?.setErrors(errors);
                return;
            }
            //Caso a condição seja falsa, ou seja, não exista o erro do tipo validation error, então disparar um toast
            addToast({
                type: 'info',
                title: 'Error no Cadastro',
                description: 'Tente novamente',
            });
        }
    }, [history, addToast])
    return (
        <Container>
                <Background />

                <Content>
            <AnimationContainer>

                    <img src={logoImg} alt="Gobarber" />


                    <Form ref={formRef} onSubmit={handleSubmit} >

                        <h1>Faça seu Cadastro</h1>

                        <Input icon={FiUser} name="name" placeholder="Nome" />
                        <Input icon={FiMail} name="email" placeholder="E-mail" />

                        <Input icon={FiLock} name="password" type="password" placeholder="Senha" />
                        <Button type="submit" placeholder="entrar">Cadastrar</Button>

                    </Form>
                        <Link to="/">
                            <FiArrowLeft />
                            Voltar para Logon
                        </Link>
                    </AnimationContainer>

                </Content>

        </Container>
    )
}

export default SignUp

