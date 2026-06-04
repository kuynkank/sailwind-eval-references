import { useState, useEffect } from 'react'
import {
  HeadingField,
  RichTextDisplayField,
  TextItem,
  CardLayout,
  TagField,
  ButtonArrayLayout,
  ButtonToggle,
  TabsField,
  paletteColorMap,
} from '@pglevy/sailwind'
import { getMenuItems, type MenuItem } from '../db/menu-items'
import { getOrder, type Order } from '../db/orders'

function MenuCard({ item }: { item: MenuItem }) {
  return (
    <CardLayout showShadow={true} showBorder={false} padding="STANDARD" shape="ROUNDED">
      <img src={item.image} alt={item.title} className="w-full h-40 object-cover rounded-lg mb-2" />
      <HeadingField text={item.title} size="MEDIUM" fontWeight="SEMI_BOLD" marginBelow="EVEN_LESS" />
      <RichTextDisplayField labelPosition="COLLAPSED" value={[<TextItem key="d" text={item.description} />]} marginBelow="EVEN_LESS" />
      <div className="flex items-center justify-between mt-2">
        <RichTextDisplayField labelPosition="COLLAPSED" value={[<TextItem key="p" text={`$${item.price.toFixed(2)}`} size="MEDIUM_PLUS" />]} marginBelow="NONE" />
        <ButtonArrayLayout buttons={[{ icon: "plus", style: "OUTLINE", color: "GREEN_600", className: "!rounded-full" }]} marginBelow="NONE" />
      </div>
    </CardLayout>
  )
}

function OrderPanel({ order }: { order: Order }) {
  const [selectedTag, setSelectedTag] = useState("Dine In")
  const tags = ["Dine In", "To Go", "Delivery"]

  const subtotal = order.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const discountAmount = subtotal * order.discount
  const tax = (subtotal - discountAmount) * order.taxRate
  const total = subtotal - discountAmount + order.tip + tax

  return (
    <div className="flex flex-col h-full">
      <div>
        <HeadingField text={`Order #${order.orderNumber}`} size="MEDIUM" fontWeight="SEMI_BOLD" marginBelow="STANDARD" />
        <div className="flex gap-2 mb-2">
          {tags.map(t => (
            <ButtonToggle key={t} text={t} value={selectedTag === t} color="GREEN_600" style="OUTLINE" size="SMALL" onChange={() => setSelectedTag(t)} />
          ))}
        </div>

        {/* Column headers */}
        <div className="flex">
          <div className="flex-1">
            <RichTextDisplayField labelPosition="COLLAPSED" value={[<TextItem key="h" text="Item" />]} marginBelow="NONE" />
          </div>
          <div className="w-20 text-right">
            <RichTextDisplayField labelPosition="COLLAPSED" value={[<TextItem key="h" text="Quantity" />]} align="RIGHT" marginBelow="NONE" />
          </div>
          <div className="w-20 text-right">
            <RichTextDisplayField labelPosition="COLLAPSED" value={[<TextItem key="h" text="Price" />]} align="RIGHT" marginBelow="NONE" />
          </div>
        </div>

        <hr className={`border-t ${paletteColorMap.GRAY_200.border} mt-2 mb-0`} />

        {/* Order items */}
        <div className="overflow-y-auto" style={{ maxHeight: '280px' }}>
          {order.items.map(item => (
            <div key={item.id} className="flex items-center py-3">
              <div className="flex-1 flex items-center gap-3">
                <img src={item.image} alt={item.title} className="w-12 h-12 rounded-full object-cover" />
                <div className="leading-tight">
                  <HeadingField text={item.title} size="MEDIUM" marginBelow="NONE" />
                  <RichTextDisplayField labelPosition="COLLAPSED" value={[<TextItem key="p" text={`$${item.price.toFixed(2)}`} />]} marginBelow="NONE" />
                </div>
              </div>
              <div className="w-20 text-right">
                <RichTextDisplayField labelPosition="COLLAPSED" value={[<TextItem key="q" text={String(item.quantity)} size="MEDIUM" />]} align="RIGHT" />
              </div>
              <div className="w-20 text-right">
                <RichTextDisplayField labelPosition="COLLAPSED" value={[<TextItem key="t" text={`$${(item.price * item.quantity).toFixed(2)}`} size="MEDIUM" />]} align="RIGHT" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary anchored to bottom */}
      <div className="mt-auto pt-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <RichTextDisplayField labelPosition="COLLAPSED" value={[<TextItem key="l" text="Sub total" size="MEDIUM" />]} marginBelow="NONE" />
            <RichTextDisplayField labelPosition="COLLAPSED" value={[<TextItem key="v" text={`$${subtotal.toFixed(2)}`} size="MEDIUM" />]} align="RIGHT" marginBelow="NONE" />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <RichTextDisplayField labelPosition="COLLAPSED" value={[<TextItem key="l" text="Discount" size="MEDIUM" />]} marginBelow="NONE" />
              <TagField tags={[{ text: "5% off", backgroundColor: "GREEN_100", textColor: "GREEN_700" }]} marginBelow="NONE" />
            </div>
            <RichTextDisplayField labelPosition="COLLAPSED" value={[<TextItem key="v" text={`-$${discountAmount.toFixed(2)}`} size="MEDIUM" />]} align="RIGHT" marginBelow="NONE" />
          </div>
          <div className="flex justify-between items-center">
            <RichTextDisplayField labelPosition="COLLAPSED" value={[<TextItem key="l" text="Tip" size="MEDIUM" />]} marginBelow="NONE" />
            <RichTextDisplayField labelPosition="COLLAPSED" value={[<TextItem key="v" text={`$${order.tip.toFixed(2)}`} size="MEDIUM" />]} align="RIGHT" marginBelow="NONE" />
          </div>
          <div className="flex justify-between items-center">
            <RichTextDisplayField labelPosition="COLLAPSED" value={[<TextItem key="l" text="Tax" size="MEDIUM" />]} marginBelow="NONE" />
            <RichTextDisplayField labelPosition="COLLAPSED" value={[<TextItem key="v" text={`$${tax.toFixed(2)}`} size="MEDIUM" />]} align="RIGHT" marginBelow="NONE" />
          </div>
        </div>

        <hr className={`border-t ${paletteColorMap.GRAY_200.border} my-3`} />

        <div className="flex justify-between mt-3">
          <RichTextDisplayField labelPosition="COLLAPSED" value={[<TextItem key="l" text="Total" size="MEDIUM_PLUS" style="STRONG" />]} />
          <RichTextDisplayField labelPosition="COLLAPSED" value={[<TextItem key="v" text={`$${total.toFixed(2)}`} size="MEDIUM_PLUS" style="STRONG" />]} align="RIGHT" />
        </div>

        <div className="mt-6">
          <ButtonArrayLayout
            buttons={[{ label: "Continue to payment", width: "FILL", icon: "credit-card", style: "SOLID", size: "MEDIUM", color: "GREEN_600" }]}
            marginBelow="NONE"
            align="CENTER"
          />
        </div>
      </div>
    </div>
  )
}

export default function RestaurantOrder() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [order, setOrder] = useState<Order | undefined>()

  useEffect(() => {
    getMenuItems().then(setMenuItems)
    getOrder(1).then(setOrder)
  }, [])

  const categories = ["Appetizers", "Sushi", "Rice Bowls", "Noodles", "Desserts"]

  return (
    <div className="flex min-h-screen">
      {/* Left pane - Menu */}
      <div className={`flex-1 ${paletteColorMap.GRAY_100.bg} p-6`}>
        <HeadingField text="Menu" size="LARGE_PLUS" fontWeight="BOLD" marginBelow="EVEN_LESS" />
        <RichTextDisplayField labelPosition="COLLAPSED" value={[<TextItem key="d" text="Tuesday, 24 Feb 2025" size="MEDIUM" />]} />
        <TabsField
          className="[&_button]:bg-transparent"
          tabs={categories.map(cat => ({
            value: cat,
            label: cat,
            content: (
              <div className="grid grid-cols-3 gap-4 mt-2">
                {(cat === "Appetizers" ? menuItems : []).map(item => (
                  <MenuCard key={item.id} item={item} />
                ))}
              </div>
            ),
          }))}
          defaultValue="Appetizers"
        />
      </div>

      {/* Right pane - Order */}
      <div className={`w-[420px] bg-white p-6 border-l ${paletteColorMap.GRAY_200.border} flex flex-col`}>
        {order && <OrderPanel order={order} />}
      </div>
    </div>
  )
}
