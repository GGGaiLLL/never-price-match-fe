import React from "react";
import styles from "./signinModal.module.css";
import { App, Form, Input, Modal, notification } from "antd";
import { useCreateUserMutation } from "../../__generated__/graphql";

interface SignupModalProps {
  open: boolean;
  onCancel: () => void;
}

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  doubleCheckPassword: string;
}

const SignupModal: React.FC<SignupModalProps> = (props) => {
  const [form] = Form.useForm();
  const { open, onCancel } = props;
  const [signup] = useCreateUserMutation();
  const { message } = App.useApp();

  const handleSignup = async (values: SignupFormData) => {
    const result = await signup({
      variables: {
        input: {
          name: values.name,
          email: values.email,
          password: values.password,
        },
      },
    });
    if (!result.errors) {
      message.success({
        content: "Sign up success",
      });
      onCancel();
    } else {
      message.error({
        content: "Sign up failed",
      });
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
          onFinish={(values) => handleSignup(values)}
        >
          {dom}
        </Form>
      )}
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: "Please enter a valid name" }]}
      >
        <Input placeholder="Enter your name" />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: "Please enter a valid email" },
          { type: "email", message: "Please enter a valid email" },
        ]}
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
      <Form.Item
        name="doubleCheckPassword"
        label="Double Check Password"
        rules={[
          { required: true, message: "Please enter a valid password" },
          {
            validator: (_, value) => {
              if (value !== form.getFieldValue("password")) {
                return Promise.reject("Passwords do not match");
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <Input.Password placeholder="Enter your password again" />
      </Form.Item>
    </Modal>
  );
};

export default SignupModal;
