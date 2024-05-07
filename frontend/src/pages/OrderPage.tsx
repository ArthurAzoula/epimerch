import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate, redirect } from "react-router-dom";
import { Order } from "../service/order.service";
import { OrderItem } from "../service/orderitem.service";
import OrderService from "../service/order.service";
import Header from "../components/Header/Header";
import { AuthContext } from "../context/AuthContext";
import { User, MapPin, CreditCard } from "lucide-react";
import Visa from "../assets/visa.png";
import MasterCard from "../assets/mastercard.png";
import Paypal from "../assets/paypal.png";
import { stripe_instance } from "../config/stripe.config";

const OrderPage = () => {
  const [orderItems, setOrderItems] = useState<OrderItem[] | null>(null);

  const location = useLocation();

  let navigate = useNavigate();

  const order = location.state as Order;

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchOrderItems = async () => {
      const response = await OrderService.getOrderItems(order.id);
      if (!("error" in response)) {
        setOrderItems(response);
      }
    };

    if (order) {
      fetchOrderItems();
    }
  }, [order]);

    const handleStripePayement = async () => {

        const session = await stripe_instance.checkout.sessions.create({
            mode: "payment",
            payment_method_types: ["card"],
            line_items: orderItems.map((orderItem) => ({
                price_data: {
                    currency: "eur",
                    product_data: {
                        name: orderItem.product.name,
                        description: orderItem.product.description,
                        images: [orderItem.product.photo],
                    },
                    unit_amount: orderItem.product.price* 100,
                },
                quantity: orderItem.quantity,
            })),
            success_url: "http://localhost:5173/orders",
            cancel_url: "http://localhost:5173/orders",
        })

        window.location.href = session.url as string;
        
    };

  return (
    <>
      <Header />
      <div className="p-4">
        <h1 className="flex items-center justify-center text-2xl font-regular my-8">
          Détail de la commande n°{order.id}
        </h1>
        <div className="flex flex-col justify-center items-center w-full">
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
              <p>Total: {order.totalPrice}€</p>
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
                  {user?.address ?? "Adresse non renseignée"}
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
              <div className="w-full flex items-center justify-center mt-8 mb-2">
                <button onClick={handleStripePayement} className="border border-black rounded hover:text-white hover:bg-black transition-all ease-in-out duration-300 px-2 py-1">
                  Payer {order.totalPrice}€
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderPage;
