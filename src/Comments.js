import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Input, message } from "antd";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editInput, setEditInput] = useState("");

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/comments")
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error(`Error fetching data: ${error}`);
      });
  }, []);

  const handleEdit = (record) => {
    setEditingId(record.id);
    setEditInput(record.body);
  };

  const handleSave = async (id) => {
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/comments/${id}`, {
        body: editInput,
      });

      setComments(
        comments.map((item) =>
          item.id === id ? { ...item, body: editInput } : item
        )
      );
      setEditingId(null);
      message.success("Comment updated successfully!");
    } catch (error) {
      message.error("Failed to update comment!");
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
      title: "Body",
      dataIndex: "body",
      key: "body",
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
              <Button
                type="primary"
                style={{ marginRight: "10px" }}
                onClick={() => handleEdit(record)}
              >
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

  return <Table columns={columns} dataSource={comments} rowKey="id" />;
};

export default Comments;
