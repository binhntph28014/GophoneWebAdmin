import React, { useEffect, useState } from "react";
import "./login.css";
import { Card, Typography, Button, Form, Input, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoginRequest } from "../../redux/actions/Auth";
import Cookies from "js-cookie";

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authReducer.loading);
  const error = useSelector((state) => state.authReducer.error);
  const data = useSelector((state) => state.authReducer.data);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onFinish = () => {
    dispatch(fetchLoginRequest({ email, password }));
  };

  useEffect(() => {
    if (error) {
      notification.error({
        message: "Login Failed",
        description: error.message ? error.message : error,
        duration: 3,
      });
    } else if (data) {
      if (data.role === "customer") {
        notification.error({
          message: "Login Failed",
          description: "Bạn không có quyền truy cập",
          duration: 3,
        });
      } else {
        Cookies.set("token", data.token);
        Cookies.set("role", data.role);
        navigate("/");
      }
    }
  }, [error, data, navigate]);

  return (
    <div className="flex-login">
      <div className="gradient-bg"></div>
      <Card bordered={false} className="login-form">
        <Title level={3}>Đăng nhập</Title>
        <Form
          name="loginForm"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            padding: 20,
          }}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              placeholder="Email"
              className="h-12 text-base"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              placeholder="Password"
              className="h-12 text-base"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full h-[50px] text-base login-button"
              loading={loading}
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
