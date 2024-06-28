import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  Layout,
  Button,
  theme,
  Dropdown,
} from "antd";
const { Header } = Layout;
import { UserIcon, BellIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";


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

const DialogChangePassword = ({}) => {};
export default HeaderBar;
