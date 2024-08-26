// src/pages/Products/voucher.jsx

import {
    Button,
    Flex,
    Form,
    Input,
    Modal,
    Table,
    Typography,
    notification,
    Select,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVoucherRequest } from "../../redux/actions/voucher";
import axios from "axios";
import Cookies from 'js-cookie';


const Voucher = () => {
    const data = useSelector((state) => state.voucherReducer?.data);
    const loading = useSelector((state) => state.voucherReducer?.loading || false);
    const error = useSelector((state) => state.voucherReducer?.error || null);
    const [openDialog, setOpenDialog] = useState(false);
    const [editData, setEditData] = useState(null);
    const token = Cookies.get("token");
    const [voucher, setVoucher] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchVoucherRequest(token));
        showPurchases();
    }, [dispatch, token]);

    const showPurchases = () => {
        axios.get(`${import.meta.env.VITE_BASE_URL}voucher/get-list`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => {
                const { data } = res;
                if (data && Array.isArray(data.data)) {
                    if (data.data.length === 0) {
                        notification.warning({
                            message: 'Không có sản phẩm',
                            description: 'Khách hàng này chưa mua sản phẩm nào.',
                            duration: 3,
                        });
                        return;
                    }
                    setVoucher(data.data);
                    //setVisible(true);

                } else {
                    notification.error({
                        message: 'Lỗi',
                        description: 'Dữ liệu không đúng định dạng.',
                        duration: 3,
                    });
                }
            })

    };

    const columns = [
        {
            title: "STT",
            key: "index",
            render: (text, record, index) => index + 1,
            width: 50,
        },
        {
            title: "Code",
            dataIndex: "code",
            key: "code",
        },
        {
            title: "Type",
            dataIndex: "type",
            key: "type",
        },
        {
            title: "Value",
            dataIndex: "value",
            key: "value",
        },
        {
            title: "Start Date",
            dataIndex: "start_date",
            key: "start_date",
            render: (date) => new Date(date).toLocaleDateString(),
        },
        {
            title: "End Date",
            dataIndex: "end_date",
            key: "end_date",
            render: (date) => new Date(date).toLocaleDateString(),
        },
        {
            title: "Action",
            key: "action",
            render: (record) => {
                return (
                    <div className="flex flex-row justify-around items-center">
                        <Button
                            danger
                            onClick={() => {
                                Modal.confirm({
                                    title: "Bạn muốn xóa voucher?",
                                    okButtonProps: {
                                        style: {
                                            backgroundColor: "#407cff",
                                        },
                                    },
                                    onOk: () => {
                                        axios
                                            .delete(`${import.meta.env.VITE_BASE_URL}/voucher/${record._id}`, {
                                                headers: { Authorization: `Bearer ${token}` },
                                            })
                                            .then((response) => {
                                                dispatch(fetchVoucherRequest());
                                                notification.success({
                                                    message: "Thành công",
                                                    description: "Xóa voucher thành công!",
                                                    duration: 3,
                                                });
                                            })
                                            .catch((error) => {
                                                console.error(error);
                                                notification.error({
                                                    message: "Thất bại",
                                                    description: "Xóa voucher thất bại!",
                                                    duration: 3,
                                                });
                                            });
                                    },
                                });
                            }}
                        >
                            Xóa
                        </Button>
                    </div>
                );
            },
        },
    ];

    return (
        <div>
            <div className="flex flex-row justify-end mb-5">
                <Button
                    onClick={() => {
                        setEditData(null);
                        setOpenDialog(true);
                    }}
                    type="primary"
                    className="bg-[#407cff] px-10"
                >
                    Add
                </Button>
            </div>
            <Table
                dataSource={voucher}
                columns={columns}
                loading={loading}
                bordered
                rowKey={(record) => record._id}
            />
            <DialogAddVoucher
                open={openDialog}
                data={editData}
                onCancel={() => {
                    setOpenDialog(false);
                }}
            />
        </div>
    );
};

export default Voucher;

const DialogAddVoucher = ({ open, onCancel }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleFinish = (data) => {
        setLoading(true);
        const token = Cookies.get("token");
        axios
            .post(`${import.meta.env.VITE_BASE_URL}voucher/add`, {
                ...data,
                type: data.type === 'percentage' ? 'percentage' : 'fixed' // Đảm bảo giá trị hợp lệ
            }, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                dispatch(fetchVoucherRequest());
                onCancel();
                form.resetFields();
                setLoading(false);
                notification.success({
                    message: "Thành công",
                    description: "Thêm voucher thành công!",
                    duration: 3,
                    type: "success",
                });
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
                notification.error({
                    message: "Thất bại",
                    description: "Thêm voucher thất bại",
                    duration: 3,
                    type: "error",
                });
            });
    };



    const handleCancel = () => {
        form.resetFields();
        onCancel();
    };

    return (
        <Modal open={open} footer={null} onCancel={handleCancel}>
            <Flex vertical justify="center">
                <Typography.Title className="self-center mt-3" level={3}>
                    Tạo voucher
                </Typography.Title>
                <Form form={form} onFinish={handleFinish}>
                    <Form.Item
                        name="code"
                        label="Code"
                        rules={[{ required: true, message: "Please input your code!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="type"
                        label="Type"
                        rules={[{ required: true, message: "Please select a type!" }]}
                    >
                        <Select placeholder="Select a type">
                            <Select.Option value="percentage">Percentage</Select.Option>
                            <Select.Option value="fixed">Fixed</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="value"
                        label="Value"
                        rules={[{ required: true, message: "Please input the value!" }]}
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item
                        name="start_date"
                        label="Start Date"
                        rules={[{ required: true, message: "Please select a start date!" }]}
                    >
                        <Input type="date" />
                    </Form.Item>
                    <Form.Item
                        name="end_date"
                        label="End Date"
                        rules={[{ required: true, message: "Please select an end date!" }]}
                    >
                        <Input type="date" />
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
            </Flex>
        </Modal>
    );
};
