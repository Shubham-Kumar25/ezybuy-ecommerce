import React, { useContext, useEffect } from "react";
import myContext from "../../context/myContext";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/CartSlice";
import { toast } from "react-toastify";

function ProductCard() {
  const context = useContext(myContext);
  const { mode, product, searchKey, filterPrice, filterType } = context;
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const addCart = (product) => {
    dispatch(addToCart(product));
    toast.success("Added to cart");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const filteredProducts = product
    .filter((obj) => obj.title.toLowerCase().includes(searchKey))
    .filter((obj) => obj.category.toLowerCase().includes(filterType))
    .filter((obj) => obj.price.includes(filterPrice))
    .slice(0, 8);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-8 mx-auto md:py-16">
        <div className="w-full mb-6 lg:w-1/2 lg:mb-10">
          <h1
            className="mb-2 text-2xl font-medium text-gray-900 sm:text-3xl title-font"
            style={{ color: mode === "dark" ? "white" : "" }}
          >
            Our Latest Collection
          </h1>
          <div className="w-20 h-1 bg-pink-600 rounded"></div>
        </div>

        <div className="flex flex-wrap -m-4">
          {filteredProducts.map((item, index) => {
            const { title, price, imageUrl, id } = item;
            return (
              <div key={index} className="p-4 md:w-1/4 drop-shadow-lg">
                <div
                  className="h-full overflow-hidden transition-shadow duration-300 ease-in-out border-2 border-gray-200 hover:shadow-gray-100 hover:shadow-xl border-opacity-60 rounded-2xl"
                  style={{
                    backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                    color: mode === "dark" ? "white" : "",
                  }}
                >
                  <div
                    onClick={() =>
                      (window.location.href = `/productinfo/${id}`)
                    }
                    className="flex justify-center cursor-pointer"
                  >
                    <img
                      className="w-full p-2 duration-300 ease-in-out rounded-2xl h-80 hover:scale-110"
                      src={imageUrl}
                      alt={title}
                    />
                  </div>
                  <div className="p-5 border-t-2">
                    <h2
                      className="mb-1 text-xs font-medium tracking-widest text-gray-400 title-font"
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      EzyBuy
                    </h2>
                    <h1
                      className="mb-3 text-lg font-medium text-gray-900 title-font"
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      {title}
                    </h1>
                    <p
                      className="mb-3 leading-relaxed"
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      ₹{price}
                    </p>
                    <div className="flex justify-center">
                      <button
                        onClick={() => addCart(item)}
                        type="button"
                        className="w-full py-2 text-sm font-medium text-white bg-pink-600 rounded-lg focus:outline-none hover:bg-pink-700 focus:ring-4 focus:ring-purple-300"
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ProductCard;
