import { ApolloError } from "@apollo/client";
import React from "react";
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Alert from 'antd/lib/alert';
import Card from 'antd/lib/card';
import Layout from 'antd/lib/layout';
import UserOutlined from '@ant-design/icons/UserOutlined';
import LockOutlined from '@ant-design/icons/LockOutlined';
import MailOutlined from '@ant-design/icons/MailOutlined';
import Link from 'next/link';

const { Content } = Layout;

interface RegisterFormProps {
    formData: {
        firstName: string;
        lastName: string;
        email: string;
        username: string;
        password: string;
        role: string;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (values: any) => Promise<void>;
    loading: boolean;
    error: ApolloError | undefined;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
    formData,
    handleChange,
    handleSubmit,
    loading,
    error
}) => {

    const onFinish = (values: any) => {
        handleSubmit(values);
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Content className='flex justify-center items-center bg-gradient-to-r from-purple-100 to-purple-300 transition-colors duration-500'
            >
                <Card className='border shadow-md w-100'>
                    <h1 className='text-center mb-8'>Join Us</h1>
                    <Form name='register' initialValues={formData} onFinish={handleSubmit} layout='vertical'>
                        <div className='flex justify-between space-x-4'>
                            <Form.Item name='firstName' label='First Name'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter your first name!'
                                    }
                                ]}>
                                <Input
                                    name='firstName'
                                    onChange={handleChange}
                                    placeholder='First Name'
                                    prefix={<UserOutlined />}
                                />
                            </Form.Item>
                            <Form.Item name='lastName' label='Last Name'
                                rules={[{ required: true, message:'Please enter your last name' }]}>
                                <Input
                                    name='lastName'
                                    onChange={handleChange}
                                    placeholder='Last Name'
                                    prefix={<UserOutlined />}
                                />
                            </Form.Item>
                        </div>
                        <div className='flex justify-between space-x-4'>
                            <Form.Item name='username' label='Username'
                                rules={[{ required: true, message: 'Please enter the username' }]}>
                                <Input
                                    name='username'
                                    onChange={handleChange}
                                    placeholder='Username'
                                    prefix={<UserOutlined />}
                                />
                            </Form.Item>
                            <Form.Item name='email' label='Email Address'
                                rules={[{ required: true, message: 'Please enter your email address' }]}>
                                <Input
                                    name='email'
                                    placeholder='Email Address'
                                    prefix={<MailOutlined />}
                                    onChange={handleChange}
                                />
                            </Form.Item>
                        </div>
                        <Form.Item name='password' label='Password'
                            rules={[{ required: true, message: 'Please enter your password' }]}>
                            <Input.Password
                                name='password'
                                placeholder='Password'
                                prefix={<LockOutlined />}
                                onChange={handleChange}
                            />
                        </Form.Item>
                        <Input type='hidden' name='role' value='user' />
                        <Form.Item>
                            <Button type='primary' htmlType='submit' block loading={loading}>
                                {loading ? 'Registering...' : 'Register'}
                            </Button>
                        </Form.Item>
                        {error && <Alert message={error.message} type='error' showIcon />}
                        <p style={{ textAlign: 'center' }}>
                            Already a member? <Link href='/auth/login'>Login Now</Link>
                        </p>
                    </Form>

                </Card>

            </Content>
        </Layout>
    );
}

export default RegisterForm;
