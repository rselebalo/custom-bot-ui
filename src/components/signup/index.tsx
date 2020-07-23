import React from "react";
import { Button, Card, Form, Input } from "antd";
import auth0Client from "../login/auth";
import "../login/index.css";

const SignUp: React.FC<any> = ({ ...props }) => {
  const onFinish = (values: any) => {
    auth0Client.signIn(values.username, values.password);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Card className="sign-up-card">
      <br />
      <h3>Sign Up</h3>
      <br />
      <Form
        name="sign-up"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="sign-up-form"
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <label>Name</label>
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <label>Email</label>
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <label>Password</label>
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Card.Meta
        title={
          <div className="content">
            <span>
              Alreadyhave an account?{" "}
              <Button type="link" href="/login">
                Sign in
              </Button>
            </span>
          </div>
        }
      />
    </Card>
  );
};

export default SignUp;
