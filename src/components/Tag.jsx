import React from 'react';
import styled from 'styled-components';

const styleList = [
  { type: 'Doujinshi', background: 'radial-gradient(#fc4e4e, #f26f5f)', borderColor: '#fc4e4e' },
  { type: 'Manga', background: 'radial-gradient(#e78c1a, #fcb417)', borderColor: '#e78c1a' },
  { type: 'Artist CG', background: 'radial-gradient(#c7bf07, #dde500)', borderColor: '#c7bf07' },
  { type: 'Game CG', background: 'radial-gradient(#1a9317, #05bf0b)', borderColor: '#1a9317' },
  { type: 'Western', background: 'radial-gradient(#5dc13b, #14e723)', borderColor: '#5dc13b' },
  { type: 'Non-H', background: 'radial-gradient(#0f9ebd, #08d7e2)', borderColor: '#0f9ebd' },
  { type: 'Image Set', background: 'radial-gradient(#2756aa, #5f5fff)', borderColor: '#2756aa' },
  { type: 'Cosplay', background: 'radial-gradient(#8800c3, #9755f5)', borderColor: '#8800c3' },
  { type: 'Asian Porn', background: 'radial-gradient(#b452a5, #fe93ff)', borderColor: '#b452a5' },
  { type: 'Misc', background: 'radial-gradient(#707070, #9e9e9e)', borderColor: '#707070' },
];

const mapTypeToStyle = tagType => styleList.find(({ type }) => tagType === type);

const StyledTag = styled.div`
  display: flex;
  margin-bottom: 4px;
  width: 98px;
  height: 45px;
  font-size: 12px;
  font-weight: bold;
  color: #f1f1f1;
  letter-spacing: 1px;
  border-width: 1px;
  border-style: solid;
  border-radius: 3px;
  box-shadow: 0 1px 3px rgba(0,0,0,.3);
  text-shadow: 2px 2px 3px rgba(0,0,0,.3);
  cursor: pointer;
  justify-content: center;
  align-items: center;
  &:hover {
    opacity: 0.8;
  }
`;

const Tag = ({ type }) => {
  const { background, borderColor } = mapTypeToStyle(type);
  return (
    <StyledTag style={{ background, borderColor }}>{type}</StyledTag>
  );
};

export default Tag;
