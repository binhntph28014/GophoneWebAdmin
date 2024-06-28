import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Select,
  Table,
  Typography,
} from "antd";
import { Link, useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();

  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      render: (text, record, index) => index + 1,
      width: 50,
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <button onClick={() => setOpenDialogEditProduct(true)}>
          <Typography>{}</Typography>
        </button>
      ),
    },
    {
      title: 'Loại sản phẩm',
      dataIndex: 'category_id',
      key: 'category_id',
      render: (category) => <Typography>{category.name}</Typography>,
    },
    {
      title: 'Ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (text) => <img src={text} className="w-20" />,
    },
    {
      title: 'Giá',
      dataIndex: 'minPrice',
      key: 'price',
      render: (text) => <Typography>{text ? text.toLocaleString('vi-VN') : ''}</Typography>,
    },
    {
      title: 'Kích hoạt',
      key: 'update',
      render: (record) => (
        <Button onClick={() => setOpenDialogEditProduct(true)}>Sửa</Button>
      ),
    },
  ];

  const removeAccents = (str) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  return (
    <div>
      <div className="flex justify-end my-3">
        <Select
          showSearch
          style={{ width: 300, marginLeft: 10 }}
          allowClear
          size="middle"
          placeholder="Search to select category"
        />
        <Button type="primary" className="bg-[#407cff] px-10 ml-3" onClick={() => navigate('/products/create')}>
          create new a product
        </Button>
      </div>
      <Table dataSource={[]} columns={columns} bordered rowKey={(record) => record._id} />
      
    </div>
  );
};

export default Products;

