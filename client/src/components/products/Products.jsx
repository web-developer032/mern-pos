import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import Add from "../products/Add";
import { useNavigate } from "react-router-dom";

const Products = ({ products, setProducts, categories, filtered, searched }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/products/get-all");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, []);

  return (
    <>
      <div className="products-wrapper grid grid-cols-card gap-4 ">
        {filtered
          .filter((product) => product.title.toLowerCase().includes(searched))
          .map((item, i) => (
            <ProductItem item={item} key={i} />
          ))}
      </div>
      <div
        className="product-item bg-blue-600	 border hover:shadow-lg cursor-pointer transition-all select-none whitespace-nowrap md:text-xl text-white py-3 px-6 hover:opacity-90"
        onClick={() => setIsAddModalOpen(true)}
      >
        <PlusOutlined />
        Add Product
      </div>
      <div
        className="product-item bg-fuchsia-600 border hover:shadow-lg cursor-pointer transition-all select-none whitespace-nowrap md:text-xl text-white py-3 px-6 hover:opacity-90"
        onClick={() => navigate("/products")}
      >
        <EditOutlined />
        Edit Product
      </div>

      <Add
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        products={products}
        setProducts={setProducts}
        categories={categories}
      />
    </>
  );
};

export default Products;
