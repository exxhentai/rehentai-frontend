import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Select } from 'antd';

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
  border: 2px ridge #5c0d12;
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
  align-items: center;
  margin-top: 2px;
`;

const Input = styled(Select)`
  padding: 0;
  width: 310px !important;
  line-height: 20px;
  border: 1px solid #b5a4a4;
  border-radius: 3px;
  background: #edeada;
  &:hover {
    background: #f3f0e0;
  }
  &::placeholder {
    color: #9f746f;
  }

  & .ant-select-selection {
    padding: 0;
    margin: 0;
    border: none;
    background: none;
  }

  & .ant-select-selection__choice,
  .ant-select-selection__choice__remove,
  .ant-select-selection__choice__remove:hover {
    background-color: #666;
    color: white;
    &:hover {
      opacity: 0.8;
    }
  }
`;

const Button = styled.button`
  margin: 0 2px;
  font-size: 12px;
  color: #5c0d12;
  line-height: 24px;
  height: 34px;
  border: 2px solid #b5a4a4;
  border-radius: 3px;
  background: #edeada;
  &:hover {
    border-color: #977273;
    background: #f3f0e0;
  }
`;

const ActionWrapper = styled.div`
  display: flex;
  margin-top: 4px;
`;

export default function SearchBox() {
  // load available tags from server, so user can use tags easily
  const [availableTags, setAvailableTags] = useState({});
  useEffect(() => {
    // TODO: fetch this from server
    const fakeDataFromServer = {
      language: ['english'],
      character: ['tomoko kuroki'],
      femail: ['beauty mark', 'bikini', 'dark skin', 'anal'],
    };
    setAvailableTags(fakeDataFromServer);
  }, []);

  // selected tags, used for searching
  const [selectedTags, setSelectedTags] = useState([]);
  function search() {
    console.log(`searching ${JSON.stringify(selectedTags)}`);
  }
  function clearFilters() {
    setSelectedTags([]);
  }

  return (
    <Wrapper>
      <TagWrapper>
        {tagList.map(type => (
          <Tag type={type} />
        ))}
      </TagWrapper>

      <InputWrapper>
        <Input
          mode="tags"
          style={{ width: '100%' }}
          placeholder="select tags"
          onChange={setSelectedTags}
          optionLabelProp="label"
          value={selectedTags}
        >
          {Object.keys(availableTags).map(tagGroupName => (
            <Select.OptGroup label={tagGroupName}>
              {availableTags[tagGroupName].map(tagName => (
                <Select.Option value={`${tagGroupName}:${tagName}`} label={tagName}>
                  {`${tagGroupName}:${tagName}`}
                </Select.Option>
              ))}
            </Select.OptGroup>
          ))}
        </Input>
        <Button onClick={search}>Apply Filter</Button>
        <Button onClick={clearFilters}>Clear Filter</Button>
      </InputWrapper>

      <ActionWrapper>
        <ClickableText fontSize={10} underline>
          Show Advanced Options
        </ClickableText>
        <ClickableText fontSize={10} underline style={{ marginLeft: '12px' }}>
          Show File Search
        </ClickableText>
      </ActionWrapper>
    </Wrapper>
  );
}
