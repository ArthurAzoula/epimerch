import ClientService, { Client } from '../service/client.service';
import CartService, { Cart } from '../service/cart.service'
import AddressService, {Address} from '../service/address.service';
import { Success } from '../service/base.service';
import CartItemService, { CartItem } from '../service/cartitem.service';
import OrderService, { Order } from '../service/order.service';
import OrderItemService, { OrderItem } from '../service/orderitem.service';
import ProductService, { Product } from '../service/product.service';
import CategoryService from '../service/category.service';

export type EntityConfig = {
  name: string,
  display: string,
  fetch: () => Promise<unknown | Error>,
  create: (data: unknown) => Promise<unknown | Error>,
  update: (id: string, data: Partial<unknown>) => Promise<unknown | Error>,
  delete: (id: string) => Promise<Success | Error>,
  searchColumn: string[][],
  order: number,
  columns: EntityColumnConfig[]
}

export type EntityColumnConfig = {
  name: string,
  display: string,
  type: string,
  order: number,
  regex?: string,
  fetch?: () => Promise<unknown | Error>,
  fetchValue?: string,
  editable: boolean,
  required: boolean
  unique: boolean,
  removeFromUpdate?: boolean
}

const entitiesConfig: EntityConfig[] = [
  {
    name: 'product',
    display: 'Produits',
    fetch: ProductService.getProducts,
    create: ProductService.createProduct as (data: unknown) => Promise<Product | Error>,
    update: ProductService.updateProduct,
    delete: ProductService.deleteProduct as (id: string) => Promise<Success | Error>,
    searchColumn: [['name'], ['description'], ['category'], ['genre']],
    order: 0,
    columns: [
      {
        name: 'id',
        display: 'ID',
        type: 'text',
        order: 1,
        regex: '^[0-9A-Z]{26}$',
        editable: false,
        required: true,
        unique: true
      },
      {
        name: 'name',
        display: 'Name',
        type: 'text',
        order: 2,
        regex: '^[A-Za-z0-9 ]{1,255}$',
        editable: true,
        required: true,
        unique: false
      },
      {
        name: 'description',
        display: 'Description',
        type: 'text',
        order: 3,
        regex: '^[A-Za-z0-9 ]{1,255}$',
        editable: true,
        required: true,
        unique: false
      },
      {
        name: 'photo',
        display: 'Photo',
        type: 'url',
        order: 4,
        regex: '^(http|https)://[a-zA-Z0-9./?=_-]*$',
        editable: true,
        required: true,
        unique: false
      },
      {
        name: 'price',
        display: 'Price',
        type: 'number',
        order: 5,
        regex: '^[0-9]{1,255}$',
        editable: true,
        required: true,
        unique: false
      },
      {
        name: 'category',
        display: 'Category',
        type: 'text',
        order: 6,
        editable: true,
        required: true,
        unique: false
      },
      {
        name: 'genre',
        display: 'Genre',
        type: 'text',
        order: 7,
        regex: '^[A-Za-z0-9 ]{1,255}$',
        editable: true,
        required: true,
        unique: false
      },
      {
        name: 'createdAt',
        display: 'Created At',
        type: 'date',
        order: 8,
        editable: false,
        required: true,
        unique: false
      },
      {
        name: 'updatedAt',
        display: 'Updated At',
        type: 'date',
        order: 9,
        editable: false,
        required: true,
        unique: false
      },
      {
        name: 'deletedAt',
        display: 'Deleted At',
        type: 'date',
        order: 10,
        editable: false,
        required: false,
        unique: false
      }
    ]
  },
  {
    name: "adresse",
    display: "Adresses",
    fetch: AddressService.getAddresses,
    create: AddressService.createAddress as (data: unknown) => Promise<Address | Error>,
    update: AddressService.updateAddress,
    delete: AddressService.deleteAddress as (id: string) => Promise<Success | Error>,
    searchColumn: [['city'], ['name'], ['country'], ['code']],
    order: 1,
    columns: [
      {
        name: "id",
        display: "ID",
        type: "text",
        order: 1,
        regex: "^[0-9A-Z]{26}$",
        editable: false,
        required: true,
        unique: true
      },
      {
        name: "city",
        display: "City",
        type: "text",
        order: 2,
        regex: "^[A-Za-z0-9 ]{1,255}$",
        editable: true,
        required: true,
        unique: false
      },
      {
        name: "name",
        display: "Name",
        type: "text",
        order: 3,
        regex: "^[A-Za-z0-9 ]{1,255}$",
        editable: true,
        required: true,
        unique: false
      },
      {
        name: "country",
        display: "Country",
        type: "text",
        order: 4,
        regex: "^[A-Za-z0-9 ]{1,255}$",
        editable: true,
        required: true,
        unique: false
      },
      {
        name: "code",
        display: "Code",
        type: "text",
        order: 5,
        regex: "^[A-Za-z0-9 ]{255}$",
        editable: true,
        required: true,
        unique: false
      },
      {
        name: "createdAt",
        display: "Created At",
        type: "date",
        order: 6,
        editable: false,
        required: true,
        unique: false
      },
      {
        name: "updatedAt",
        display: "Updated At",
        type: "date",
        order: 7,
        editable: false,
        required: true,
        unique: false
      },
      {
        name: "deletedAt",
        display: "Deleted At",
        type: "date",
        order: 8,
        editable: false,
        required: false,
        unique: false
      }
    ]
  },
  {
    name: "cart",
    display: "Paniers",
    fetch: CartService.getCarts,
    create: CartService.createCart as (data: unknown) => Promise<Cart | Error>,
    update: CartService.updateCart,
    delete: CartService.deleteCart as (id: string) => Promise<Success | Error>,
    searchColumn: [['client'], ['name']],
    order: 2,
    columns: [
      {
        name: "id",
        display: "ID",
        type: "text",
        order: 1,
        regex: "^[0-9A-Z]{26}$",
        editable: false,
        required: true,
        unique: true
      },
      {
        name: "client",
        display: "Client",
        type: "async",
        order: 2,
        fetch: ClientService.getClients,
        fetchValue: 'email',
        editable: true,
        required: true,
        unique: false
      },
      {
        name: "createdAt",
        display: "Created At",
        type: "date",
        order: 2,
        editable: false,
        required: true,
        unique: false
      },
      {
        name: "updatedAt",
        display: "Updated At",
        type: "date",
        order: 3,
        editable: false,
        required: true,
        unique: false
      },
      {
        name: "deletedAt",
        display: "Deleted At",
        type: "date",
        order: 4,
        editable: false,
        required: false,
        unique: false
      }
    ]
  },
  {
    name: "cartItem",
    display: "Produits panier",
    fetch: CartItemService.getCartItems,
    create: CartItemService.createCartItem as (data: unknown) => Promise<CartItem | Error>,
    update: CartItemService.updateCartItem,
    delete: CartItemService.deleteCartItem as (id: string) => Promise<Success | Error>,
    searchColumn: [['cart', 'product'], ['product', 'name']],
    order: 3,
    columns: [
      {
        name: "id",
        display: "ID",
        type: "text",
        order: 1,
        regex: "^[0-9A-Z]{26}$",
        editable: false,
        required: true,
        unique: true
      },
      {
        name: "cart",
        display: "Cart",
        type: "async",
        order: 2,
        fetch: CartService.getCarts,
        fetchValue: 'name',
        editable: true,
        required: true,
        unique: false
      },
      {
        name: "product",
        display: "Product",
        type: "async",
        order: 3,
        fetch: ProductService.getProducts,
        fetchValue: 'name',
        editable: true,
        required: true,
        unique: false
      },
      {
        name: "quantity",
        display: "Quantity",
        type: "number",
        order: 4,
        regex: "^[0-9]{1,255}$",
        editable: true,
        required: true,
        unique: false
      },
      {
        name: "createdAt",
        display: "Created At",
        type: "date",
        order: 5,
        editable: false,
        required: true,
        unique: false
      },
      {
        name: "updatedAt",
        display: "Updated At",
        type: "date",
        order: 6,
        editable: false,
        required: true,
        unique: false
      },
      {
        name: "deletedAt",
        display: "Deleted At",
        type: "date",
        order: 7,
        editable: false,
        required: false,
        unique: false
      }
    ]
  },
  {
    name: "client",
    display: "Utilisateurs",
    fetch: ClientService.getClients,
    create: ClientService.createClient as (data: unknown) => Promise<Client | Error>,
    update: ClientService.updateClient,
    delete: ClientService.deleteClient as (id: string) => Promise<Success | Error>,
    searchColumn: [['firstname'], ['lastname'], ['email']],
    order: 4,
    columns: [
      {
        name: "id",
        display: "ID",
        type: "text",
        order: 1,
        regex: "^[0-9A-Z]{26}$",
        editable: false,
        required: true,
        unique: true
      },
      {
        name: "firstname",
        display: "Firstname",
        type: "text",
        order: 2,
        regex: "^[A-Za-z0-9 ]{1,255}$",
        editable: true,
        required: true,
        unique: false
      },
      {
        name: "lastname",
        display: "Lastname",
        type: "text",
        order: 3,
        regex: "^[A-Za-z0-9 ]{1,255}$",
        editable: true,
        required: true,
        unique: false
      },
      {
        name: "email",
        display: "Email",
        type: "text",
        order: 4,
        regex: "^[A-Za-z0-9@. ]{1,255}$",
        editable: true,
        required: true,
        unique: true
      },
      {
        name: "password",
        display: "Password",
        type: "text",
        order: 5,
        regex: "^[A-Za-z0-9 ]{1,255}$",
        editable: true,
        required: true,
        unique: false,
        removeFromUpdate: true
      },
      {
        name: "createdAt",
        display: "Created At",
        type: "date",
        order: 7,
        editable: false,
        required: true,
        unique: false
      },
      {
        name: "updatedAt",
        display: "Updated At",
        type: "date",
        order: 8,
        editable: false,
        required: true,
        unique: false
      },
      {
        name: "deletedAt",
        display: "Deleted At",
        type: "date",
        order: 9,
        editable: false,
        required: false,
        unique: false
      }
    ]
  },
  {
    name: "order",
    display: "Achats",
    fetch: OrderService.getOrders,
    create: OrderService.createOrder as (data: unknown) => Promise<Order | Error>,
    update: OrderService.updateOrder,
    delete: OrderService.deleteOrder as (id: string) => Promise<Success | Error>,
    searchColumn: [['client', 'email']],
    order: 5,
    columns: [
      {
        name: "id",
        display: "ID",
        type: "text",
        order: 1,
        regex: "^[0-9A-Z]{26}$",
        editable: false,
        required: true,
        unique: true
      },
      {
        name: "totalPrice",
        display: "Total Price",
        type: "number",
        order: 2,
        regex: "^[0-9]{1,255}$",
        editable: true,
        required: true,
        unique: false
      },
      {
        name: "isPaid",
        display: "Is Paid",
        type: "checkbox",
        order: 3,
        regex: "^(true|false)$",
        editable: true,
        required: true,
        unique: false
      },
      {
        name: "client",
        display: "Client",
        type: "async",
        order: 4,
        fetch: ClientService.getClients,
        fetchValue: 'email',
        editable: true,
        required: true,
        unique: false
      },
      {
        name: "createdAt",
        display: "Created At",
        type: "date",
        order: 5,
        editable: false,
        required: true,
        unique: false
      },
      {
        name: "updatedAt",
        display: "Updated At",
        type: "date",
        order: 6,
        editable: false,
        required: true,
        unique: false
      },
      {
        name: "deletedAt",
        display: "Deleted At",
        type: "date",
        order: 7,
        editable: false,
        required: false,
        unique: false
      }
    ]
  },
  {
    name: "orderItem",
    display: "Achat produits",
    fetch: OrderItemService.getOrderItems,
    create: OrderItemService.createOrderItem as (data: unknown) => Promise<OrderItem | Error>,
    update: OrderItemService.updateOrderItem,
    delete: OrderItemService.deleteOrderItem as (id: string) => Promise<Success | Error>,
    searchColumn: [['name'], ['description'], ['category'], ['genre']],
    order: 6,
    columns: [
      {
        name: "id",
        display: "ID",
        type: "text",
        order: 1,
        regex: "^[0-9A-Z]{26}$",
        editable: false,
        required: true,
        unique: true
      },
      {
        name: "name",
        display: "Name",
        type: "text",
        order: 2,
        regex: "^[A-Za-z0-9 ]{1,255}$",
        editable: true,
        required: true,
        unique: false
      },
      {
        name: "description",
        display: "Description",
        type: "text",
        order: 3,
        regex: "^[A-Za-z0-9 ]{1,255}$",
        editable: true,
        required: true,
        unique: false
      },
      {
        name: "photo",
        display: "Photo",
        type: "url",
        order: 4,
        regex: "^(http|https)://[a-zA-Z0-9./?=_-]*$",
        editable: true,
        required: true,
        unique: false
      },
      {
        name: "price",
        display: "Price",
        type: "number",
        order: 5,
        regex: "^[0-9]{1,255}$",
        editable: true,
        required: true,
        unique: false
      },
      {
        name: "category",
        display: "Category",
        type: "text",
        order: 6,
        editable: true,
        required: true,
        unique: false
      },
      {
        name: "genre",
        display: "Genre",
        type: "string",
        order: 7,
        regex: "^[A-Za-z0-9 ]{1,255}$",
        editable: true,
        required: true,
        unique: false
      },
      {
        name: "createdAt",
        display: "Created At",
        type: "date",
        order: 8,
        editable: false,
        required: true,
        unique: false
      },
      {
        name: "updatedAt",
        display: "Updated At",
        type: "date",
        order: 9,
        editable: false,
        required: true,
        unique: false
      },
      {
        name: "deletedAt",
        display: "Deleted At",
        type: "date",
        order: 10,
        editable: false,
        required: false,
        unique: false
      }
    ]
  }
]

export default entitiesConfig;