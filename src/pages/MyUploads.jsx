import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Triangle from '../components/Triangle';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LinkText = styled.p`
  margin-right: 20px;
  font-size: 13px;
  font-weight: bold;
  line-height: 19px;
  color: #5c0d11;
  &:hover {
    color: #8f4701;
  }
`;
const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
`;

export default function UploadPage() {
  const [currentUploads, setCurrentUploads] = useState([]);
  useEffect(() => {
    setCurrentUploads([]);
  }, []);

  return (
    <Container>
      <StyledLink to="/upload/new">
        <Triangle />
        <LinkText>Create New Gallery</LinkText>
      </StyledLink>
      {currentUploads}
    </Container>
  );
}
