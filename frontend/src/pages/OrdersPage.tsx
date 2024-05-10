import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import OrderService, { Order } from "../service/order.service";
import Header from "../components/Header/Header";
import { Link } from "react-router-dom";
import {
  ShoppingCart,
  Calendar,
  DollarSign,
  Info,
  ArrowRight,
} from "lucide-react";

const OrdersPage = () => {
  const { user } = useContext(AuthContext);

  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await OrderService.getOrders();
      if (!("error" in response)) {
        setOrders(response);
      }
    };

    fetchOrders();
  }, []);

  console.log(orders);

  return (
    <>
      <Header />
      <div className="p-4">
        <h1 className="flex items-center text-2xl font-regular mb-4">
          <ShoppingCart size={24} className="inline-block mr-2" />
          Résumé de tes commandes ({orders.length})
        </h1>
        {orders.map((order) => (
          <div key={order.id} className="border p-4 mb-4 rounded shadow">
            <div className="flex items-start justify-between">
              <h2 className="flex items-center text-lg font-regular mb-2">
                <Info size={18} className="inline-block mr-2" />
                Numéro de commande: {order.id}
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
                state={ order }
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
