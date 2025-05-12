// components/ProtectedLayout.jsx
import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  LineChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const { Sider, Content } = Layout;

function ProtectedLayout({ children }) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const selectedKey = (() => {
    if (location.pathname === "/tracker") return "2";
    if (location.pathname === "/logout") return "3";
    return "1";
  })();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <Menu theme="dark" mode="inline" selectedKeys={[selectedKey]}>
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<LineChartOutlined />}>
            <Link to="/tracker">Progress Tracker</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<LogoutOutlined />}>
            <Link to="/logout">Logout</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ margin: "16px" }}>{children}</Content>
      </Layout>
    </Layout>
  );
}

export default ProtectedLayout;
