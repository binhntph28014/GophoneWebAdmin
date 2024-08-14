import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  Layout,
  Button,
  theme,
  Form,
  Modal,
  Input,
  notification,
  Flex,
  Dropdown,
} from "antd";
const { Header } = Layout;
import { UserIcon, BellIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";

const HeaderBar = ({ toggleMenu, collapsed }) => {
  const [count, setCount] = useState(0);
  const [openDialogChangePassword, setOpenDialogChangePassword] =
    useState(false);
  const [openDialogChangeProfile, setOpenDialogChangeProfile] = useState(false);
  const myProfile = useSelector((state) => state.myProfileReducer.data);

  const itemsUser = [
    {
      label: "Đổi mật khẩu",
      key: "0",
    },
    {
      label: "Chỉnh sửa profile",
      key: "1",
    },
  ];
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleClickDropdown = (e) => {
    switch (e.key) {
      case "0":
        return setOpenDialogChangePassword(true);
      case "1":
        return setOpenDialogChangeProfile(true);
    }
  };

  return (
    <>
      <Header
        style={{
          padding: 0,
          background: colorBgContainer,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={toggleMenu}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
        <div className="mx-10 flex items-center">
          <Dropdown
            menu={{ items: itemsUser, onClick: handleClickDropdown }}
            arrow={{
              pointAtCenter: true,
            }}
            trigger={["click"]}
          >
            <Button
              onClick={(e) => e.preventDefault()}
              icon={<UserIcon className="h-5 w-5" />}
            />
          </Dropdown>
        </div>
        <DialogChangeProfile
          visible={openDialogChangeProfile}
          data={myProfile}
          onCancel={() => {
            setOpenDialogChangeProfile(false);
          }}
        />
        <DialogChangePassword
          data={myProfile}
          visible={openDialogChangePassword}
          onCancel={() => {
            setOpenDialogChangePassword(false);
          }}
        />
      </Header>
    </>
  );
};

const DialogChangeProfile = ({}) => {};

const DialogChangePassword = ({ visible, onCancel, data }) => {
  const [form] = Form.useForm();
  const token = Cookies.get("token");
  const handleFinish = (value) => {
    const { oldPassword, newPassword, confirmPassword } = value;
    axios
      .put(
        `${import.meta.env.VITE_BASE_URL}user/change-password/${
          data?.data._id
        }`,
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        notification.success({
          message: "Thành công",
          description: "Cập nhật mật khẩu thành công!",
          duration: 3,
          type: "success",
        });
        form.resetFields();
        onCancel();
      })
      .catch((error) => {
        notification.error({
          error: "Thất Bại",
          description: error.data ? error.data.message : error.message,
          duration: 3,
          type: "error",
        });
      });
  };
  const handleClear = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal open={visible} footer={null} onCancel={onCancel} closeIcon={false}>
      <Flex vertical>
        <p className="text-xl font-bold self-center my-5">Change Password</p>
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item
            label="Mật khẩu cũ"
            name={"oldPassword"}
            rules={[
              { required: true, message: "Hãy nhập mật khẩu cũ của bạn" },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Mật khẩu mới"
            name={"newPassword"}
            rules={[
              { required: true, message: "hãy nhập mật khẩu mới của bạn" },
              {
                min: 4,
                message: "Mật khẩu mới phải có ít nhât 8 ký tự",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Xác nhận mật khẩu"
            name={"confirmPassword"}
            rules={[
              {
                required: true,
                message: "Nhập lại mật khẩu",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Mật khẩu không khớp"));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <div className="flex flex-row items-center justify-between">
            <Form.Item>
              <Button
                htmlType="button"
                className="w-[230px]"
                onClick={handleClear}
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
export default HeaderBar;
