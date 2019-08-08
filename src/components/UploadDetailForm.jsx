import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function UploadPage() {
  
  return (
    <Container>
      <Upload {...uploaderProps}>
        <Button>
          <Icon type="upload" /> Click to Upload
        </Button>
      </Upload>
      {currentUploads}
    </Container>
  );
}
