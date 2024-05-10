import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { ArrowRightIcon } from 'lucide-react';
import React from 'react';
import { Order } from '../service/order.service';

const CheckoutForm = ({order}: {order: Order}) => {
  const stripe = useStripe();
  const elements = useElements();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if(!stripe || !elements){
      return;
    }
    
    stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `http://localhost:5173/orders/${order.id}`
      }
    });
  }
  
  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <PaymentElement className='z-10' />
      <button disabled={!stripe || !elements} type="submit" className='border flex gap-2 justify-center items-center px-2 py-2 bg-green-600 text-white hover:bg-green-700 transition-all rounded-md'>
        <span>Payer</span>
        <ArrowRightIcon size={20}/>
      </button>
    </form>
  );
};

export default CheckoutForm;