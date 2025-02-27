import { useState } from 'react';
import Table from 'antd/lib/table';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Space from 'antd/lib/space';
import Card from 'antd/lib/card';
import Layout from 'antd/lib/layout';
import Menu from 'antd/lib/menu';
import Popconfirm from 'antd/lib/popconfirm';
import message from 'antd/lib/message';
import Tag from 'antd/lib/tag';
import Statistic from 'antd/lib/statistic';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import EditOutlined from '@ant-design/icons/EditOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import DashboardOutlined from '@ant-design/icons/DashboardOutlined';
import ShoppingOutlined from '@ant-design/icons/ShoppingOutlined';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { GET_PRODUCTS, DELETE_PRODUCT } from '@/app/services/product';
import { useMutation } from '@apollo/client';
import { createApolloClient } from "../../src/app/services/client";
import { AuthContext } from '@/app/context/authContext';
import { useContext } from 'react';
import Result from 'antd/lib/result';
const { Header, Content, Sider } = Layout;

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  quantity: number;
  image: string;
}

interface AllProductsProps {
  products: Product[];
}

const AllProducts = ({ products: initialProducts }: AllProductsProps) => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const {role} = useContext(AuthContext);
  const [deleteProduct] = useMutation(DELETE_PRODUCT);
  // Calculate statistics
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  const lowStock = products.filter(product => product.quantity < 10).length;

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleDelete = async (productId: string) => {
    try {
      // Implement your delete mutation here
      await deleteProduct({ variables: { id: productId } });
      message.success('Product deleted successfully');
      setProducts(products.filter(p => p.id !== productId));
    } catch (error) {
      message.error('Failed to delete product');
    }
  };

  const columns = [
    {
      title: 'Product',
      dataIndex: 'name',
      width: '25%',
      render: (text: string, record: Product) => (
        <Space>
          {record.image && (
            <img 
              src={record.image} 
              alt={text} 
              style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 4 }}
            />
          )}
          <div>
            <div className="font-medium">{text}</div>
            <div className="text-xs text-gray-500">{record.description}</div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      width: '15%',
      render: (price: number) => (
        <Tag color="blue">${price.toFixed(2)}</Tag>
      ),
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      width: '15%',
      render: (quantity: number) => (
        <Tag color={quantity < 10 ? 'red' : quantity < 50 ? 'orange' : 'green'}>
          {quantity} in stock
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: '20%',
      render: (_: any, record: Product) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => router.push(`/admin/products/edit/${record.id}`)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this product?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (role !== "admin") {
    return <Result
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Button type="primary" onClick={() => router.push('/')}>
        Back Home
      </Button>
    }
  />
  }

  return (
    <Layout style={{ minHeight: '100vh' }} className="bg-standard">
      <Sider width={200} theme="light">
        <div className="p-4">
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={['products']}
          style={{ height: '100%' }}
        >
          <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="products" icon={<ShoppingOutlined />}>
            Products
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: '0 24px' }}>
          <h2 className="text-2xl font-bold">Products Management</h2>
        </Header>
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
          {/* Statistics Cards */}
          <Row gutter={16} className="mb-6">
            <Col span={8}>
              <Card>
                <Statistic
                  title="Total Products"
                  value={totalProducts}
                  prefix={<ShoppingOutlined />}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  title="Total Inventory Value"
                  value={totalValue}
                  precision={2}
                  prefix="$"
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  title="Low Stock Items"
                  value={lowStock}
                  valueStyle={{ color: lowStock > 0 ? '#cf1322' : '#3f8600' }}
                />
              </Card>
            </Col>
          </Row>

          {/* Actions Bar */}
          <div className="mb-6 flex justify-between items-center">
            <Input
              placeholder="Search products..."
              prefix={<SearchOutlined />}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 300 }}
            />
            <Button
              type="primary"
              size="large"
              onClick={() => router.push('/admin/addProducts')}
            >
              Add New Product
            </Button>
          </div>

          {/* Products Table */}
          <Table
            columns={columns}
            dataSource={filteredProducts}
            rowKey="id"
            loading={loading}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} items`,
            }}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AllProducts;

export const getServerSideProps: GetServerSideProps = async () => {
  const client = createApolloClient();
  const { data } = await client.query({ query: GET_PRODUCTS });
  
  return {
    props: {
      products: data.getProducts,
    },
  };
};
  