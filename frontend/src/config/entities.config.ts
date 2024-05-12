import ClientService, { Client } from '../service/client.service';
import AddressService, {Address} from '../service/address.service';
import { Success } from '../service/base.service';
import OrderService, { Order } from '../service/order.service';
import ProductService, { Product } from '../service/product.service';

export type EntityConfig = {
  name: string,
  display: string,
  fetch: () => Promise<unknown | Error>,
  create: (data: unknown) => Promise<unknown | Error>,
  update: (id: string, data: Partial<unknown>) => Promise<unknown | Error>,
  delete: (id: string) => Promise<Success | Error>,
  deleteColumnsFromCreate?: string[],
  deleteColumnsFromUpdate?: string[],
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
  entity?: string,
  values?: string[],
  multiple?: boolean,
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
    searchColumn: [['id'], ['name'], ['description'], ['category'], ['genre']],
    order: 0,
    columns: [
      {
        name: 'id',
        display: 'ID',
        type: 'id',
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
        required: false,
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
        type: 'enum',
        order: 6,
        values: ['shirt', 'pants', 'shoes', 'hat', 'suits', 'dress', 'skirt', 'jacket', 'coat', 'sweater', 'shorts', 'accessories', 'other'],
        editable: true,
        required: true,
        unique: false
      },
      {
        name: 'genre',
        display: 'Genre',
        type: 'enum',
        order: 7,
        values: ['male', 'female', 'kids', 'unisex', 'other'],
        editable: true,
        required: true,
        unique: false
      },
      {
        name: 'createdAt',
        display: 'Created At',
        type: 'datetime-local',
        order: 8,
        editable: false,
        required: true,
        unique: false
      },
      {
        name: 'updatedAt',
        display: 'Updated At',
        type: 'datetime-local',
        order: 9,
        editable: false,
        required: true,
        unique: false
      },
      {
        name: 'deletedAt',
        display: 'Deleted At',
        type: 'datetime-local',
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
    fetch: AddressService.getAdminAddresses,
    create: AddressService.createAddress as (data: unknown) => Promise<Address | Error>,
    update: AddressService.updateAddress,
    delete: AddressService.deleteAddress as (id: string) => Promise<Success | Error>,
    searchColumn: [['id'], ['city'], ['name'], ['country'], ['code'], ['client', 'email']],
    order: 1,
    columns: [
      {
        name: "id",
        display: "ID",
        type: "id",
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
        name: "client",
        display: "Utilisateur",
        type: "async",
        order: 6,
        fetch: ClientService.getClients,
        fetchValue: 'email',
        entity: 'client',
        editable: true,
        required: false,
        unique: false
      },
      {
        name: "createdAt",
        display: "Created At",
        type: "datetime-local",
        order: 6,
        editable: false,
        required: true,
        unique: false
      },
      {
        name: "updatedAt",
        display: "Updated At",
        type: "datetime-local",
        order: 7,
        editable: false,
        required: true,
        unique: false
      },
      {
        name: "deletedAt",
        display: "Deleted At",
        type: "datetime-local",
        order: 8,
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
    searchColumn: [['id'], ['firstname'], ['lastname'], ['email']],
    deleteColumnsFromCreate: ['cart', 'addresses', 'orders'],
    deleteColumnsFromUpdate: ['password', 'cart', 'addresses', 'orders'],
    order: -10,
    columns: [
      {
        name: "id",
        display: "ID",
        type: "id",
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
        name: "login",
        display: "Login",
        type: "text",
        order: 4,
        regex: "^[A-Za-z0-9 ]{1,255}$",
        editable: true,
        required: true,
        unique: true
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
        name: 'roles',
        display: 'Roles',
        type: 'enum',
        order: 6,
        values: ['IS_AUTHENTICATED_FULLY', 'ROLE_ADMIN'],
        multiple: true,
        editable: true,
        required: false,
        unique: false
      },
      {
        name: "createdAt",
        display: "Created At",
        type: "datetime-local",
        order: 7,
        editable: false,
        required: true,
        unique: false
      },
      {
        name: "updatedAt",
        display: "Updated At",
        type: "datetime-local",
        order: 8,
        editable: false,
        required: true,
        unique: false
      },
      {
        name: "deletedAt",
        display: "Deleted At",
        type: "datetime-local",
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
    fetch: OrderService.getAdminOrders,
    create: OrderService.createOrder as (data: unknown) => Promise<Order | Error>,
    update: OrderService.updateOrder,
    delete: OrderService.deleteOrder as (id: string) => Promise<Success | Error>,
    searchColumn: [['id'], ['client', 'email']],
    deleteColumnsFromCreate: ['orderItems'],
    deleteColumnsFromUpdate: ['orderItems'],
    order: 5,
    columns: [
      {
        name: "id",
        display: "ID",
        type: "id",
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
        display: "Payé",
        type: "checkbox",
        order: 3,
        regex: "^(true|false)$",
        editable: true,
        required: false,
        unique: false
      },
      {
        name: "client",
        display: "Utilisateur",
        type: "async",
        order: 4,
        fetch: ClientService.getClients,
        fetchValue: 'email',
        entity: 'client',
        editable: true,
        required: false,
        unique: false
      },
      {
        name: "address",
        display: "Adresse",
        type: "async",
        order: 5,
        fetch: AddressService.getAdminAddresses,
        fetchValue: 'name',
        entity: 'adresse',
        editable: true,
        required: false,
        unique: false
      },
      {
        name: "createdAt",
        display: "Created At",
        type: "datetime-local",
        order: 5,
        editable: false,
        required: true,
        unique: false
      },
      {
        name: "updatedAt",
        display: "Updated At",
        type: "datetime-local",
        order: 6,
        editable: false,
        required: true,
        unique: false
      },
      {
        name: "deletedAt",
        display: "Deleted At",
        type: "datetime-local",
        order: 7,
        editable: false,
        required: false,
        unique: false
      }
    ]
  }
]

export default entitiesConfig;