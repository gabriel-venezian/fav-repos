import React, { useState, useCallback } from "react";
import { FaGithub, FaPlus, FaSpinner, FaChevronDown, FaTrash } from 'react-icons/fa';
import { Container, Form, SubmitButton, RepositoriesUnorderedList, DeleteButton } from './styles';
import api from '../../services/api';

export default function Main() {
  const [newRepo, setNewRepo] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    async function submit() {
      setLoading(true);
      try {
        const response = await api.get(`repos/${newRepo}`);
        const data = {
          name: response.data.full_name,
        };

        setRepositories([...repositories, data]);
        setNewRepo('');
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }

    }

    submit();
  }, [newRepo, repositories]);

  function handleInputChange(e) {
    setNewRepo(e.target.value);
  }

  const handleDelete = useCallback((repositoryName) => {
    const find = repositories.filter(r => r.name !== repositoryName)
    setRepositories(find);
  }, [repositories]);

  return (
    <Container>
      <h1>
        <FaGithub size={25} color='#0D2636' />
        My Favorite Repositories
      </h1>

      <Form onSubmit={handleSubmit}>
        <input type="text" placeholder="Add Repositories"
          value={newRepo}
          onChange={handleInputChange}
        />
        <SubmitButton loading={loading ? 1 : 0}>
          {
            loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )
          }
        </SubmitButton>
      </Form>

      <RepositoriesUnorderedList>
        {repositories.map(repo => (
          <li key={repo.name}>
            <p>
              <a href="">
                <FaChevronDown size={12} />
              </a>
              {repo.name}
            </p>
            <DeleteButton onClick={() => handleDelete(repo.name)}>
              <FaTrash size={14} />
            </DeleteButton>
          </li>
        ))}
      </RepositoriesUnorderedList>
    </Container>
  )
}