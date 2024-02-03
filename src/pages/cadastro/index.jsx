import React from 'react';
import { MdEmail, MdLock } from 'react-icons/md';
import { useNavigate  } from "react-router-dom";
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { api } from '../../services/api';
import { useForm } from "react-hook-form";
import { Container, Column, Title, Wrapper, TextCadastro , TitleLogin, SubtitleCadastro, EsqueciText, CriarText, Row } from './styles';

const Cadastro = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors, isValid  } } = useForm({
    reValidateMode: 'onChange',
    mode: 'onChange',
});

  const onSubmit = async (formData) => {
    try{
      const {data} = await api.post('/users', formData);
      if(data.id){
          navigate('/login') 
          return
      }
      alert('Erro ao fazer cadastro')
      }catch(e){
          alert('Erro ao fazer cadastro')
      }
  }

  return (
    <>
      <Header />
      <Container>
        <Column>
          <Title>A plataforma para você aprender com experts, dominar as principais tecnologias
            e entrar mais rápido nas empresas mais desejadas.</Title>
        </Column>
        <Column>
          <Wrapper>
            <TitleLogin>Comece agora grátis</TitleLogin>
            <SubtitleCadastro>Crie sua conta e make the change._</SubtitleCadastro>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input placeholder="Nome Completo" leftIcon={<MdEmail />} name="nome" control={control} />
              <Input placeholder="E-mail" leftIcon={<MdEmail />} name="email" control={control} />
              {errors.email && <span>E-mail é obrigatório</span>}
              <Input type="password" placeholder="Senha" leftIcon={<MdLock />} name="senha" control={control} />
              {errors.senha && <span>Senha é obrigatório</span>}
              <Button title="Criar minha conta" variant="secondary" type="submit" onSubmit={onSubmit}
              />
            </form>
            <TextCadastro>Ao clicar em "criar minha conta grátis", declaro que aceito as Políticas de Privacidade e os Termos de Uso da DIO.</TextCadastro >
            <SubtitleCadastro>Já tem uma conta? <a href="/login">Entrar</a></SubtitleCadastro>
            <Row>
            </Row>
          </Wrapper>
        </Column>
      </Container>
    </>
  )
}

export {Cadastro};
