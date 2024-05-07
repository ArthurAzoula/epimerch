import Stripe from "stripe";

export const stripe_instance = new Stripe(import.meta.env.VITE_STRIPE_SECRET_KEY, {
    apiVersion: '2024-04-10',
    typescript: true,
});