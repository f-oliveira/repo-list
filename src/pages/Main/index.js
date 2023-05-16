import React, { useState } from "react";
import {FaGithub, FaPlus} from 'react-icons/fa';
import {Container, Form, SubmitButton} from './styles';

export default function Main() {
  const [newRepository, setNewRepository] =  useState('');

  function handleInputChange(e) {
    setNewRepository(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return(
    <Container>

      <h1>  
        <FaGithub size={25}/>
        Meus repositórios
      </h1>

      <Form onSubmit={()=>{}}>
        <input 
          type="text" 
          placeholder="Adicionar repositórios"
          value={newRepository}
          onChange={handleInputChange}
        />

        <SubmitButton>
          <FaPlus color="#FFF" size={14} />
        </SubmitButton>
      </Form>
    </Container>
  )
}