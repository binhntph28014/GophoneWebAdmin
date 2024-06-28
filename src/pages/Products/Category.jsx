import {
  Avatar,
  Button,
  Table,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Category = () => {
  // Lấy dữ liệu từ store Redux
  const data = useSelector((state) => state.categoryReducer.dataa);
  const [openDialog, setOpenDialog] = useState(false);

  // Định nghĩa các cột cho bảng
  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      //render: (text, record, index) => index + 1,
      width: 100,
    },
    {
      title: "Tên loại sản phẩm",
      //dataIndex: "name",
      key: "name",
    },
    {
      title: "Ảnh",
      //dataIndex: "image",
      key: "image",
      render: (image) => <Avatar src={image} size={50} />,
    },
  ];

  return (
    <div>
      <div className="flex flex-row justify-end mb-5">
        <Button
          type="primary"
          className="bg-[#407cff] px-10"
          onClick={() => {
            setOpenDialog(true);
          }}
        >
          Add
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data ? data.data : data}
        bordered
        rowKey={(record) => record._id}
      />
      
    </div>
  );
};

export default Category;

