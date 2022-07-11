import { useState } from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithLayout } from '../shared/render-test';

import Form from './Form';

const TestForm = () => {
  const [form, setForm] = useState({
    name: "",
    description: ""
  })

  return (
    <Form
      name={form.name}
      description={form.description}
      btnText="Save"
      onSubmit={jest.fn()}
      onChange={(key, value) => setForm({ ...form, [key]: value })}
    />
  )
}

describe("Testing Form component", () => {

  test(">> Render Form", () => {
    renderWithLayout(<TestForm />);
    const btn = screen.getByText("Save")
    expect(btn).toBeDefined();
  });

  test(">> Test Inputs", () => {
    renderWithLayout(<TestForm />);

    const [name, description] = screen.getAllByRole("textbox")

    userEvent.type(name, "Honda")
    userEvent.type(description, "Info")

    expect(screen.getByText("Honda")).toBeDefined();
    expect(screen.getByText("Info")).toBeDefined();
  })
})
