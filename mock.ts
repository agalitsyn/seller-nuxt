import type { UserDTO, OrderDetailDTO, SaleDTO, SaleEditDTO } from '~/types'
import { SaleStatus, ShopType } from '~/types'

export const userMock: UserDTO = {
  id: '1',
  fullName: 'Продаван Продавцов',
  email: 'seller@dnishe.ru',
  shop: {
    id: '1',
    title: 'ООО Большой Магазин',
    type: ShopType.Partner
  }
}

export const ordersMock: OrderDetailDTO[] = [
  {
    id: 1,
    number: 1,
    createdAt: '2021-01-01T00:00:00.000Z',
    items: [
      {
        id: 1,
        productItemId: 11899,
        barcode: '2000000118994',
        quantity: 10,
        price: 100,
        priceTotal: 1000,
        wholesalePrice: 90,
        wholesalePriceTotal: 900
      },
      {
        id: 2,
        productItemId: 11900,
        barcode: '2000000119007',
        quantity: 20,
        price: 200,
        priceTotal: 4000,
        wholesalePrice: 180,
        wholesalePriceTotal: 3600
      },
      {
        id: 3,
        productItemId: 11901,
        barcode: '2000000119010',
        quantity: 30,
        price: 300,
        priceTotal: 9000,
        wholesalePrice: 270,
        wholesalePriceTotal: 8100
      }
    ]
  },
  {
    id: 2,
    number: 2,
    createdAt: '2021-02-01T00:00:00.000Z',
    items: [
      {
        id: 4,
        productItemId: 11902,
        barcode: '2000000119027',
        quantity: 40,
        price: 400,
        priceTotal: 16000,
        wholesalePrice: 360,
        wholesalePriceTotal: 14400
      },
      {
        id: 5,
        productItemId: 11903,
        barcode: '2000000119034',
        quantity: 50,
        price: 500,
        priceTotal: 25000,
        wholesalePrice: 450,
        wholesalePriceTotal: 22500
      },
      {
        id: 6,
        productItemId: 11904,
        barcode: '2000000119041',
        quantity: 60,
        price: 600,
        priceTotal: 36000,
        wholesalePrice: 540,
        wholesalePriceTotal: 32400
      }
    ]
  }
]

export const salesMock: SaleDTO[] = [
  {
    id: 1,
    number: 100,
    createdAt: '2024-02-18T00:00:00.000Z',
    updatedAt: '2021-02-18T00:00:00.000Z',
    total: 1000,
    status: SaleStatus.Draft,
    periodStartedAt: '2024-02-12T00:00:00.000Z',
    periodStoppedAt: '2024-02-18T00:00:00.000Z'
  },
  {
    id: 2,
    number: 101,
    createdAt: '2021-10-01T00:00:00.000Z',
    updatedAt: '2021-10-01T00:00:00.000Z',
    total: 2000,
    status: SaleStatus.Review,
    periodStartedAt: '2024-02-05T00:00:00.000Z',
    periodStoppedAt: '2024-02-11T00:00:00.000Z'
  },
  {
    id: 4,
    number: 103,
    createdAt: '2021-10-01T00:00:00.000Z',
    updatedAt: '2021-10-01T00:00:00.000Z',
    total: 4000,
    status: SaleStatus.Approved,
    periodStartedAt: '2024-01-29T00:00:00.000Z',
    periodStoppedAt: '2024-02-04T00:00:00.000Z'
  },
  {
    id: 5,
    number: 104,
    createdAt: '2021-10-01T00:00:00.000Z',
    updatedAt: '2021-10-01T00:00:00.000Z',
    total: 5000,
    status: SaleStatus.Draft,
    periodStartedAt: '2024-01-22T00:00:00.000Z',
    periodStoppedAt: '2024-01-28T00:00:00.000Z'
  },
  {
    id: 6,
    number: 105,
    createdAt: '2021-10-01T00:00:00.000Z',
    updatedAt: '2021-10-01T00:00:00.000Z',
    total: 6000,
    status: SaleStatus.Draft,
    periodStartedAt: '2024-01-15T00:00:00.000Z',
    periodStoppedAt: '2024-01-21T00:00:00.000Z'
  },
  {
    id: 7,
    number: 106,
    createdAt: '2021-10-01T00:00:00.000Z',
    updatedAt: '2021-10-01T00:00:00.000Z',
    total: 7000,
    status: SaleStatus.Review,
    periodStartedAt: '2024-01-08T00:00:00.000Z',
    periodStoppedAt: '2024-01-14T00:00:00.000Z'
  },
  {
    id: 8,
    number: 107,
    createdAt: '2021-10-01T00:00:00.000Z',
    updatedAt: '2021-10-01T00:00:00.000Z',
    total: 8000,
    status: SaleStatus.Approved,
    periodStartedAt: '2024-01-01T00:00:00.000Z',
    periodStoppedAt: '2024-01-07T00:00:00.000Z'
  },
  {
    id: 9,
    number: 108,
    createdAt: '2021-10-01T00:00:00.000Z',
    updatedAt: '2021-10-01T00:00:00.000Z',
    total: 9000,
    status: SaleStatus.Draft,
    periodStartedAt: '2023-12-25T00:00:00.000Z',
    periodStoppedAt: '2023-12-31T00:00:00.000Z'
  },
  {
    id: 10,
    number: 109,
    createdAt: '2021-10-01T00:00:00.000Z',
    updatedAt: '2021-10-01T00:00:00.000Z',
    total: 10000,
    status: SaleStatus.Draft,
    periodStartedAt: '2023-12-18T00:00:00.000Z',
    periodStoppedAt: '2023-12-24T00:00:00.000Z'
  },
  {
    id: 11,
    number: 110,
    createdAt: '2021-10-01T00:00:00.000Z',
    updatedAt: '2021-10-01T00:00:00.000Z',
    total: 11000,
    status: SaleStatus.Review,
    periodStartedAt: '2023-12-11T00:00:00.000Z',
    periodStoppedAt: '2023-12-17T00:00:00.000Z'
  },
  {
    id: 12,
    number: 111,
    createdAt: '2021-10-01T00:00:00.000Z',
    updatedAt: '2021-10-01T00:00:00.000Z',
    total: 12000,
    status: SaleStatus.Approved,
    periodStartedAt: '2023-12-04T00:00:00.000Z',
    periodStoppedAt: '2023-12-10T00:00:00.000Z'
  },
  {
    id: 13,
    number: 112,
    createdAt: '2021-10-01T00:00:00.000Z',
    updatedAt: '2021-10-01T00:00:00.000Z',
    total: 13000,
    status: SaleStatus.Draft,
    periodStartedAt: '2023-11-27T00:00:00.000Z',
    periodStoppedAt: '2023-12-03T00:00:00.000Z'
  },
  {
    id: 14,
    number: 113,
    createdAt: '2021-10-01T00:00:00.000Z',
    updatedAt: '2021-10-01T00:00:00.000Z',
    total: 14000,
    status: SaleStatus.Draft,
    periodStartedAt: '2023-11-20T00:00:00.000Z',
    periodStoppedAt: '2023-11-26T00:00:00.000Z'
  }
]

export const saleMock: SaleEditDTO = {
  id: 1,
  number: 100,
  createdAt: '2021-10-01T00:00:00.000Z',
  updatedAt: '2021-10-01T00:00:00.000Z',
  periodStartedAt: '2023-12-11T00:00:00.000Z',
  periodStoppedAt: '2023-12-17T00:00:00.000Z',
  total: 1000,
  status: SaleStatus.Draft,
  items: [
    // {
    //   id: 1,
    //   productItemId: 11899,
    //   barcode: '2000000118994',
    //   quantity: 10,
    //   price: 100,
    //   priceTotal: 1000,
    //   wholesalePrice: 90,
    //   wholesalePriceTotal: 900,
    //   orderId: 1
    // }
  ]
}
