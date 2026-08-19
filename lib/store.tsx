import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type OrderStatus = 'New' | 'Accepted' | 'Cooking' | 'Almost ready' | 'Ready' | 'Delivered';
export type StaffMode = 'Customer' | 'Manager' | 'Chef';
export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: any;
  badge?: string;
  available: boolean;
};
export type CartLine = MenuItem & { quantity: number };
export type Order = {
  id: string;
  table: string;
  items: CartLine[];
  status: OrderStatus;
  createdAt: string;
  payment: 'Cash' | 'UPI';
  total: number;
};

const menu: MenuItem[] = [
  { id: 'chai', name: 'Masala Chai', description: 'Slow-brewed tea with cardamom, ginger and clove.', price: 89, category: 'Drinks', image: require('@/assets/images/masala-chai.jpg'), badge: 'Best seller', available: true },
  { id: 'sandwich', name: 'Grilled Veg Sandwich', description: 'Toasted sourdough, peppers, tomato and house chutney.', price: 219, category: 'Cafe bites', image: require('@/assets/images/grilled-sandwich.jpg'), badge: 'Chef special', available: true },
  { id: 'fries', name: 'Peri Peri Loaded Fries', description: 'Crispy fries, peri peri seasoning, cheese sauce and herbs.', price: 179, category: 'Cafe bites', image: require('@/assets/images/peri-peri-fries.jpg'), badge: 'Popular', available: true },
  { id: 'paneer', name: 'Smoky Paneer Tikka', description: 'Charred paneer, peppers and mint yogurt.', price: 289, category: 'Mains', available: true },
  { id: 'pasta', name: 'Creamy Tomato Pasta', description: 'Rigatoni in a roasted tomato cream sauce.', price: 249, category: 'Mains', available: true },
  { id: 'lemonade', name: 'Fresh Lime Soda', description: 'Chilled lime, soda and a pinch of black salt.', price: 99, category: 'Drinks', available: true },
];

type Store = {
  table: string;
  menu: MenuItem[];
  cart: CartLine[];
  orders: Order[];
  mode: StaffMode;
  serviceFeeRate: number;
  hydrated: boolean;
  addToCart: (item: MenuItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  placeOrder: (payment: 'Cash' | 'UPI') => void;
  advanceOrder: (id: string) => void;
  setMode: (mode: StaffMode) => void;
  clearTable: () => void;
  toggleAvailability: (id: string) => void;
};

const StoreContext = createContext<Store | null>(null);
const STORAGE_KEY = 'sip-n-bite-demo-v1';

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [mode, setMode] = useState<StaffMode>('Customer');
  const [menuItems, setMenuItems] = useState<MenuItem[]>(menu);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (raw) {
        const saved = JSON.parse(raw) as Partial<Pick<Store, 'cart' | 'orders' | 'menu'>>;
        setCart(saved.cart ?? []);
        setOrders(saved.orders ?? []);
        setMenuItems(saved.menu ?? menu);
      }
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (hydrated) AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ cart, orders, menu: menuItems }));
  }, [cart, orders, menuItems, hydrated]);

  const value = useMemo<Store>(() => ({
    table: 'Table 04',
    menu: menuItems,
    cart,
    orders,
    mode,
    serviceFeeRate: 0.02,
    hydrated,
    addToCart: (item) => setCart((current) => {
      const existing = current.find((line) => line.id === item.id);
      if (existing) return current.map((line) => line.id === item.id ? { ...line, quantity: line.quantity + 1 } : line);
      return [...current, { ...item, quantity: 1 }];
    }),
    updateQuantity: (id, quantity) => setCart((current) => quantity <= 0 ? current.filter((line) => line.id !== id) : current.map((line) => line.id === id ? { ...line, quantity } : line)),
    placeOrder: (payment) => {
      if (!cart.length) return;
      const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      setOrders((current) => [{ id: `SNB-${String(current.length + 18).padStart(3, '0')}`, table: 'Table 04', items: cart, status: 'New', createdAt: 'Just now', payment, total: Math.round(subtotal * 1.02) }, ...current]);
      setCart([]);
    },
    advanceOrder: (id) => setOrders((current) => current.map((order) => {
      if (order.id !== id) return order;
      const next: Record<OrderStatus, OrderStatus> = { New: 'Accepted', Accepted: 'Cooking', Cooking: 'Almost ready', 'Almost ready': 'Ready', Ready: 'Delivered', Delivered: 'Delivered' };
      return { ...order, status: next[order.status] };
    })),
    setMode,
    clearTable: () => { setOrders([]); setCart([]); },
    toggleAvailability: (id) => setMenuItems((current) => current.map((item) => item.id === id ? { ...item, available: !item.available } : item)),
  }), [cart, hydrated, menuItems, mode, orders]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const value = useContext(StoreContext);
  if (!value) throw new Error('useStore must be used inside StoreProvider');
  return value;
}