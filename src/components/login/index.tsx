import React, { useState, useEffect } from "react";
import { Button, Card, Form, Input, Checkbox } from "antd";
import auth0Client from "./auth";
import "./index.css";

const Login: React.FC<any> = ({ ...props }) => {
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    const { history } = props;
    if (auth0Client.isAuthenticated()) {
      history.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFinish = (values: any) => {
    setSubmitting(true);
    sessionStorage.setItem("username", values.username);
    auth0Client.signIn(values.username, values.password);
    setSubmitting(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Card className="login-card">
      <div className="content">
        <br />
        <h4>Welcome to ChatBot</h4>
        <br />
      </div>
      <br />
      <Form
        name="log-in"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <div className="content">
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={submitting}>
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
      <Card.Meta
        title={
          <div className="content">
            <span>
              Don't have an account?{" "}
              <Button type="link" href="/signup">
                Sign Up
              </Button>
            </span>
          </div>
        }
      />
    </Card>
  );
};

export default Login;
