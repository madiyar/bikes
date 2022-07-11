import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';

const Navigation: FC<{ label: string }> = ({ label }) => (
  <Breadcrumb>
    <Breadcrumb.Item>
      <Link to="/">Home</Link>
    </Breadcrumb.Item>
    <Breadcrumb.Item>
      {label}
    </Breadcrumb.Item>
  </Breadcrumb>
)

export default Navigation