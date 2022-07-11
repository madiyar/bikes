import { useContext, useMemo, useState } from 'react';
import { Badge, Button, Drawer } from 'antd';
import { ShoppingCartOutlined, DeleteOutlined } from '@ant-design/icons';

import Bike from './Bike';
import { CartContext } from '../shared/cart.context';
import { fetchBikes, IBike } from '../shared/bike.slice';
import { useAppDispatch, useAppSelector } from '../shared/store';

const Cart = () => {
  const [visible, setVisible] = useState(false);
  const { items, deleteItem } = useContext<any>(CartContext);
  const { data, loading } = useAppSelector(state => state.bike);
  const dispatch = useAppDispatch();

  const list = useMemo(() => {
    return items.map((item: number) => data.find(bike => bike.id === item));
  }, [items, data]);

  const handleOpen = () => {
    !data.length && dispatch(fetchBikes())
    setVisible(true)
  }

  return (
    <>
      <Badge count={(items as any[]).length}>
        <Button
          type="primary"
          shape="round"
          icon={<ShoppingCartOutlined />}
          size="large"
          onClick={handleOpen}
          disabled={loading}
        >
          Cart
        </Button>
      </Badge>
      <Drawer title="Cart" placement="right" onClose={() => setVisible(false)} visible={visible}>
        {list.map((item: IBike) => (
          <Bike
            bike={item}
            actions={[
              <DeleteOutlined key="delete" onClick={() => deleteItem(item.id)} />,
            ]}
          />
        ))}
        {!items.length && "Empty cart"}
      </Drawer>
    </>
  );
};

export default Cart;