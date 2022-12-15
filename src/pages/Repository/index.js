import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'
import { HashLoader } from 'react-spinners';
import { PageCenter, Container, Section, BackButton, Owner, IssuesList, IssueLabels, PageActions, FilterList } from './styles';
import api from '../../services/api';

export default function Repository() {
  const { repository: repositoryName } = useParams();
  const [repository, setRepository] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [respError, setRespError] = useState('');
  const [page, setPage] = useState(1);
  const [filters] = useState([
    { state: 'all', label: 'All', active: true },
    { state: 'open', label: 'Open', active: false },
    { state: 'closed', label: 'Closed', active: false },
  ]);
  const [filterIndex, setFilterIndex] = useState(0);

  useEffect(() => {
    async function loadRepositoryData() {

      const [repoData, repoIssues] = await Promise.all([
        api.get(`/repos/${repositoryName}`),
        api.get(`/repos/${repositoryName}/issues`, {
          params: {
            state: filters.find(f => f.active).state,
            per_page: 5,
          }
        }),
      ]).catch(function (error) {
        setRespError(error.message);
      })

      setRepository(repoData.data);
      setIssues(repoIssues.data);
      setLoading(false);
    }

    loadRepositoryData();
  }, [repositoryName, filters]);

  useEffect(() => {
    async function getIssuesListPage() {
      const response = await api.get(`/repos/${repositoryName}/issues`, {
        params: {
          state: filters[filterIndex].state,
          page,
          per_page: 5,
        }
      });

      setIssues(response.data);
    }

    getIssuesListPage();
  }, [repositoryName, filters, filterIndex, page]);

  function handlePage(action) {
    setPage(action === 'back' ? page - 1 : page + 1);
  }

  function handleFilter(index) {
    setFilterIndex(index);
  }

  if (respError !== '') {
    return (
      <Container>
        <PageCenter>
          <h2>{respError}</h2>
        </PageCenter>
      </Container>
    )
  }

  if (loading) {
    return (
      <PageCenter>
        <HashLoader
          color="#FFF"
        />
      </PageCenter>
    )
  }

  if (repository) {
    return (
      <Container>
        <Section>
          <BackButton to="/">
            <FaArrowLeft
              color="#0D2636"
              size={20}
            />
          </BackButton>
          <Owner>
            <img src={repository.owner.avatar_url} alt={repository.owner.login} />
            <h1>{repository.name}</h1>
            <p>{repository.description}</p>
          </Owner>

          <FilterList active={filterIndex}>
            {filters.map((filter, index) => (
              <button type='button' key={filter.label} onClick={() => handleFilter(index)}>{filter.label}</button>
            ))}
          </FilterList>

          <IssuesList>
            {issues.map(issue => (
              <li key={String(issue.id)}>
                <img src={issue.user.avatar_url} alt={issue.user.login} />
                <div>
                  <a href={issue.html_url} target="_blank" rel="noreferrer">{issue.title}</a>
                  <p>{issue.user.login}</p>
                  <IssueLabels>
                    {issue.labels.map(label => (
                      <span key={String(label.id)}>{label.name}</span>
                    ))}
                  </IssueLabels>
                </div>
              </li>
            ))}
          </IssuesList>
          <PageActions>
            <button type='button' onClick={() => handlePage('back')} disabled={page === 1}>Back</button>
            <button type='button' onClick={() => handlePage('next')}>Next</button>
          </PageActions>
        </Section>
      </Container>
    )
  }
}