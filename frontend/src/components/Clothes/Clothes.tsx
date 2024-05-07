import React, { useState, useEffect, useContext } from "react";
import ProductService, { Product } from "../../service/product.service";
import ReactPaginate from "react-paginate";
import {
  ShoppingCart,
  Tag,
  Calendar,
  User,
  Info,
  PlusIcon,
} from "lucide-react";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";

const Clothes = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 10;

  const { addProductToCart } = useContext(CartContext);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchAllProducts = async () => {
      const response = await ProductService.getProducts();
      setProducts(response as Product[]);
    };

    fetchAllProducts();
  }, []);

  const handlePageClick = (data: any) => {
    let selected = data.selected;
    setCurrentPage(selected);
  };

  const offset = currentPage * productsPerPage;
  const currentProducts = products.slice(offset, offset + productsPerPage);

  return (
    <div className="p-10 w-full">
      <h1 className="text-2xl mb-10">
        {user?.firstname}, prêt(e) à faire sauter la banque pour un nouveau
        vêtement ?
      </h1>{" "}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
        {currentProducts.map((product, index) => (
          <li
            key={product.id}
            className={`mb-4 flex justify-center border-r border-black ${
              index % 2 !== 0 ? "border-l" : "border-r-0"
            }`}
          >
            <div className="p-4 w-full">
              <img
                src={product.photo}
                alt={product.name}
                className="w-full h-64 object-cover mb-4"
              />
              <h2 className="text-2xl font-bold mb-2 text-center">
                {product.name}
              </h2>
              <p className="text-gray-700 mb-2 text-center">
                {product.description}
              </p>
              <div className="flex items-center gap-6 justify-center">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Tag size={16} className="mr-1" />
                  {product.category}
                </div>
                <span className="text-gray-400 pb-1">-</span>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <User size={16} className="mr-1" />
                  {product.genre}
                </div>
              </div>
              <div className="w-full flex justify-between items-center mt-3">
                <p className="text-2xl mb-2">
                  {product.price}€
                </p>
                <button
                  onClick={() => addProductToCart(product.id, 1)}
                  className="group flex gap-2 border rounded border-black py-2 px-4 hover:bg-black hover:text-white transition-all ease-in-out duration-400"
                >
                  <ShoppingCart
                    size={24}
                    className="transition-transform duration-500 group-hover:-translate-y-0.5"
                  />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex w-full justify-center items-center my-10">
        <ReactPaginate
          previousLabel={"Précédent"}
          nextLabel={"Suivant"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={Math.ceil(products.length / productsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"flex space-x-2"}
          pageClassName={
            "relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          }
          previousClassName={
            "relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          }
          nextClassName={
            "relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          }
          activeClassName={
            "bg-neutral-700 text-black relative inline-flex items-center px-4 py-2 border border-neutral-700 text-sm font-medium"
          }
          pageLinkClassName={
            "w-full h-full absolute inset-0 flex items-center justify-center"
          }
        />
      </div>
    </div>
  );
};

export default Clothes;
