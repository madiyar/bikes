import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "../components";
import { http } from "../shared/bike.slice";

const Create = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: ""
  })

  return (
    <Form
      name={form.name}
      description={form.description}
      btnText="Add new bike"
      onChange={(key, value) => setForm({ ...form, [key]: value })}
      onSubmit={() => {
        http.post('', form).then(() => navigate(`/`))
      }}
    />
  );
};

export default Create