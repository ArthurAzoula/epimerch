import React, { useState, useEffect, useContext } from "react";
import ProductService, { Product } from "../../service/product.service";
import ReactPaginate from "react-paginate";
import {
  SearchIcon,
  ShoppingCart,
  Tag,
  User,
} from "lucide-react";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import { useLocation, useSearchParams } from "react-router-dom";

const Clothes = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 12;

  const { addProductToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [search, setSearch] = useState<string>();
  const [searchParams] = useSearchParams();

  const location = useLocation();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }
  
  useEffect(() => {
    const fetchAllProducts = async () => {
      console.log('fetchAllProducts:', fetchAllProducts);
      const response = await ProductService.getProducts();
      const category = searchParams.get("category");
      const genre = searchParams.get("genre");

      if (Array.isArray(response)) {
        let filteredProducts = response;
        
        if (category) {
          filteredProducts = filteredProducts.filter(
            (product) => product.category === category
          );
        }

        if (genre) {
          filteredProducts = filteredProducts.filter(
            (product) => product.genre === genre
          );
        }

        setProducts(filteredProducts);
      }
    };

    fetchAllProducts();
  }, [location.search, searchParams]);
  
  useEffect(() => {
    setFilteredProducts(() => {
      console.log('products:', products);
      let filteredProducts = products.filter((product) => {
        return product.name.toLowerCase().includes(search?.toLowerCase() || "");
      });
      
      if(searchParams.has("category") && searchParams.get("category") !== ""){
        filteredProducts = filteredProducts.filter((product) => product.category === searchParams.get("category"));
      }
      
      if(searchParams.has("genre") && searchParams.get("genre") !== ""){
        filteredProducts = filteredProducts.filter((product) => product.genre === searchParams.get("genre"));
      }
      
      console.log('filteredProducts:', filteredProducts);
      return filteredProducts;
    });
  }, [search, searchParams, products]);
  
  const handlePageClick = (data: {selected: number}) => {
    const selected = data.selected;
    setCurrentPage(selected);
  };

  const offset = currentPage * productsPerPage;
  const currentProducts = filteredProducts.slice(offset, offset + productsPerPage);

  return (
    <div className="p-10 w-full overflow-hidden h-full">
      <div className='flex justify-between items-center mb-10 overflow-hidden h-full'>
        <h1 className="text-2xl">
          {user?.firstname ? user.firstname + ', ' : ''} prêt(e) à faire sauter la banque pour un nouveau
          vêtement ?
        </h1>
        {/* <div className='relative flex items-center'>
          <SearchIcon size={24} className="absolute ms-1 pointer-events-none" />
          <input
            type="text"
            id="search"
            value={search}
            onChange={handleSearch}
            className="border border-black rounded px-2 py-1 ps-8"/>
        </div> */}
      </div>
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
                <p className="text-2xl mb-2">{product.price}€</p>
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
      <div className="">
        <ReactPaginate
          previousLabel={"Précédent"}
          nextLabel={"Suivant"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={Math.ceil(filteredProducts.length / productsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"flex gap-2 justify-center mt-4"}
          pageClassName={
            "border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 py-2 *:px-4 *py-2"
          }
          previousClassName={
            "border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 py-2 *:px-4 *py-2"
          }
          nextClassName={
            "border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 py-2 *:px-4 *py-2"
          }
          activeClassName={
            "bg-neutral-700 text-black border border-neutral-700 text-sm font-medium py-2 *:px-4 *py-2"
          }
        />
      </div>
    </div>
  );
};

export default Clothes;
