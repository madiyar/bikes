import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithLayout } from '../shared/render-test';

import Header from './Header';

describe("Testing Header component", () => {
  test(">> Render Header", () => {
    renderWithLayout(<Header />);
    const btn = screen.getByText("Add Bike")
    userEvent.click(btn)
    expect(window.location.pathname).toBe("/create");
  });
})
