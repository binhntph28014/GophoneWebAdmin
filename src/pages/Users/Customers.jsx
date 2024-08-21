import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomerRequest } from '../../redux/actions/Customer';
import { Avatar, Modal, Table, notification } from 'antd';
import axios from 'axios';
import Cookies from 'js-cookie';

const Customers = () => {
  const dispatch = useDispatch();
  const customerData = useSelector((state) => state.customerReducer.data);
  const loading = useSelector((state) => state.customerReducer.loading);
  const token = Cookies.get('token');
  const [orders, setOrders] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    dispatch(fetchCustomerRequest('customer', token));
    fetchOrders(); 
  }, [dispatch, token]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/purchar', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (Array.isArray(response.data)) {
        setOrders(response.data);
      } else {
        console.error('Dữ liệu không phải là mảng:', response.data);
      }
    } catch (error) {
      console.error("Error fetching orders", error);
    }
  };

  const showPurchases = (userId) => {
    axios.get(`${import.meta.env.VITE_BASE_URL}purchar/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        const { data } = res;
        if (data && Array.isArray(data.result)) {
          if (data.result.length === 0) {
            notification.warning({
              message: 'Không có sản phẩm',
              description: 'Khách hàng này chưa mua sản phẩm nào.',
              duration: 3,
            });
            return;
          }
          setPurchases(data.result);
          setVisible(true);
          setSelectedCustomer(userId);
        } else {
          notification.error({
            message: 'Lỗi',
            description: 'Dữ liệu không đúng định dạng.',
            duration: 3,
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching purchases:", error);
        notification.error({
          message: 'Lỗi',
          description: 'Không thể lấy danh sách sản phẩm.',
          duration: 3,
        });
      });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const modalStyle = {
    width: '80%',  
  };
  const purchaseColumns = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      align: 'center',
      render: (text, record, index) => index + 1,
      width: '10%',
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'productsOrder',
      key: 'option_id',
render: (productsOrder) => productsOrder.map(product => product.option_id.product_id.name).join(", "),
      width: '15%',
    },
    {
      title: 'Số lượng',
      dataIndex: 'productsOrder',
      key: 'quantity',
      align: 'center',
      render: (productsOrder) => productsOrder.map(product => product.quantity).join(", "),
      width: '10%',
    },
    {
      title: 'Giá',
      dataIndex: 'total_price',
      key: 'total_price',
      align: 'right',
      render: (text) => formatPrice(text),
      width: '15%',
    },
    {
      title: 'Ngày mua',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      render: (text) => new Date(text).toLocaleDateString(),
      width: '15%',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: '15%',
    },
    {
      title: 'Trạng thái thanh toán',
      dataIndex: 'payment_status',
      key: 'payment_status',
      align: 'center',
      render: (payment_status) => (payment_status ? 'Đã thanh toán' : 'Chưa thanh toán'),
      width: '15%',
    },
  ];

  const customerColumns = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      align: 'center',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Tên tài khoản',
      dataIndex: 'username',
      key: 'username',
      render: (text, record) => (
        <a onClick={() => showPurchases(record._id)}>{text}</a>
      ),
    },
    {
      title: 'Ảnh',
      dataIndex: 'avatar',
      key: 'avatar',
      align: 'center',
      render: (text) => (
        <Avatar
          src={
            text
              ? text
              : 'https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg'
          }
        />
      ),
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Kích hoạt',
      dataIndex: 'is_active',
      key: 'active',
      align: 'center',
      render: (active, record) => (
        <button
          onClick={() => {
            Modal.confirm({
              title: 'Bạn muốn thay đổi trạng thái của cửa hàng này?',
              okButtonProps: {
                style: {
                  backgroundColor: '#407cff',
                },
              },
              onOk: () => {
                axios
                  .put(
                    `${import.meta.env.VITE_BASE_URL}user/change-active-account/${record._id}`,
                    {},
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  )
                  .then(() => {
                    dispatch(fetchCustomerRequest('customer', token));
notification.success({
                      message: 'Thành công',
                      description: 'Chuyển trạng thái thành công!',
                      duration: 3,
                    });
                  })
                  .catch(() => {
                    notification.error({
                      message: 'Thất bại',
                      description: 'Chuyển trạng thái thất bại!',
                      duration: 3,
                    });
                  });
              },
            });
          }}
          className={`${active ? 'bg-green-500' : 'bg-red-500'} rounded-lg px-3 py-2 text-white`}
        >
          {active ? 'Kích hoạt' : 'Chưa kích hoạt'}
        </button>
      ),
    },
  ];

  return (
    <div>
      <h2>Customer List</h2>
      <Table
        dataSource={customerData ? customerData.result : []}
        columns={customerColumns}
        loading={loading}
        bordered
        rowKey={(record) => record._id}
      />
      <Modal
        title={`Danh sách sản phẩm đã mua của khách hàng ${selectedCustomer}`}
        visible={visible}
        width={"80%"}
        onCancel={() => {
          setVisible(false);
          setSelectedCustomer(null);
        }}
        footer={null}
      >
        <Table dataSource={purchases} columns={purchaseColumns} rowKey="_id" bordered />
      </Modal>
    </div>
  );
};

export default Customers;