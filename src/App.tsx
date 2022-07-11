import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { Header } from './components';
import CartProvider from './shared/cart.context';

const App = () => (
  <CartProvider>
    <Layout
      style={{
        display: "block",
        height: "100vh",
        overflowY: "scroll"
      }}
    >
      <Layout.Content
        style={{
          maxWidth: 800,
          margin: "32px auto",
        }}
      >
        <Header />
        <Outlet />
      </Layout.Content>
    </Layout>
  </CartProvider>
);

export default App;