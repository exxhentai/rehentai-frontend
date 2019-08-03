// @flow
import React from 'react';
import styled from 'styled-components';
import Tag from './Tag';

const Container = styled.div`
  min-height: 200px;
  padding-bottom: 2px;
  min-width: 250px;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #d9d7cc;
  border-bottom: 1px solid #d9d7cc;

  &:nth-child(2n + 1) {
    background: #f2f0e4;
  }
`;
const MainContainer = styled.div`
  margin: 10px auto;
  /*padding: 10px;*/
  max-width: 100%;
  min-width: 200px;
  border: 2px solid #5c0d12;
  border-collapse: collapse;
  /*border-radius: 0px;*/
  background: #edebdf;
`;
const Mainlistview =styled.table`
`;
const Mainlistviewth = styled.td`
border:1px solid #000; 
  font-family: 微軟正黑體; 
  font-size:16px; 
  width:200px;
  border:1px solid #000;
  text-align:center;
  border-collapse:collapse;
`; 
const Mainlistviewtd = styled.tr`
  position: absolute;
`;
const Title = styled.h3`
  color: #8f6063;
  overflow: hidden;
  min-height: 32px;
  max-height: 32px;
  line-height: 16px;
  margin: 6px 4px 0;
  font-size: 10pt;
  text-align: center;
`;
const Thumbnail = styled.img`
  height: 228px;
  width: 250px;
  display:none;
`;
const MetaDatas = styled.div`
  height: 46px;
  margin: auto auto 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const DateTime = styled.p`
  font-size: 8pt;
  font-family: arial, helvetica, sans-serif;
  color: #5c0d11;
  /*position: absolute;*/
  top: 27px;
  left: 3px;
  width: 102px;
  text-align: center;
  white-space: nowrap;
  padding: 1px 0;
`;



export type GalleryListThumbnailItemProps = {
  MainContainer: String,
  title: string,
  thumbnail: string,
  id: string,
  createdTime: string,
  type:
    | 'Doujinshi'
    | 'Manga'
    | 'Artist CG'
    | 'Game CG'
    | 'Western'
    | 'Non-H'
    | 'Image Set'
    | 'Cosplay'
    | 'Asian Porn'
    | 'Misc',
};

export default function GalleryListThumbnailItem({
  title,
  thumbnail,
  id,
  type,
  createdTime,
}: GalleryListThumbnailItemProps) {
  return (
    <MainContainer>
    <a href={`/g/${id}`}>
      <Container>
        <Mainlistview>
          <Mainlistviewth>
        <MetaDatas>
          <Tag type={type} />
          <DateTime>{createdTime}</DateTime>
        </MetaDatas>
        </Mainlistviewth>
        <Mainlistviewtd>
        <Title>{title}</Title>
        <Thumbnail src={thumbnail} alt={title} />
        </Mainlistviewtd>
        </Mainlistview>
      </Container>
    </a>
    </MainContainer>
  );
}
