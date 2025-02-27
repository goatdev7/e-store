import { useState, useContext } from 'react';
import { AuthContext } from "@/app/context/authContext";
import { useMutation } from "@apollo/client";
import { ADD_PRODUCT } from "@/app/services/product";
import { useRouter } from "next/router";
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import InputNumber from 'antd/lib/input-number';
import Button from 'antd/lib/button';
import Upload from 'antd/lib/upload';
import message from 'antd/lib/message';
import Layout from 'antd/lib/layout';
import Card from 'antd/lib/card';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Divider from 'antd/lib/divider';
import Steps from 'antd/lib/steps';
import Result from 'antd/lib/result';
import TextArea from 'antd/lib/input/TextArea';
import DollarOutlined from '@ant-design/icons/DollarOutlined';
import InboxOutlined from '@ant-design/icons/InboxOutlined';
import ShoppingOutlined from '@ant-design/icons/ShoppingOutlined';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';

const { Content } = Layout;
const { Step } = Steps;

export default function AddProduct() {
    const router = useRouter();
    const { token, role } = useContext(AuthContext);
    const [form] = Form.useForm();
    const [formData, setFormData] = useState({});
    const [currentStep, setCurrentStep] = useState(0);
    const [imageUrl, setImageUrl] = useState<string>('');
    const [uploading, setUploading] = useState(false);
    const [addProduct, { loading }] = useMutation(ADD_PRODUCT);

    if (role !== "admin") {
        return (
            <Result
                status="403"
                title="403"
                subTitle="Sorry, you are not authorized to access this page."
                extra={
                    <Button type="primary" onClick={() => router.push('/')}>
                        Back Home
                    </Button>
                }
            />
        );
    }

    const handleImageUpload = async (options: any) => {
        const { file, onSuccess, onError } = options;
        const uploadData = new FormData();
        uploadData.append("file", file);

        try {
            setUploading(true);
            const res = await fetch("/api/upload", {
                method: "POST",
                body: uploadData,
            });
            const data = await res.json();
            setImageUrl(data.url);
            onSuccess("Ok");
            message.success('Image uploaded successfully');
        } catch (err) {
            onError({ err });
            message.error('Image upload failed');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async () => {
        try {
            const values: any = {
                ...formData,
            };
            console.log('Form instance values:', values);

            // Check if we have all required fields
            if (!imageUrl) {
                message.error('Please upload a product image');
                return;
            }


            if (!values.name || !values.description ||
                values.price === undefined || values.quantity === undefined) {
                message.error('Please fill in all required fields');
                console.log('Please fill in all required fields');
                return;
            }

            // Prepare the product data
            const productData = {
                name: String(values.name),
                description: String(values.description),
                price: parseFloat(values.price),
                quantity: parseInt(values.quantity),
                imageUrl: imageUrl
            };


            const result = await addProduct({
                variables: {
                    product: productData
                },
                context: {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                },
            });


            message.success('Product added successfully');
            setCurrentStep(3); // Move to success step
        } catch (err) {
            console.error('Error adding product:', err);
            message.error('Failed to add product: ' + (err as Error).message);
        }
    };

    const steps = [
        {
            title: 'Basic Info',
            content: (
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="name"
                            label="Product Name"
                            rules={[{ required: true, message: 'Please enter product name' }]}
                        >
                            <Input placeholder="Enter product name" />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            name="description"
                            label="Description"
                            rules={[{ required: true, message: 'Please enter product description' }]}
                        >
                            <TextArea rows={4} placeholder="Enter product description" />
                        </Form.Item>
                    </Col>
                </Row>
            ),
            icon: <ShoppingOutlined />
        },
        {
            title: 'Pricing & Stock',
            content: (
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="price"
                            label="Price"
                            rules={[{ required: true, message: 'Please enter price' }]}
                        >
                            <InputNumber
                                prefix={<DollarOutlined />}
                                min={0}
                                step={0.01}
                                style={{ width: '100%' }}
                                placeholder="0.00"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="quantity"
                            label="Quantity in Stock"
                            rules={[{ required: true, message: 'Please enter quantity' }]}
                        >
                            <InputNumber
                                min={0}
                                style={{ width: '100%' }}
                                placeholder="0"
                            />
                        </Form.Item>
                    </Col>
                </Row>
            ),
            icon: <DollarOutlined />
        },
        {
            title: 'Image',
            content: (
                <Form.Item
                    label="Product Image"
                    required
                    extra="Upload a high-quality image of your product"
                >
                    <Upload.Dragger
                        name="file"
                        customRequest={handleImageUpload}
                        showUploadList={false}
                        accept="image/*"
                    >
                        {imageUrl ? (
                            <div style={{ padding: '20px' }}>
                                <img
                                    src={imageUrl}
                                    alt="product"
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: 200,
                                        objectFit: 'contain'
                                    }}
                                />
                            </div>
                        ) : (
                            <>
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                <p className="ant-upload-hint">
                                    Support for a single image upload. Please ensure image is clear and representative of the product.
                                </p>
                            </>
                        )}
                    </Upload.Dragger>
                </Form.Item>
            ),
            icon: <InboxOutlined />
        }
    ];

    const next = async () => {
        try {
            // Validate only the fields in the current step
            const currentFields = currentStep === 0
                ? ['name', 'description']
                : currentStep === 1
                    ? ['price', 'quantity']
                    : [];

            // Validate and store the values for the current step
            await form.validateFields(currentFields);
            const stepValues = form.getFieldsValue(currentFields);

            setFormData(prev => ({
                ...prev,
                ...stepValues
            }));

            console.log(`Step ${currentStep} values:`, stepValues); // Debug log

            setCurrentStep(currentStep + 1);
        } catch (err) {
            console.error('Validation error:', err);
            message.error('Please fill in all required fields for this step');
        }
    };

    const prev = () => {
        setCurrentStep(currentStep - 1);
    };

    return (
        <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
            <Content style={{ padding: '50px' }}>
                <Card>
                    <Steps current={currentStep} style={{ marginBottom: 40 }}>
                        {steps.map(item => (
                            <Step key={item.title} title={item.title} icon={item.icon} />
                        ))}
                        <Step title="Done" icon={<CheckCircleOutlined />} />
                    </Steps>

                    {currentStep === 3 ? (
                        <Result
                            status="success"
                            title="Product Added Successfully!"
                            extra={[
                                <Button
                                    type="primary"
                                    key="products"
                                    onClick={() => router.push('/admin/products')}
                                >
                                    View All Products
                                </Button>,
                                <Button
                                    key="add"
                                    onClick={() => {
                                        form.resetFields();
                                        setImageUrl('');
                                        setCurrentStep(0);
                                    }}
                                >
                                    Add Another Product
                                </Button>,
                            ]}
                        />
                    ) : (
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={handleSubmit}
                        >
                            <div style={{ minHeight: 200 }}>
                                {steps[currentStep].content}
                            </div>
                            <Divider />
                            <div style={{ textAlign: 'right' }}>
                                {currentStep > 0 && (
                                    <Button style={{ marginRight: 8 }} onClick={prev}>
                                        Previous
                                    </Button>
                                )}
                                {currentStep < steps.length - 1 && (
                                    <Button type="primary" onClick={next}>
                                        Next
                                    </Button>
                                )}
                                {currentStep === steps.length - 1 && (
                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            form.submit();
                                        }}
                                        loading={loading}
                                    >
                                        Submit
                                    </Button>
                                )}
                            </div>
                        </Form>
                    )}
                </Card>
            </Content>
        </Layout>
    );
}