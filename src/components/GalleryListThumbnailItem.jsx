// @flow
import React from 'react';
import styled from 'styled-components';
import Tag from './Tag';

const Container = styled.div`
  min-height: 200px;
  padding-bottom: 2px;
  min-width: 250px;
  max-width: 100%;
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
const Mainlistview = styled.table`
`;
const Mainlistviewtr = styled.tr`
border:1px solid #000; 
  font-family: arial, helvetica, sans-serif;; 
  font-size:16px; 
  width:200px;
  border:1px solid #000;
  text-align:center;
  border-collapse:collapse;
`;
const MainlistviewMetaDatas = styled.td`
  /*position: absolute;*/
  width:12%;
`;
const MainlistviewDateTime = styled.td`
  /*position: absolute;*/
  width:12%;
`;
const MainlistviewTitle = styled.td`
  /*position: absolute;*/
  width:66%;
`;
const MainlistviewUploader = styled.td`
  /*position: absolute;*/
  width:10%;
`;
const Dirdown = styled.div`
`;
const Dirstar = styled.div`
  width: 80px;
  height: 16px;
  background-repeat: no-repeat;
  background-image: url(https://ehgt.org/g/rt.png);
  float: left;
`;
const Gtdown = styled.div`
  /*position: absolute;*/
  left: 99px;
  top: 25px;
  height: 15px;
  width: 15px;
  background-image: url(https://ehgt.org/g/t.png);
  float: left;
  margin-left: 10px;
`;
const Title = styled.h3`
  color: #8f6063;
  overflow: hidden;
  min-height: 32px;
  max-height: 32px;
  line-height: 16px;
  margin: 6px 4px 0;
  font-size: 13pt;
  text-align: left;
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
const Comicname = styled.div`
`;
const Comictag = styled.div`
    float: left;
    font-weight: bold;
    padding: 1px 4px;
    margin: 0 2px 5px 2px;
    
    border-radius: 5px;
    border: 1px solid #806769;
    background: #F2EFDF;
    opacity:0.75;
        height: 20px;
    min-width: 20px;
    max-width: 780px;
    overflow: hidden;
        font-size: 9pt;
    
`;
const DateTimeDiv = styled.div`
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
const Uploader = styled.p`
font-size:10px;
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
  Uploader: String,
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
            <Mainlistviewtr>
              <MainlistviewMetaDatas>
                <MetaDatas>
                  <Tag type={type} />
                </MetaDatas>
              </MainlistviewMetaDatas>
              <MainlistviewDateTime>
                <DateTimeDiv>
                  <DateTime>{createdTime}</DateTime>
                </DateTimeDiv>
                <Dirdown>
                <Dirstar></Dirstar>
                <Gtdown></Gtdown>
                </Dirdown>
              </MainlistviewDateTime>

              <MainlistviewTitle>
                <Comicname>
                  <Title>{title}</Title>
                </Comicname>
                <Thumbnail src={thumbnail} alt={title} />
                <Comictag>
                  {id}
                </Comictag>
              </MainlistviewTitle>
              <MainlistviewUploader>
                <Uploader>{id}</Uploader>
              </MainlistviewUploader>
            </Mainlistviewtr>
          </Mainlistview>
        </Container>
      </a>
    </MainContainer>
  );
}
