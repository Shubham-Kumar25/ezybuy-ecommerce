import React, { useEffect, useState } from "react";
import myContext from "./myContext";
import {
  QuerySnapshot,
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { fireDB } from "../firebase/FirebaseConfig";

function myState(props) {
  const [mode, setMode] = useState("light");

  const [loading, setLoading] = useState(false);

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(17, 24, 39)";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  };

  const [products, setProducts] = useState({
    title: null,
    price: null,
    imageUrl: null,
    category: null,
    description: null,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  //add product

  const addProduct = async () => {
    if (
      products.title == null ||
      products.price == null ||
      products.imageUrl == null ||
      products.category == null ||
      products.description == null
    ) {
      return toast.error("Please fill all fields");
    }
    const productRef = collection(fireDB, "products");
    setLoading(true);
    try {
      await addDoc(productRef, products);
      toast.success("Product added successfully");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
      getProductData();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      return toast.error("Error in adding Product");
    }
    setProducts("");
  };

  const [product, setProduct] = useState([]);

  //get product

  const getProductData = async () => {
    setLoading(true);
    try {
      const q = query(collection(fireDB, "products"), orderBy("time"));
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productsArray = [];
        QuerySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });
        });
        setProduct(productsArray);
        setLoading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error);
      setLoading(false);
      // return toast.error("Error in get Products");
    }
  };

  const handleEdit = (item) => {
    setProducts(item);
  };

  //update product

  const updateProduct = async (item) => {
    setLoading(true);

    try {
      await setDoc(doc(fireDB, "products", products.id), products);
      toast.success("Product Updated successfully");
      getProductData();
      setLoading(false);
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setProducts("");
  };

  // delete product

  const deleteProduct = async (item) => {
    setLoading(true);
    try {
      await deleteDoc(doc(fireDB, "products", item.id));
      toast.success("Product Deleted successfully");
      getProductData();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //get Order data

  const [order, setOrder] = useState([]);

  const getOrderData = async () => {
    setLoading(true);
    try {
      const result = await getDocs(collection(fireDB, "orders"));
      const ordersArray = [];
      result.forEach((order) => {
        ordersArray.push(order.data());
        setLoading(false);
      });

      setOrder(ordersArray);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // get user data

  const [user, setUser] = useState([]);

  const getUserData = async () => {
    setLoading(true);
    try {
      const result = await getDocs(collection(fireDB, "users"));
      const userArray = [];
      result.forEach((user) => {
        userArray.push(user.data());
        setLoading(false);
      });
      setUser(userArray);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductData();
    getOrderData();
    getUserData();
  }, []);

  const [searchKey, setSearchKey] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterPrice, setFilterPrice] = useState("");

  return (
    <myContext.Provider
      value={{
        mode,
        toggleMode,
        loading,
        setLoading,
        products,
        setProducts,
        addProduct,
        product,
        updateProduct,
        deleteProduct,
        handleEdit,
        order,
        user,
        searchKey,
        setSearchKey,
        filterPrice,
        setFilterPrice,
        filterType,
        setFilterType,
      }}
    >
      {props.children}
    </myContext.Provider>
  );
}

export default myState;
