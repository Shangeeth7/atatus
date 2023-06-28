import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { Layout, Menu } from "antd";
import Posts from "./Posts";
import Users from "./Users";
import Comments from "./Comments";
import "./App.css";
import NotFound from "./NotFound";

const { Header, Content } = Layout;

function App() {
  return (
    <Router>
      <Layout>
        <Header>
          <Menu mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <Link to="/posts">Posts</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/users">Users</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/comments">Comments</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <Routes>
            <Route path="/" element={<Posts />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/users" element={<Users />} />
            <Route path="/comments" element={<Comments />} />
            <Route path="/error:404" element={<NotFound />} />
            <Route path="*" element={<Navigate replace to="/error:404" />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
