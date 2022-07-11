import { screen } from '@testing-library/react';
import { renderWithLayout } from '../shared/render-test';
import userEvent from '@testing-library/user-event';

import Bike from './Bike';

describe("Testing Bike component", () => {
  let bike = {
    name: "Honda Bros 400",
    description: "Test Honda",
    id: 1
  }

  test(">> Render Bike", () => {
    renderWithLayout(<Bike bike={bike} />);
    const info = screen.getAllByText(/Honda/i);
    expect(info.length).toBe(2);
  });

  test(">> Loading Bike", () => {
    const { container } = renderWithLayout(<Bike loading />);
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.getElementsByClassName('ant-skeleton').length).toBe(1);
  })

  test(">> Open Delete Bike Modal", () => {
    renderWithLayout(<Bike bike={bike} />);
    const buttons = screen.getAllByRole('img');
    const btn = buttons[buttons.length - 1];
    userEvent.click(btn);

    const info = screen.getAllByText(/Are you sure?/i);
    expect(info.length).toBeGreaterThan(0)

    // Cancel Deleting Bike (Close modal)
    const cancel = screen.getByText("Cancel");
    // eslint-disable-next-line testing-library/no-node-access
    userEvent.click(cancel.parentElement as Element)
    expect(screen.getByText(/Are you sure?/i)).not.toBeVisible()

  })

  test(">> Open Bike details", () => {
    renderWithLayout(<Bike bike={bike} isHoverable />);
    const [title] = screen.getAllByText(/Honda/i);
   
    userEvent.click(title);

    expect(window.location.pathname).toBe(`/${bike.id}`)
  })

  test(">> Open Bike edit page", () => {
    renderWithLayout(<Bike bike={bike} />);
    const buttons = screen.getAllByRole('img');
    const btn = buttons[buttons.length - 2];
    userEvent.click(btn);

    expect(window.location.pathname).toBe(`/edit/${bike.id}`)
  })
})
