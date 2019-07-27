import React from 'react';
import styled from 'styled-components';
import ClickableText from './ClickableText';
import Tag from './Tag';

const tagList = [
  'Doujinshi',
  'Manga',
  'Artist CG',
  'Game CG',
  'Western',
  'Non-H',
  'Image Set',
  'Cosplay',
  'Asian Porn',
  'Misc',
];

const Wrapper = styled.div`
  display: flex;
  margin: auto;
  padding: 6px;
  width: 612px;
  border: 2px ridge #5C0D12;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

const TagWrapper = styled.div`
  display: flex;
  width: 562px;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const InputWrapper = styled.div`
  display: flex;
  margin-top: 2px;
`;

const Input = styled.input`
  padding: 0 3px;
  width: 310px;
  line-height: 20px;
  border: 1px solid #B5A4A4;
  border-radius: 3px;
  background: #EDEADA;
  &:hover {
    background: #F3F0E0;
  }
  &::placeholder {
    color:#9F746F;
  }
`;

const Button = styled.button`
  margin: 0 2px;
  font-size: 12px;
  color: #5C0D12;
  line-height: 24px;
  border: 2px solid #B5A4A4;
  border-radius: 3px;
  background: #EDEADA;
  &:hover {
    border-color: #977273;
    background: #F3F0E0;
  }
`;

const ActionWrapper = styled.div`
  display: flex;
  margin-top: 4px;
`;

const SearchBox = () => (
  <Wrapper>
    <TagWrapper>
      {tagList.map(type => (<Tag type={type} />))}
    </TagWrapper>

    <InputWrapper>
      <Input placeholder="Search Keywords" />
      <Button>Apply Filter</Button>
      <Button>Clear Filter</Button>
    </InputWrapper>

    <ActionWrapper>
      <ClickableText fontSize={10} underline>Show Advanced Options</ClickableText>
      <ClickableText fontSize={10} underline style={{ marginLeft: '12px' }}>Show File Search</ClickableText>
    </ActionWrapper>
  </Wrapper>
);

export default SearchBox;
