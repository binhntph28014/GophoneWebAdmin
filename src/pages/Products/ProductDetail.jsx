import {
  Col,
  Flex,
  Layout,
  Row,
  Typography,
  Badge,
  Skeleton,
  Modal,
  Form,
  Input,
  InputNumber,
  Button,
  Checkbox,
  notification,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  ArrowLeftIcon,

  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

const { Header, Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const ProductDetail = () => {};

export default ProductDetail;

const ContentDialogOption = ({ open, urlApi, method, productId, close }) => {
  

  return (
    <Modal
      open={open}
      width={"40%"}
      style={{ minWidth: 600 }}
      footer={null}
      closable={() => {
        close();
        form.resetFields();
      }}
      onCancel={() => {
        close();
        form.resetFields();
      }}
    >
      <Flex vertical className=" p-4 mx-auto my-auto mt-3" style={{ flex: 1 }}>
        <Form
          form={form}
          onFinish={handleFinish}
          labelCol={{ span: 5 }}
          labelAlign="left"
        >
          <Form.Item
            label={"Màu"}
            name={"name_color"}
            initialValue={data ? data.name_color : null}
          >
            <Input
              placeholder="Nhập tên màu của option sản phẩm"
              size="middle"
            />
          </Form.Item>
          <Form.Item name="image" label="Ảnh option">
            <Input
              placeholder="Ảnh option"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];

                if (file) {
                  // Display image preview
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setImage(file);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </Form.Item>
          <Form.Item
            label={"Giá tiền (VNĐ)"}
            name={"price"}
            initialValue={data ? data.price : 0}
          >
            <InputNumber
              min={0}
              placeholder="Nhập giá tiền của option sản phẩm"
              size="middle"
              className="w-full"
            />
          </Form.Item>
          <Form.Item
            label={"Giảm giá (theo %)"}
            name={"discount_value"}
            initialValue={data ? data.discount_value : 0}
          >
            <InputNumber
              type="number"
              min={0}
              max={50}
              placeholder="Nhập phần trăm giảm giá của option sản phẩm"
              size="middle"
              className="w-full"
            />
          </Form.Item>
          <Form.Item
            label={"Số lượng"}
            name={"quantity"}
            initialValue={data ? data.quantity : null}
          >
            <InputNumber
              min={0}
              placeholder="Nhập số lượng của option sản phẩm"
              size="middle"
              className="w-full"
            />
          </Form.Item>
          <Form.Item
            label={"Hot option"}
            name={"hot_option"}
            valuePropName="checked"
            initialValue={data ? data.hot_option : null}
          >
            <Checkbox />
          </Form.Item>
          <div
            className="flex flex-row items-center justify-around"
            style={{ width: "100%" }}
          >
            <Form.Item>
              <Button
                htmlType="button"
                className="w-[230px]"
                onClick={handleCancel}
              >
                Clear
              </Button>
            </Form.Item>

            <Form.Item>
              <Button
                htmlType="submit"
                type="primary"
                className="bg-[#407cff] px-10 w-[230px]"
              >
                Submit
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Flex>
    </Modal>
  );
};