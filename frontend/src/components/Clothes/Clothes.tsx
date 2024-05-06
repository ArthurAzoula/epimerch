import React, { useState, useEffect } from "react";
import ProductService, { Product } from "../../service/product.service";
import ReactPaginate from "react-paginate";
import { ShoppingCart } from "lucide-react";

const Clothes = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 10;

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
    <div className="bg-gray-100 p-10 w-full">
      <h1 className="text-4xl font-bold mb-10">Products</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {currentProducts.map((product) => (
          <li key={product.id} className="bg-white shadow-lg rounded-lg p-5">
            <img
              src={product.photo}
              alt={product.name}
              className="w-full h-64 object-cover rounded-t-lg mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">
              {product.name} - {product.price}€
            </h2>
            <p className="text-gray-700 mb-2">{product.description}</p>
            <p className="text-sm text-gray-500">
              Category: {product.category}
            </p>
            <p className="text-sm text-gray-500">Gender: {product.genre}</p>
            <p className="text-sm text-gray-500">
              Created At: {new Date(product.createdAt).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500">
              Updated At: {new Date(product.updatedAt).toLocaleDateString()}
            </p>
            <button className="flex border rounded-full border-black w-min py-2 px-4 hover:bg-black hover:text-white transition-all ease-in-out duration-400">
              <span>Ajouter</span>
              <ShoppingCart size={24} className="" />
            </button>
          </li>
        ))}
      </ul>
      <div className="flex w-full justify-center items-center my-10">
        <ReactPaginate
          previousLabel={"Avant"}
          nextLabel={"Après"}
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
