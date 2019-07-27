import React from 'react';
import styled from 'styled-components';
import ClickableText from './ClickableText';

const Wrapper = styled.div`
  font-size: 10px;
  text-align: center;
`;

const Footer = () => (
  <Wrapper>
    Please read the
    {' '}
    <ClickableText isSpan underline>Terms of Service</ClickableText>
    {' '}
    before participating with or uploading any content to this site.
  </Wrapper>
);

export default Footer;
