import React, {useCallback, useRef} from 'react';
import {FiArrowLeft,FiMail,FiUser, FiLock} from 'react-icons/fi';

import {FormHandles} from '@unform/core';

import { Form} from '@unform/web';

import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {Container, Content, Background} from './styles';


const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);



    const handleSubmit= useCallback(async (data: object) =>{
        try {
            formRef.current?.setErrors({})
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
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
    <Background/>
    
    <Content>
    <img src={logoImg} alt="Gobarber" />


     <Form ref={formRef} onSubmit={handleSubmit} >

         <h1>Faça seu Cadastro</h1>

         <Input icon={FiUser} name="name" placeholder="Nome"/>
         <Input icon={FiMail} name="email" placeholder="E-mail"/>

         <Input icon={FiLock} name="password" type="password" placeholder="Senha" /> 
         <Button type="submit" placeholder="entrar">Cadastrar</Button>

     </Form>
     <a href="Login">
         <FiArrowLeft />
     Voltar para Logon
     </a>
    </Content>
</Container> 
    )
}

export default SignUp

