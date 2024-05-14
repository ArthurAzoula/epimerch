import { useEffect, useState } from "react";
import OrderService, { Order } from "../service/order.service";
import Header from "../components/Header/Header";
import { Link, useLocation } from "react-router-dom";
import {
  ShoppingCart,
  DollarSign,
  Info,
  ArrowRight,
} from "lucide-react";

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[] | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await OrderService.getOrders();
      if (!("error" in response)) {
        setOrders(response);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <Header />
      <div className="p-4">
        <h1 className="flex items-center text-2xl font-regular mb-4">
          <ShoppingCart size={24} className="inline-block mr-2" />
          Résumé de tes commandes ({orders?.length ?? 0})
        </h1>
        {orders?.sort((a, b) => new Date(a?.createdAt.date) < new Date(b.createdAt.date) ? 1 : 0).map((order, index) => (
          <div
            key={order.id}
            className={`border p-4 mb-4 rounded shadow ${
              index === 0 ? "bg-orange-100" : ""
            }`}
          >
            <div className="flex items-start justify-between">
              <h2 className="flex items-center text-lg font-regular mb-2">
                <Info size={18} className="inline-block mr-2" />
                Numéro de commande: {order.id}
                {index === 0 && (
                  <span className="ml-2 inline-block bg-green-500 text-white px-2 py-1 rounded text-xs">
                    Dernière commande
                  </span>
                )}
              </h2>
              <p>
                {new Date(order.createdAt.date).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <p
              className={`${order.isPaid ? "text-green-400" : "text-red-400"}`}
            >
              {order.isPaid
                ? "Vous avez déjà réglé cette commande."
                : "Vous n'avez pas encore réglé cette commande."}
            </p>
            <div className="w-full flex items-end justify-between">
              <p>
                <DollarSign size={20} className="inline-block mr-2" />
                Total: {order.totalPrice}€
              </p>
              <Link
                state={order}
                to={`/orders/${order.id}`}
                className="mt-2 inline-block  text-black border border-black hover:text-white hover:bg-black transition-all ease-in-out duration-300 px-4 py-2 rounded items-center"
              >
                <ArrowRight size={20} className="inline-block mr-2" />
                Voir détails
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default OrdersPage;
