import React, { useState, useCallback } from "react";
import {FaGithub, FaPlus, FaSpinner, FaTrash} from 'react-icons/fa';
import {Container, Form, SubmitButton, List, DeleteButton} from './styles';

import api from '../../services/api';

export default function Main() {
  const [newRepository, setNewRepository] =  useState('');
  const [repositories, setRepositories] =  useState(['']);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback((e)=>{
    e.preventDefault();

    async function submit() {
      setLoading(true);

      try {
        const response = await api.get(`repos/${newRepository}`);

        const data = {
          name: response.data.full_name,
        }

        setRepositories([...repositories, data]);
        setNewRepository('');
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    submit();
  }, [newRepository, repositories]);

  function handleInputChange(e) {
    setNewRepository(e.target.value);
  }
    
  return(
    <Container>

      <h1>  
        <FaGithub size={25}/>
        Meus repositórios
      </h1>

      <Form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Adicionar repositórios. Exemplo: facebook/react"
          value={newRepository}
          onChange={handleInputChange}
        />

        <SubmitButton loading={loading ? 1 : 0}>
          {loading ? (
            <FaSpinner color="#FFF" size={14}/>
          ) : (
            <FaPlus color="#FFF" size={14} />
          )}
        </SubmitButton>
      </Form>

      <List>
        {repositories.maps(repo => (
          <li key={repo.name}>
            <span>
              <DeleteButton onClick={() => {}}>
                <FaTrash size={14}/>
              </DeleteButton>
              {repo.name}</span>
            
          </li>
        ))}
      </List>

    </Container>
  )
}