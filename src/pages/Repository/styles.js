import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.main`
  max-inline-size: 700px;
  margin-inline: auto;
  padding-inline: 20px;
`;

export const Section = styled.section`
  max-inline-size: 700px;
  background-color: #FFF;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  padding-block: 30px;
  padding-inline: 30px;
  margin-block: 80px;
  margin-inline: auto;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-block-end: 15px;

  img {
    width: 150px;
    border-radius: 20%;
    margin-block-start: 0;
    margin-block-end: 15px;
    margin-inline: 0;
  }

  h1 {
    font-size: 30px;
    color: #383838;
  }

  p {
    margin-block-start: 15px;
    font-size: 14px;
    color: #383838;
    text-align: center;
    line-height: 1.4;
    max-inline-size: 400px;
  }
`;

export const PageCenter = styled.div`
  color: #FFF;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const BackButton = styled(Link)`
  border: 0;
  background: transparent;
`;

export const IssuesList = styled.ul`
  border-block-start: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding-block: 15px;
    gap: 8px;

    & + li {
      border-block-start: 1px solid #EEE;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 1px solid #30363d;
    }

    div {
      flex: 1;

      a {
        font-size: 15px;
        text-decoration: none;
        color: #383838;
        transform: .3s;

        &:hover {
          color: #0071db;
        }
      }

      p {
        margin-block-start: 5px;
        font-size: 12px;
        color: #383838
      }
    }
  }
`;

export const IssueLabels = styled.div`
  display: flex;
  margin-block-start: 5px;
  gap: 5px;
  flex-wrap: wrap;

  &:empty {
    margin-block-start: 0;
  }
  
  span {
    background-color: #0D2636;
    color: #fff;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 600;
    padding-block: 4px;
    padding-inline: 8px;
    }
`;

export const PageActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding-block-start: 30px;
  border-block-start: 1px solid #EEE;

  button {
    outline: 0;
    border: 0;
    background-color: #0D2636;
    color: #FFF;
    padding-block: 5px;
    padding-inline: 10px;
    border-radius: 4px;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.7;
    }
  }
`;

export const FilterList = styled.div`
  margin-block: 15px;
  margin-inline: 0;
  display: flex;
  gap: 10px;

  button {
    outline: 0;
    border: 0;
    padding-block: 5px;
    padding-inline: 10px;
    border-radius: 4px;

    &:nth-child(${props => props.active + 1}) {
      background-color: #0D2636;
      color: #FFF;
    }
  }
`;