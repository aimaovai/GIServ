import React, { useEffect, useState } from "react";
import api from "../api";
import Layout from "../components/Layout";
import handleForm from "../helper";
import { checkLoggedIn } from "../helper/AuthHelper";

export default function Product() {
  const [Product, setProduct] = useState(null);
  const [Vendors, setVendors] = useState(null);

  const [form, setForm] = useState({
    name: "",
    vendor: "",
    stock: "",
    price: "",
  });

  const [stats, setStats] = useState({
    total: 0,
    free: 0,
    notfree: 0,
  });

  useEffect(() => {
    checkLoggedIn();    

    getAllProduct();
    getAllVendors();
  }, []);

  const newProduct = () => {
    console.log(form);

    if(form.name === "" || form.stock === "" || form.price === ""){
      alert("Fields Cannot Be Empty")
        return;
    }

    api.addProduct(form).then((res) => {
      getAllProduct();
      alert("Successfully Product Added");
      setForm({
        name: "",
        vendor: "Select Vendor",
        stock: "",
        price: "",
      });
    });
  };

  const getAllProduct = async () => {
    let Product = await api.getProducts();
    console.log(Product);

    let free = 0,
      notfree = 0;

    Product.map((product) => {
      product.stock > 100 ? (free += 1) : (notfree += 1);
    });

    setStats({
      total: Product.length,
      free,
      notfree,
    });

    setProduct(Product);
  };

  const getAllVendors = async () => {
    let Vendors = await api.getVendors();
    console.log(Vendors);
    setVendors(Vendors);
  };

  const removeProduct = (product) => {
    api.deleteProduct(product).then((res) => {
      getAllProduct();
      alert("Successfully Product Removed");
    });
  };

  return (
    <Layout>
      <div data-testid="product" className="flex justify-around">
        <div className="h-20 w-36 bg-blue-50 rounded-lg text-blue-500 text-center p-2">
          <p className="text-4xl">{stats.total}</p>
          <p className="text-sm">Total</p>
        </div>
        <div className="h-20 w-36 bg-green-50 rounded-lg text-green-500 text-center p-2">
          <p className="text-4xl">{stats.free}</p>
          <p className="text-sm">Stock {">"} 100</p>
        </div>
        <div className="h-20 w-36 bg-red-50 rounded-lg text-red-500 text-center p-2">
          <p className="text-4xl">{stats.notfree}</p>
          <p className="text-sm">Stock {"<"} 100</p>
        </div>
      </div>
      <div data-testid="productinsert" className="flex gap-2 pt-5 pb-2 justify-center">
        <input
          type="text"
          placeholder="name"
          name="name"
          className="h-10 outline-none bg-slate-100 text-center rounded-md"
          onChange={(e) => setForm(handleForm(e, form))}
        />
        <input
          type="text"
          placeholder="stock"
          name="stock"
          className="h-10 outline-none bg-slate-100 text-center rounded-md"
          onChange={(e) => setForm(handleForm(e, form))}
        />
        <input
          type="text"
          placeholder="price"
          name="price"
          className="h-10 outline-none bg-slate-100 text-center rounded-md"
          onChange={(e) => setForm(handleForm(e, form))}
        />
        <select
          className="outline-none bg-slate-100 rounded-md px-3"
          name="vendor"
          value={form.vendor}
          onChange={(e) => {
            setForm(handleForm(e, form));
          }}
        >
          {Vendors &&
            Vendors.map((vendor) => {
              return <option value={vendor.name}>{vendor.name}</option>;
            })}
        </select>
        <button
          data-testid="insert-button"
          className="bg-blue-600 h-10 rounded-md text-white text-sm text-center px-3"
          onClick={() => newProduct()}
        >
          Add Product
        </button>
      </div>
      <table data-testid="products" className="w-full text-center my-6 rounded-md bg-slate-50 ">
        <thead>
          <tr>
            <th>Id</th>
            <th>Item</th>
            <th>Vendor</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Product &&
            Product.map((product) => {
              return (
                <tr className="py-3 ">
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.vendor}</td>
                  <td>{product.stock}</td>
                  <td>{product.price}</td>
                  <td>
                    <button
                      data-testid="toggle-button"
                      className="text-sm bg-red-50 text-red-500 px-2 py-1 rounded-md"
                      onClick={() => removeProduct(product)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </Layout>
  );
}
