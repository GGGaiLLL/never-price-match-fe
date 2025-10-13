import React, { useState } from "react";
import styles from "./signinModal.module.css";
import { App, Form, Input, Modal } from "antd";

import { useLoginMutation } from "../../__generated__/graphql";
import { useAuthStore } from "../../store/useAuthStore";

interface SigninModalProps {
  open: boolean;
  onCancel: () => void;
}

interface SigninFormData {
  email: string;
  password: string;
}

const SigninModal: React.FC<SigninModalProps> = (props) => {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const { open, onCancel } = props;

  const setUser = useAuthStore((s) => s.setUser);

  const [signin] = useLoginMutation();

  const handleLogin = async (values: SigninFormData) => {
    const result = await signin({
      variables: {
        input: {
          email: values.email,
          password: values.password,
        },
      },
    });
    if (result.data?.login.ok) {
      localStorage.setItem("priceMatchSession", "1");
      setUser(result.data?.login.user ?? null);
      message.success({
        content: "Sign in success",
      });
      onCancel();
    } else {
      message.error({
        content: "Sign in failed",
      });
      return false;
    }
  };

  return (
    <Modal
      open={open}
      title="Sign in"
      okText="Sign in"
      cancelText="Cancel"
      okButtonProps={{ autoFocus: true, htmlType: "submit" }}
      onCancel={onCancel}
      destroyOnHidden
      modalRender={(dom) => (
        <Form
          layout="vertical"
          form={form}
          name="sign_in_modal"
          clearOnDestroy
          autoFocus={true}
          onFinish={(values) => handleLogin(values)}
        >
          {dom}
        </Form>
      )}
    >
      <Form.Item
        name="email"
        label="Email"
        required
        rules={[{ type: "email", message: "Please enter a valid email" }]}
      >
        <Input placeholder="Enter your email" />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: "Please enter a valid password" }]}
      >
        <Input.Password placeholder="Enter your password" />
      </Form.Item>
    </Modal>
  );
};

export default SigninModal;
