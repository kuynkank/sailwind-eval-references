export interface OrderItem {
  id: number
  menuItemId: number
  title: string
  price: number
  quantity: number
  image: string
}

export interface Order {
  id: number
  orderNumber: string
  type: string
  items: OrderItem[]
  discount: number
  tip: number
  taxRate: number
}

const orders: Order[] = [
  {
    id: 1,
    orderNumber: "12138",
    type: "Dine In",
    items: [
      { id: 1, menuItemId: 1, title: "Edamame", price: 6.99, quantity: 1, image: "https://images.unsplash.com/photo-1730596140741-6cc4963ad816?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1000&h=700&crop=center" },
      { id: 2, menuItemId: 3, title: "Agedashi Tofu", price: 8.50, quantity: 2, image: "https://images.unsplash.com/photo-1706468238718-bba7e9b63ad2?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1000&h=700&crop=center" },
    ],
    discount: 0.05,
    tip: 5.00,
    taxRate: 0.07,
  }
]

export async function getOrder(id: number): Promise<Order | undefined> {
  return orders.find(o => o.id === id)
}
