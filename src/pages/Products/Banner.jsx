import {
  Button,
  Form,
  Input,
  Modal,
  Table,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const Banner = () => {
  
  
  // Lấy dữ liệu từ store Redux
  const data = useSelector((state) => state.bannerReducer.data);
  const loading = useSelector((state) => state.bannerReducer.loading);

  // Trạng thái cục bộ để quản lý modal và dữ liệu form
  const [openDialog, setOpenDialog] = useState(false);

  // Định nghĩa các cột cho bảng
  const columns = [
    {
      title: "STT",
      key: "index",
      render: (text, record, index) => index + 1,
      width: 50,
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (image) => <img src={image} className="h-36" />,
    },
  ];

  return (
    <div>
      <div className="flex flex-row justify-end mb-5">
        <Button
          onClick={() => {
            setOpenDialog(fa);
          }}
          type="primary"
          className="bg-[#407cff] px-10"
        >
          Add
        </Button>
      </div>
      <Table
        dataSource={data ? data.data : data}
        columns={columns}
        loading={loading}
        bordered
        rowKey={(record) => record._id}
      />
      <DialogAddBanner
        open={openDialog}
        onCancel={() => {
          setOpenDialog(false);
        }}
      />
    </div>
  );
};

export default Banner;

const DialogAddBanner = ({ open, onCancel }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal open={open} footer={null} onCancel={handleCancel}>
      <div className="flex flex-col items-center">
        <Typography.Title className="self-center mt-3" level={3}>
          Tạo quảng cáo
        </Typography.Title>
        <Form form={form}>
          <Form.Item
            name="image"
            label="Ảnh"
            rules={[{ required: true, message: "Please input your image!" }]}
          >
            <Input type="file" />
          </Form.Item>
          <div className="flex flex-row items-center justify-between">
            <Form.Item>
              <Button
                htmlType="button"
                className="w-[230px]"
                onClick={handleCancel}
              >
                Hủy
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                loading={loading}
                htmlType="submit"
                type="primary"
                className="bg-[#407cff] px-10 w-[230px]"
              >
                Lưu
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </Modal>
  );
};


//nh