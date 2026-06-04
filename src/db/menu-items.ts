export interface MenuItem {
  id: number
  title: string
  description: string
  price: number
  image: string
  category: string
}

const menuItems: MenuItem[] = [
  { id: 1, title: "Edamame", description: "Soybeans, steamed tender right in their pods and finished with a light, savory sprinkle of sea salt.", price: 6.99, image: "https://images.unsplash.com/photo-1730596140741-6cc4963ad816?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1000&h=700&crop=center", category: "Appetizers" },
  { id: 2, title: "Gyoza", description: "Pan-fried pork and vegetable dumplings served with a soy-vinegar dipping sauce.", price: 8.00, image: "https://images.unsplash.com/photo-1588182728399-e8f2df121744?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1000&h=700&crop=center", category: "Appetizers" },
  { id: 3, title: "Agedashi Tofu", description: "Lightly fried tofu cubes served in a warm, savory dashi broth with green onions.", price: 8.50, image: "https://images.unsplash.com/photo-1706468238718-bba7e9b63ad2?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1000&h=700&crop=center", category: "Appetizers" },
  { id: 4, title: "Seaweed Salad", description: "Chilled and seasoned mixed seaweed with sesame seeds and a light vinegar dressing.", price: 7.00, image: "https://images.unsplash.com/photo-1561466273-c13f88329aa0?q=80&auto=format&fit=crop&w=1000&h=700&mask=corners&corner-radius=25&crop=center", category: "Appetizers" },
  { id: 5, title: "Chicken Karaage", description: "Bite-sized, soy-marinated chicken, lightly battered and fried to a crispy golden brown.", price: 7.50, image: "https://images.unsplash.com/photo-1705359573945-bcf2d0b70b0b?q=80&w=1000&h=700&crop=center&fit=crop", category: "Appetizers" },
  { id: 6, title: "Takoyaki", description: "Fried octopus-filled batter balls (5 pieces), drizzled with savory sauce, mayo, and bonito flakes.", price: 9.00, image: "https://images.unsplash.com/photo-1751094364516-02b351f9c277?q=80&w=1000&h=700&crop=center&fit=crop", category: "Appetizers" },
]

export async function getMenuItems(): Promise<MenuItem[]> {
  return menuItems
}

export async function getMenuItemsByCategory(category: string): Promise<MenuItem[]> {
  return menuItems.filter(i => i.category === category)
}
