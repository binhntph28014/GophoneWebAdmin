import React, { useEffect, useState } from "react";
import { Modal, Button, Table } from "antd";


const ShowReviewsModal = ({ reviews, onClose }) => {
  return (
    <Modal
      title="Đánh giá sản phẩm"
      visible={true} // Chỉ cần sử dụng visible={true} để luôn hiển thị modal khi được sử dụng
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Đóng
        </Button>,
      ]}
    >
      <Table
        dataSource={reviews}
        columns={[
          { title: "Người đánh giá", dataIndex: "name", key: "name" },
          { title: "Nội dung", dataIndex: "content", key: "content" },
          { title: "Đánh giá", dataIndex: "rate", key: "rate" },
        ]}
        rowKey="_id"
        pagination={false}
      />
    </Modal>
  );
};

export default ShowReviewsModal;