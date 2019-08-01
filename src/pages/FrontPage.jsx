import React from 'react';
import styled from 'styled-components';
import SearchBox from '../components/SearchBox';
import Triangle from '../components/Triangle';
import ClickableText from '../components/ClickableText';

const Container = styled.div`
  margin: 10px auto;
  padding: 5px;
  max-width: 1200px;
  min-width: 740px;
  border: 1px solid #5C0D12;
  border-radius: 9px;
  background: #EDEBDF;
`;

const Title = styled.p`
  font-size: 13px;
  line-height: 24px;
  font-weight: bold;
  text-align: center;
`;

const LinkWrapper = styled.div`
  display: flex;
  height: 20px;
  justify-content: center;
  align-items: center;
`;

const StyledLinkItem = styled.div`
  display: flex;
  align-items: center;
  
  &>p {
    margin-right: 10px;
  }
`;

const LinkItem = ({ text }) => (
  <StyledLinkItem>
    <Triangle />
    <ClickableText fontSize={10} underline>{text}</ClickableText>
  </StyledLinkItem>
);

const FrontPage = () => (
  <Container>
    <Title>E-Hentai Galleries: The Free Hentai Doujinshi, Manga and Image Gallery System</Title>

    {/* 搜索模块 */}
    <SearchBox />

    <img src="/ipfs/QmXD8TDFDn7kfsmCD2eQ3QWuhLpvj7LB5tbzU44iypdmQ9" />

    <LinkWrapper>
      <LinkItem text="Visit the E-Hentai Forums" />
      <LinkItem text="E-Hentai @ Twitter" />
      <LinkItem text="Play the HentaiVerse Minigame" />
      <LinkItem text="Lo-Fi Version" />
    </LinkWrapper>
  </Container>
);

export default FrontPage;
