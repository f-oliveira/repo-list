import React, { useState, useCallback, useEffect } from "react";
import {FaGithub, FaPlus, FaSpinner, FaTrash, FaBars} from 'react-icons/fa';
import {Container, Form, SubmitButton, List, DeleteButton} from './styles';
import {Link} from 'react-router-dom';

import api from '../../services/api';

export default function Main() {

  const [newRepository, setNewRepository] =  useState('');
  const [repositories, setRepositories] =  useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // Search DidMount
  // Buscar
  useEffect(()=>{
    const repoStorage = localStorage.getItem('repos');

    if(repoStorage){
      setRepositories(JSON.parse(repoStorage));
    }

  }, []);

  
  // Salvar alterações
  useEffect(()=>{
    localStorage.setItem('repos', JSON.stringify(repositories));
  }, [repositories]);


  const handleSubmit = useCallback((e)=>{
    e.preventDefault();

    async function submit() {
      setLoading(true);
      setAlert(null);

      try {
        if(newRepository === '') {
          throw new Error('Você precisa indicar um repositório!');
        }

        const response = await api.get(`repos/${newRepository}`);

        const hasRepository = repositories.find(repo => repo.name === newRepository);
        if(hasRepository) {
          throw new Error('Repositório duplicado');
        }

        const data = {
          name: response.data.full_name,
        }

        setRepositories([...repositories, data]);
        setNewRepository('');
      } catch (error) {
        setAlert(true);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    submit();
  }, [newRepository, repositories]);

  function handleInputChange(e) {
    setNewRepository(e.target.value);
    setAlert(null);
  }

  const handleDelete = useCallback((repo) => {
    const find = repositories.filter(r => r.name !== repo);
    setRepositories(find);
  }, [repositories]);
    
  return(
    <Container>

      <h1>  
        <FaGithub size={25}/>
        Meus repositórios
      </h1>

      <Form onSubmit={handleSubmit} error={alert}>
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
        {repositories.map(repo => (
          <li key={repo.name}>
            <span>
              <DeleteButton onClick={()=> handleDelete(repo.name) }>
                <FaTrash size={14}/>
              </DeleteButton>
              {repo.name}
            </span>
            <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}>
              <FaBars size={20}/>
            </Link>
            
          </li>
        ))}
      </List>

    </Container>
  )
}