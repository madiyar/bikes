import { FC, useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Card, Modal } from 'antd';

import { EditOutlined, DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';

import { deleteBike, IBike } from '../shared/bike.slice';
import { CartContext } from '../shared/cart.context';
import { useAppDispatch } from '../shared/store';

interface Props {
  bike?: IBike,
  loading?: boolean,
  actions?: any[],
  isHoverable?: boolean
}

const Bike: FC<Props> = ({ loading, bike, isHoverable, actions }) => {
  const navigate = useNavigate();
  const { items, addItem, deleteItem } = useContext<any>(CartContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const isInCart = useMemo(() => items.some((item: number) => item === bike?.id), [items, bike]);

  const handleDelete = () => {
    setIsOpen(false);
    deleteItem(bike?.id);
    dispatch(deleteBike(bike?.id))
  };

  return (
    <>
      <Card
        style={{
          marginTop: 24,
        }}
        loading={loading}
        hoverable={isHoverable}
        actions={actions || [
          ...(!isInCart ? [<PlusCircleOutlined key="cart" onClick={() => addItem(bike?.id)} />] : []),
          <EditOutlined key="edit" onClick={() => navigate(`/edit/${bike?.id}`)} />,
          <DeleteOutlined key="delete" onClick={() => setIsOpen(true)} />,
        ]}
      >
        <div onClick={() => isHoverable && navigate(`/${bike?.id}`)}>
          <Card.Meta
            avatar={<Avatar size={100} shape="square" src={`https://picsum.photos/seed/${bike?.name}/100/100`} />}
            title={bike?.name}
            description={bike?.description}
          />
        </div>
      </Card>
      <Modal
        title={`Deleting "${bike?.name}"`}
        visible={isOpen}
        onOk={handleDelete}
        onCancel={() => setIsOpen(false)}
      >
        <p>Are you sure?</p>
      </Modal>
    </>
  );
};

export default Bike;
