// @flow
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  AutoComplete,
  Upload,
  message,
  Button,
  Icon,
} from 'antd';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 20px;

  .ant-form-item-label {
    overflow: visible;
  }
  .ant-form-item label {
    position: relative;
    float: right;
    .anticon {
      margin-left: 10px;
    }
  }
`;

export default Form.create({ name: 'gallery-upload' })(function UploadPage(props) {
  const uploaderProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        // uploading completed
        console.log(info.file.response);
        props.form.setFieldsValue({ GalleryIPFSHash: 'asdfsadf' });
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const { getFieldDecorator } = props.form;

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  return (
    <Container>
      <Form
        {...formItemLayout}
        onSubmit={e => {
          e.preventDefault();
          props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
              console.log('Received values of form: ', values);
            }
            console.log('values', values);
          });
        }}
      >
        <Form.Item
          label={
            <span>
              Main Gallery Title
              <Tooltip title="The main english or romanized title for this gallery.">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('GalleryTitleEn', {
            rules: [{ required: true, message: 'English Gallery Title is required!', whitespace: true }],
          })(<Input placeholder="Main gallery title (English Script)" />)}
        </Form.Item>
        <Form.Item
          label={
            <span>
              Japanese Script Title
              <Tooltip title="The original title in Japanese script, if applicable.">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('GalleryTitleJp', {
            rules: [],
          })(<Input placeholder="Original gallery title (Japanese Script) (Optional)" />)}
        </Form.Item>
        <Form.Item
          label={
            <span>
              Upload Gallery Zip
              <Tooltip title="Please compress all gallery file in a single zip file. After upload, you will get the IPFS hash of your gallery. We only record the IFPS hash in our metadata server.">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          <Upload key="file-upload" {...uploaderProps}>
            <Button>
              <Icon type="upload" />
              <span>Click to Upload</span>
            </Button>
          </Upload>
          {getFieldDecorator('GalleryIPFSHash', {
            rules: [],
          })(<Input key="ipfs-hash-of-uploaded-file" placeholder="IPFS hash of gallery folder" disabled />)}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
});
