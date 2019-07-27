import React from 'react';
import styled from 'styled-components';

const P = styled.p`
  color: #5C0D11;
  cursor: pointer;
  &:hover {
    color: #8F4701;
  }
`;

const Span = styled.span`
  color: #5C0D11;
  cursor: pointer;
  &:hover {
    color: #8F4701;
  }
`;

const ClickableText = ({
  fontSize, underline, style, children, isSpan,
}) => (
  isSpan
    ? (
      <Span
        style={{ fontSize, textDecoration: underline ? 'underline' : 'none', ...style }}
      >
        {children}
      </Span>
    )
    : (
      <P
        style={{ fontSize, textDecoration: underline ? 'underline' : 'none', ...style }}
      >
        {children}
      </P>
    )
);


export default ClickableText;
