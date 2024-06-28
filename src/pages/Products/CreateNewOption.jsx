import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
} from "antd";
import React, { useState } from "react";

const CreateNewOption = ({ productId }) => {
  return (
    <Form
      layout="horizontal"
      labelCol={{ span: 4 }}
      labelAlign="left"
    >
      <Form.Item label="Màu sắc" name="name_color">
        <Input placeholder="Nhập tên màu sắc của sản phẩm" />
      </Form.Item>
      <Form.Item label="Ảnh sản phẩm" name="image">
        <Input type="file" accept="image/*" />
      </Form.Item>
      <Form.Item label="Giá tiền" name="price">
        <InputNumber
          min={0}
          placeholder="Nhập giá tiền của sản phẩm"
        />
      </Form.Item>
      <Form.Item label="Giảm giá (%)" name="discount_value">
        <InputNumber
          min={0}
          max={50}
          placeholder="Nhập phần trăm giảm giá của sản phẩm"
        />
      </Form.Item>
      <Form.Item label="Số lượng" name="quantity">
        <InputNumber
          min={0}
          placeholder="Nhập số lượng của sản phẩm"
        />
      </Form.Item>
      <Form.Item label="Option nổi bật" name="hot_option" valuePropName="checked">
        <Checkbox />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Tạo option
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateNewOption;
