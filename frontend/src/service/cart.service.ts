import instance from "../api/axios.config";

const CartService = {

    async getCarts() {
        try {
            const response = await instance.get("/carts");
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },

    async getProductsFromCart(cartId: string) {
        try {
            const response = await instance.get(`/carts/${cartId}/products`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
};

export default CartService;