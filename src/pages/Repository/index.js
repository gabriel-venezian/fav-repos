import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from './styles';
import api from '../../services/api';

export default function Repository() {
  const { repositoryName } = useParams();
  const [repository, setRepository] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRepoData() {

      const [repoData, repoIssues] = await Promise.all([
        api.get(`/repos/${repositoryName}`),
        api.get(`/repos/${repositoryName}/issues`, {
          params: {
            state: 'open',
            per_page: 5,
          }
        }),
      ]);

      setRepository(repoData.data);
      setIssues(repoIssues.data);
      setLoading(false);
    }

    loadRepoData();
  }, [repositoryName]);

  return (
    <Container>
    </Container>
  )
}