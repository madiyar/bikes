import React, { FC, ReactElement, useState } from 'react';

export const CartContext = React.createContext({});

const CartProvider: FC<{ children: ReactElement }> = ({ children }) => {
  const [items, setItems] = useState<number[]>(JSON.parse(localStorage.getItem('bike-cart') || "[]"))

  const addItem = (id: number) => {
    const set = items.find(item => item === id) ? items : [...items, id]
    localStorage.setItem('bike-cart', JSON.stringify(set))
    setItems(set)
  };

  const deleteItem = (id: number) => {
    const set = items.filter(item => item !== id);
    localStorage.setItem('bike-cart', JSON.stringify(set))
    setItems(set)
  };

  return (
    <CartContext.Provider value={{ items, addItem, deleteItem }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider;
