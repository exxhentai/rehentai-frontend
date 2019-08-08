// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Triangle from './Triangle';

const navList = [
  { text: 'Front Page', link: '/' },
  { text: 'Watched', link: '/watched' },
  { text: 'Popular', link: '/popular' },
  { text: 'Torrents', link: '/torrents' },
  { text: 'Favorites', link: '/favorites' },
  { text: 'My Home', link: '/home' },
  { text: 'My Uploads', link: '/upload' },
  { text: 'Toplists', link: '/toplist' },
  { text: 'Bounties', link: '/bounty' },
  { text: 'News', link: '/news' },
  { text: 'Forums', link: '/forums' },
  { text: 'Wiki', link: '/wiki' },
  { text: 'HentaiVerse', link: '/hentai-verse' },
];

const Text = styled.p`
  margin-right: 20px;
  font-size: 13px;
  font-weight: bold;
  line-height: 19px;
  color: #5C0D11;
  &:hover {
    color: #8F4701;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  margin-top: 6px;
  justify-content: center;
`;

const NavItem = ({ text, link }: { text: String, link: string }) => (
  <StyledLink to={link}>
    <Triangle />
    <Text>{text}</Text>
  </StyledLink>
);

const NavBar = () => (
  <Wrapper>
    {navList.map(({ text, link }) => <NavItem text={text} link={link} key={text} />)}
  </Wrapper>
);

export default NavBar;
