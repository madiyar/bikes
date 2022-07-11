import { useNavigate } from 'react-router-dom';
import { Button, Space } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

import Cart from './Cart';

const Header = () => {
  const navigate = useNavigate();

  return (
    <Space style={{ marginBottom: 24 }}>
      <Button
        type="primary"
        shape="round"
        icon={<PlusCircleOutlined />}
        size="large"
        onClick={() => navigate('create')}
      >
        Add Bike
      </Button>
      <Cart />
    </Space>
  )
}

export default Header