import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Input, message } from "antd";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editInput, setEditInput] = useState("");

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(`Error fetching data: ${error}`);
      });
  }, []);

  const handleEdit = (record) => {
    setEditingId(record.id);
    setEditInput(record.website);
  };

  const handleSave = async (id) => {
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, {
        website: editInput,
      });

      setUsers(
        users.map((item) =>
          item.id === id ? { ...item, website: editInput } : item
        )
      );
      setEditingId(null);
      message.success("User website updated successfully!");
    } catch (error) {
      message.error("Failed to update user website!");
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Company Name",
      dataIndex: "company",
      key: "company",
      render: (company) => company.name,
    },
    {
      title: "City",
      dataIndex: "address",
      key: "address",
      render: (address) => address.city,
    },
    {
      title: "Website",
      dataIndex: "website",
      key: "website",
      render: (text, record) => {
        if (editingId === record.id) {
          return (
            <Input
              value={editInput}
              onChange={(e) => setEditInput(e.target.value)}
            />
          );
        } else {
          return text;
        }
      },
    },
    {
      title: " ",
      key: "action",
      render: (text, record) => {
        if (editingId === record.id) {
          return (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                type="primary"
                style={{ marginRight: "10px" }}
                onClick={() => handleSave(record.id)}
              >
                Save
              </Button>
              <Button onClick={() => setEditingId(null)}>Cancel</Button>
            </div>
          );
        } else {
          return (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button type="primary" onClick={() => handleEdit(record)}>
                Edit
              </Button>
              <Button type="primary" danger>
                Delete
              </Button>
            </div>
          );
        }
      },
    },
  ];

  return <Table columns={columns} dataSource={users} rowKey="id" />;
};

export default Users;
