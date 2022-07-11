import { screen } from '@testing-library/react';
import { renderWithLayout } from '../shared/render-test';

import Navigation from './Navigation';

describe("Testing Navigation component", () => {
  test(">> Render Navigation", () => {
    renderWithLayout(<Navigation label="Honda" />);
    const info = screen.getAllByText(/Honda/i);
    expect(info.length).toBe(1);
  });
})
