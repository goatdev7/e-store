import React from 'react';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Alert from 'antd/lib/alert';
import Card from 'antd/lib/card';
import Layout from 'antd/lib/layout';
import UserOutlined from '@ant-design/icons/UserOutlined';
import LockOutlined from '@ant-design/icons/LockOutlined';
import Link from 'next/link';
import { ApolloError } from '@apollo/client';


const { Content } = Layout;

interface LoginFormProps {
  formData: { identifier: string; password: string };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (values: any) => Promise<void>;
  loading: boolean;
  error: ApolloError | undefined;
}

const LoginForm: React.FC<LoginFormProps> = ({
  formData,
  handleChange,
  handleSubmit,
  loading,
  error,
}) => {
  const onFinish = (values: any) => {
    handleSubmit(values);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content
      className='bg-gradient-to-r from-purple-100 to-purple-300 transition-colors duration-500'
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Card style={{ width: 500, borderRadius: 8 }} >
          <h1 style={{ textAlign: 'center', marginBottom: 24 }}>Log In</h1>
          <Form name="login" initialValues={formData} onFinish={onFinish} layout="vertical">
            <Form.Item
              label="Username/Email"
              name="identifier"
              rules={[{ required: true, message: 'Please input your username or email!' }]}
            >
              <Input
                name="identifier"
                onChange={handleChange}
                placeholder="Username or email"
                prefix={<UserOutlined />}
              />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password
                name="password"
                onChange={handleChange}
                placeholder="Password"
                prefix={<LockOutlined />}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                {loading ? 'Logging in...' : 'Log In'}
              </Button>
            </Form.Item>
            {error && <Alert message={error.message} type="error" showIcon />}
            <p style={{ textAlign: 'center' }}>
              Not a member? <Link href="/auth/register">Register Now</Link>
            </p>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
};

export default LoginForm;
