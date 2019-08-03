// @flow
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchBox from '../components/SearchBox';
import Triangle from '../components/Triangle';
import ClickableText from '../components/ClickableText';
import GalleryListThumbnailItem from '../components/GalleryListThumbnailItem';

const Container = styled.div`
  margin: 10px auto;
  padding: 5px;
  max-width: 1200px;
  min-width: 740px;
  border: 1px solid #5c0d12;
  border-radius: 9px;
  background: #edebdf;
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

  & > p {
    margin-right: 10px;
  }
`;

const LinkItem = ({ text }) => (
  <StyledLinkItem>
    <Triangle />
    <ClickableText fontSize={10} underline>
      {text}
    </ClickableText>
  </StyledLinkItem>
);

export default function FrontPage() {
  useEffect(() => {
    // try direct connect to ipfs content server
    fetch(
      '/ipfsapi/swarmconnect?address=/dns4/dev.hmkrl.com/tcp/443/wss/ipfs/QmVti8ZHZ2o1SbieAVz7o2Qzxj8RCanEahGUM1mnajaQTi',
    )
      .then(res => res.json())
      .then(console.log);
  }, []);

  const [connectedToIPFS, setConnectToIPFS] = useState(false);
  useEffect(() => {
    const handle = setInterval(() => {
      fetch('/ipfsapi/swarmpeers')
        .then(res => res.json())
        .then((peers: string[]) => {
          if (peers.length === 0) {
            setConnectToIPFS(false);
          } else {
            setConnectToIPFS(true);
          }
        });
    }, 1000);
    return () => clearInterval(handle);
  }, []);
  return (
    <Container>
      <Title>
        E-Hentai Galleries: The Free Hentai Doujinshi, Manga and Image Gallery System{' '}
        ({connectedToIPFS ? 'Connected to IPFS' : 'Connecting IPFS ...'})
      </Title>

      {/* 搜索模块 */}
      <SearchBox />

      <GalleryListThumbnailItem
        title="[Yutakame] Remains of warriors nightmare [English] [Kimochi-san]"
        thumbnail="/ipfs/QmXD8TDFDn7kfsmCD2eQ3QWuhLpvj7LB5tbzU44iypdmQ9"
        id="testid"
        createdTime="2019-08-03 15:50"
        type="Doujinshi"
        Uploader="exxhentaiUploader"
        comictag="40010"
      />

      <LinkWrapper>
        <LinkItem text="Visit the E-Hentai Forums" />
        <LinkItem text="E-Hentai @ Twitter" />
        <LinkItem text="Play the HentaiVerse Minigame" />
        <LinkItem text="Lo-Fi Version" />
      </LinkWrapper>
    </Container>
  );
}
