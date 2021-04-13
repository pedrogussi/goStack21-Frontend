import React from 'react';
import {FiLogIn, FiMail, FiLock} from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {Container, Content, Background} from './styles';


const SignIn: React.FC = () => (
    <Container>
       
    <Content>
    <img src={logoImg} alt="Gobarber" />


     <form >

         <h1>Faça seu Logon</h1>

         <Input icon={FiMail} name="email" placeholder="E-mail"/>
         <Input icon={FiLock} name="password" type="password" placeholder="Senha" /> 
         <Button placeholder="entrar">Entrar</Button>

         <a href="forgot">Esqueci minha senha</a>
     </form>
     <a href="Login">
         <FiLogIn />
     Criar conta
     </a>
    </Content>
    <Background/>
</Container> 
   
)

export default SignIn;
