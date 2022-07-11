import { ReactElement } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';

import bikeSlice from './bike.slice';
import CartProvider from './cart.context';

const mockStore = configureStore({
  reducer: {
    bike: bikeSlice
  }
});

export const renderWithLayout = (component: ReactElement) => render(
  <Router>
    <Provider store={mockStore}>
      <CartProvider>
        {component}
      </CartProvider>
    </Provider>
  </Router>
);
