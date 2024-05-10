import { useEffect, useState, useContext } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { Order } from "../service/order.service";
import { OrderItem } from "../service/orderitem.service";
import OrderService from "../service/order.service";
import Header from "../components/Header/Header";
import { AuthContext } from "../context/AuthContext";
import { User, MapPin, Loader2Icon } from "lucide-react";
import Visa from "../assets/visa.png";
import MasterCard from "../assets/mastercard.png";
import Paypal from "../assets/paypal.png";
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import StripeService from '../service/stripe.service';
import { toast } from 'react-toastify';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY as string);

const OrderPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [orderItems, setOrderItems] = useState<OrderItem[] | null>(null);
  const [clientSecret, setClientSecret] = useState<string | undefined>();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(location.state as Order | null);
  const { user } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    setLoading(true);
    if(order === null && id){
      OrderService.getOrderById(id).then(response => {
        if(!("error" in response)){
          setOrder(response);
        }
      }).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [id])
  
  useEffect(() => {
    if(searchParams && searchParams.has('redirect_status')){
      if(searchParams.get('redirect_status') === 'succeeded'){
        toast.success('Paiement effectué avec succès');
      } else if(searchParams.get('redirect_status') === 'failed'){
        toast.error('Erreur lors du paiement');
      }
    }
    
    return () => {
      toast.dismiss();
    }
  }, [searchParams]);
  
  useEffect(() => {
    if(order === null){
      return;
    }
    
    const fetchOrderItems = async () => {
      const response = await OrderService.getOrderItems(order.id);
      if (!("error" in response)) {
        setOrderItems(response);
      }
    };

    if (order) {
      fetchOrderItems();
    }
    
    StripeService.getClientSecret(order.id).then((response) => {
      if (!("error" in response)) {
        setClientSecret(response.client_secret);
      }
    });
  }, [order]);

  return (
    <div className='flex flex-col min-h-screen max-h-screen h-screen'>
      <Header />
      {loading ? (
        <div className='flex justify-center items-center h-full flex-grow'>
          <Loader2Icon size={50} className='animate-spin text-black'/>
        </div>
      )
        : (
          <div className="p-4">
            <h1 className="flex items-center justify-center text-2xl font-regular my-8">
              Détail de la commande n°{order?.id}
            </h1>
            <div className="flex flex-col lg:flex-row justify-center w-full gap-4">
              <div className="w-2/5 p-4 shadow-md bg-gray-100">
                <h2 className="text-lg font-regular mb-4">
                  Informations de la commande
                </h2>
                {orderItems &&
                  orderItems.map((orderItem) => (
                    <div key={orderItem.id} className="px-4 py-2 rounded">
                      <div className="flex items-end justify-between">
                        <h2 className="flex items-center text-lg font-regular mb-2">
                          <img
                            src={orderItem?.product.photo}
                            alt={orderItem?.product.name}
                            className="w-20 h-20 rounded-md mr-2"
                            />
                          <div className="flex flex-col">
                            <p>{orderItem?.product.name}</p>
                            <p className="text-sm text-gray-600">
                              {orderItem?.product.description}
                            </p>
                          </div>
                        </h2>
                        <p className="mb-3">
                          {orderItem?.quantity} x {orderItem?.product.price}€
                        </p>
                      </div>
                    </div>
                  ))}
                <div className="w-full flex justify-center my-4">
                  <p>Total: {order?.totalPrice}€</p>
                </div>

                <div className="border-t">
                  <h2 className="text-lg font-regular my-2 flex items-center">
                    Vos informations de livraison
                  </h2>
                  <div className="p-4">
                    <p className="flex items-center">
                      <User size={18} className="mr-2" />
                      {user?.firstname} {user?.lastname}
                    </p>
                    <p className="flex items-center mt-2">
                      <MapPin size={18} className="mr-2" />
                      {order?.address ? `${order.address.name}, ${order.address.code} ${order.address.country}, ${order.address.country}` : "Adresse non renseignée"}
                    </p>
                  </div>
                </div>
                <div className="border-t">
                  <h2 className="text-lg font-regular my-2 flex items-center">
                    Paiment de la commande
                  </h2>
                  <div className="flex items-center justify-around space-x-4 p-4">
                    <div className="flex items-center space-x-4">
                      <img src={Visa} alt="Visa" className="h-6" />
                      <p>Visa</p>
                    </div>

                    <div className="flex items-center space-x-4">
                      <img src={MasterCard} alt="MasterCard" className="h-6" />
                      <p>MasterCard</p>
                    </div>

                    <div className="flex items-center space-x-4">
                      <img src={Paypal} alt="Paypal" className="h-6" />
                      <p>Paypal</p>
                    </div>
                  </div>
                  {/* <div className="w-full flex items-center justify-center mt-8 mb-2">
                    <button disabled={order.isPaid} className={`border border-black rounded ${!order.isPaid ? 'hover:text-white hover:bg-black' : ''} transition-all ease-in-out duration-300 px-2 py-1 flex justify-between items-center gap-2`}>
                      {order.isPaid ?
                      <>
                        <span>Commande payée</span>
                        <CheckIcon size={20}/>
                      </>
                      :
                      <>
                        <span>Payer {order.totalPrice}€</span>
                        <ArrowRightIcon size={20}/>
                      </>
                      }
                    </button>
                  </div> */}
                </div>
              </div>
              {order && !order.isPaid && clientSecret && (
                <div className='min-w-96 p-4 h-min shadow-md bg-gray-100'>
                  <Elements stripe={stripePromise} options={{clientSecret: clientSecret}}>
                    <CheckoutForm order={order}/>
                  </Elements> 
                </div>
              )}
            </div>
          </div>
        )
      }
    </div>
  );
};

export default OrderPage;
