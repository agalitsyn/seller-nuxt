export enum ShopType {
  Branch = 'branch',
  Partner = 'partner',
  Marketplace = 'marketplace'
}

export type ShopDTO = {
  id: string
  title: string
  type: ShopType
}

export type UserDTO = {
  id: string
  fullName: string
  email: string
  shop: ShopDTO
}

export enum SaleStatus {
  Draft = 'draft',
  Review = 'review',
  Approved = 'approved'
}

export type SaleDTO = {
  id: number
  number: number
  status: SaleStatus
  createdAt: string
  updatedAt: string
  periodStartedAt: string
  periodStoppedAt: string
  total?: number
  wholesalePriceTotal?: number
  priceTotal?: number
  attachment?: string
}

export enum SaleItemPaymentType {
  Cash = 'cash',
  Card = 'card'
}

export type SaleItemDTO = {
  id: number
  productItemId: number
  barcode: string
  quantity: number
  wholesalePrice: number
  price: number
  priceTotal: number
  wholesalePriceTotal: number
  orderId: number
  paymentType?: SaleItemPaymentType
  attachment?: string
}

export type SaleEditDTO = SaleDTO & {
  items: SaleItemDTO[]
}

export type StatusLocalized = {
  title: string
  color: string
}

export const formatStatus = (status: SaleStatus): StatusLocalized => {
  switch (status) {
    case SaleStatus.Draft:
      return { title: 'Черновик', color: 'gray' }
    case SaleStatus.Review:
      return { title: 'На рассмотрении', color: 'orange' }
    case SaleStatus.Approved:
      return { title: 'Одобрен', color: 'emerald' }
  }
}

export type OrderDTO = {
  id: number
  number: number
  createdAt: string
}

export type OrderItemDTO = {
  id: number
  productItemId: number
  barcode: string
  quantity: number
  wholesalePrice: number
  price: number
  priceTotal: number
  wholesalePriceTotal: number
}

export type OrderDetailDTO = OrderDTO & {
  items: OrderItemDTO[]
}
