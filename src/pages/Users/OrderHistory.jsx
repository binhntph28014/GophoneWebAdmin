import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = Cookies.get('token');

  useEffect(() => {
    const fetchOrderHistory = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}purchar/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data.data);
      } catch (error) {
        console.error(error.response);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderHistory();
  }, [token]);

  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Ngày mua',
      dataIndex: 'content',
      key: 'content',
      render: (text) => new Date(text).toLocaleDateString(),
    },
  ];

  return (
    <div>
      <h1>Lịch sử đơn hàng của người dùng</h1>
      <Table dataSource={orders} columns={columns} loading={loading} />
    </div>
  );
};

export default OrderHistory;