import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form } from "../components";

import { getBike, http } from "../shared/bike.slice";
import { useAppDispatch, useAppSelector } from "../shared/store";

const Edit = () => {
  const { id } = useParams();
  const { bike } = useAppSelector(state => state.bike);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: bike?.name || "",
    description: bike?.description || ""
  })

  useEffect(() => {
    !bike && dispatch(getBike(id))
  }, [id, dispatch, bike]);

  return (
    <Form
      name={form.name || bike?.name}
      description={form.description || bike?.description}
      btnText="Save"
      onChange={(key, value) => setForm({ ...form, [key]: value })}
      onSubmit={() => {
        http.put(`/${id}`, form).then(() => navigate(`/${id}`))
      }}
    />
  );
};

export default Edit