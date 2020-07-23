import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { ExportOutlined } from "@ant-design/icons";
import { Redirect, Route, Switch, Link } from "react-router-dom";
import { PRIVATE_ROUTES } from "../../navigation/routes";
import auth0Client from "../../components/login/auth";
import {
  UserOutlined,
  VideoCameraOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import "./index.css";

const DefaultLayout: React.FC = () => {
  const { Header, Content, Sider } = Layout;
  const [collapsed, setCollpsed] = useState(false);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} width={300}>
        <div className="logo">
          <br />
          <span>ChatBot App</span>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["/"]}
          selectedKeys={[window.location.pathname]}
        >
          <Menu.Item key="/" icon={<UserOutlined />}>
            <Link to="/">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="/chat" icon={<VideoCameraOutlined />}>
            <Link to="/chat">Chat</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header>
          <div className="header-content">
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollpsed(!collapsed),
              }
            )}
            <div>
              <span
                className="top-right-menu"
                onClick={() => auth0Client.signOut()}
              >
                <ExportOutlined /> <label>Logout</label>
              </span>
            </div>
          </div>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <Switch>
            {PRIVATE_ROUTES.map((route, idx) => {
              return route.component ? (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  render={(props) => <route.component {...props} />}
                />
              ) : null;
            })}
            <Redirect from="/" to="/" />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
