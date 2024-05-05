import { Error, getRequest, postRequest, putRequest, deleteRequest, BaseEntityData, Success } from "./base.service";
import { Cart } from './cart.service';
import { Product } from './product.service';

export type CartItem = BaseEntityData & {
    cart: Cart,
    product: Product,
    quantity: number,
};

const CartItemService = {

    async getCartItems(): Promise<CartItem[] | Error> {
        return getRequest<CartItem[]>("/cartitems");
    },
    
    async getCartItemsByCartId(cartId: string): Promise<CartItem[] | Error> {
        return getRequest<CartItem[]>(`/cartitems/${cartId}`);
    },
    
    async createCartItem(data: CartItem): Promise<CartItem | Error> {
        return postRequest<CartItem>("/cartitems", data);
    },
    
    async updateCartItem(id: string, data: Partial<CartItem>): Promise<CartItem | Error> {
        return putRequest<CartItem>(`/cartitems/${id}`, data);
    },
    
    async deleteCartItem(id: string): Promise<Success | Error> {
        return deleteRequest<Success>(`/cartitems/${id}`);
    }
    
};

export default CartItemService;