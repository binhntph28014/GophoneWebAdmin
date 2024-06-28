import {
  Button,
  Modal,
  Row,
  Table,
  Typography,
  Col,
} from "antd";
import moment from "moment";
import React, { useState } from "react";

const Invoice = () => {
  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Mã hóa đơn",
      dataIndex: "_id",
      key: "id",
    },
    {
      title: "Tên người đặt",
      dataIndex: "info_id",
      key: "nameUser",
      render: (record) => <div>{record?.name}</div>,
    },
    {
      title: "Tổng tiền hóa đơn",
      dataIndex: "total_price",
      key: "totalPrice",
      render: (text) => (
        <Typography>{text ? text.toLocaleString("vi-VN") : ""} đ</Typography>
      ),
    },
    {
      title: "Trạng thái đơn hàng",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Đã hủy", value: "Đã hủy" },
        { text: "Đã giao hàng", value: "Đã giao hàng" },
        { text: "Chờ giao hàng", value: "Chờ giao hàng" },
        { text: "Chờ xác nhận", value: "Chờ xác nhận" },
        { text: "Đang giao hàng", value: "Đang giao hàng" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "",
      key: "action",
      render: () => <Button type="link">chi tiết</Button>,
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={[]}
        bordered
        rowKey={(record) => record._id}
      />
      <Modal
        open={false} 
        footer={null}
        width={"50%"}
      >
        <DetailContent data={null} /> 
      </Modal>
    </div>
  );
};

const DetailContent = ({ data }) => {
  const formattedDate = (date) => moment(date).format("HH:mm DD/MM/YYYY");

  return (
    <div className="flex vertical">
      <div className="flex justify-between items-start py-5">
        <div className="flex flex-col">
          <Typography.Title level={4} style={{ margin: 0 }}>
            Mã hóa đơn: 
          </Typography.Title>
          <Typography.Text className="text-base">
            Ngày tạo: 
          </Typography.Text>
          <Typography.Text className="text-base">
            Ngày hoàn thành: 
          </Typography.Text>
        </div>
        <div className="flex flex-col">
          <Typography.Title style={{ margin: 0 }} level={4}>
            Tổng tiền: 
          </Typography.Title>
          <Typography.Title style={{ margin: 0 }} level={5}>
            Trạng thái đơn hàng: 
          </Typography.Title>
          <Typography.Title style={{ margin: 0 }} level={5}>
            Trạng thái thanh toán:
          </Typography.Title>
        </div>
      </div>
      <div>
        <Row>
          <Col span={14}>
            {[]} 
          </Col>
          <Col span={10} className="border-l">
            <div className="flex vertical">
              <Typography.Title level={5}>Thông tin người đặt</Typography.Title>
              <Typography.Text className="text-base">
                Tên người đặt: 
              </Typography.Text>
              <Typography.Text className="text-base">
                Số điện thoại người đặt: 
              </Typography.Text>
              <Typography.Text className="text-base">
                Địa chỉ người đặt:               </Typography.Text>
              <Button type="primary" className="bg-[#407cff] ">
                Xác nhận đơn hàng
              </Button>
              <Button type="primary" className="bg-[#407cff] mt-2">
                Giao hàng
              </Button>
              <Button type="primary" className="bg-[#407cff] mt-2">
                Giao hàng thành công
              </Button>
              <Button type="default" danger className="mt-2">
                Hủy đơn hàng
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Invoice;
