import { Button, Input, Space } from 'antd';
import { FC } from 'react';
import { Navigation } from "../components";

interface Props {
  name?: string,
  description?: string,
  btnText: string,
  onSubmit: () => void,
  onChange: (key: string, value: string) => void
}

const Form: FC<Props> = ({ name, description, btnText, onChange, onSubmit }) => (
  <Space direction="vertical" size="large" style={{ display: 'flex' }}>
    <Navigation label={name || ""} />
    <Input placeholder="Name" value={name} onChange={e => onChange("name", e.target.value)} />
    <Input.TextArea placeholder="Description" value={description} onChange={e => onChange("description", e.target.value)} />
    <Button type="primary" size="large" onClick={onSubmit}>{btnText}</Button>
  </Space>
)

export default Form