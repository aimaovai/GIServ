import React, { useEffect, useState } from "react";
import api from "../api";
import Layout from "../components/Layout";
import handleForm from "../helper";
import { checkLoggedIn } from "../helper/AuthHelper";

export default function Order() {
  const [Order, setOrder] = useState(null);
  const [Products, setProducts] = useState(null);

  const [form, setForm] = useState({
    name: "",
    vendor: "",
    quantity: "",
    value: 0,
    shippingdetails: "",
    shipped: false,
  });

  useEffect(() => {
    checkLoggedIn();

    getAllOrder();
    getAllProducts();
  }, []);

  const newOrder = () => {
    console.log(form);

    if (
      form.vendor === "" ||
      form.shippingdetails === "" ||
      form.quantity === "" ||
      form.value === ""
    ) {
      alert("Fields Cannot Be Empty");
      return;
    }

    api.addOrder(form).then((res) => {
      getAllOrder();
      alert("Successfully Order Added");
      setForm({
        name: "",
        vendor: "",
        stock: "",
        product:"",
        value: 0,
        shippingdetails: "",
        shipped: false,
      });
    });
  };

  const [stats, setStats] = useState({
    total: 0,
    free: 0,
    notfree: 0,
  });

  const getAllOrder = async () => {
    let Order = await api.getOrders();
    console.log(Order);

    let free = 0,
      notfree = 0;

    Order.map((order) => {
      order.shipped ? (free += 1) : (notfree += 1);
    });

    setStats({
      total: Order.length,
      free,
      notfree,
    });

    setOrder(Order);
  };

  const getAllProducts = async () => {
    let Products = await api.getProducts();
    console.log(Products);
    setProducts([{ name: "Select Product" }, ...Products]);
  };

  const removeOrder = (Order) => {
    api.deleteOrder(Order).then((res) => {
      getAllOrder();
      alert("Successfully Order Removed");
    });
  };

  const handleOrder = (e) => {
    if (e.target.value === "Select Product") {
      setForm({ ...form, value: 0 });
      return;
    }

    setForm(handleForm(e, form));

    Products.map((product) => {
      if (e.target.value === product.name) {
        setForm({
          ...form,
          product: e.target.value,
          vendor: product.vendor,
          value: form.quantity * product.price,
        });
      }
    });
  };

  const changeForm = (e) => {
    Products.map((product) => {
      if (form.product === product.name) {
        setForm({
          ...form,
          value: e.target.value * product.price,
        });
      }
    });
  }

  const update = (data) => {
    let tempData = {
      ...data,
      shipped: !data.shipped,
    };
    api.addOrder(tempData).then((res) => {
      getAllOrder();
    });
  };

  return (
    <Layout>
      <div data-testid="order" className="flex justify-around">
        <div className="h-20 w-36 bg-blue-50 rounded-lg text-blue-500 text-center p-2">
          <p className="text-4xl">{stats.total}</p>
          <p className="text-sm">Total</p>
        </div>
        <div className="h-20 w-36 bg-green-50 rounded-lg text-green-500 text-center p-2">
          <p className="text-4xl">{stats.free}</p>
          <p className="text-sm">Shipped</p>
        </div>
        <div className="h-20 w-36 bg-red-50 rounded-lg text-red-500 text-center p-2">
          <p className="text-4xl">{stats.notfree}</p>
          <p className="text-sm">Not Shipped</p>
        </div>
      </div>

      <div data-testid="orderinsert" className="flex gap-2 pt-5 pb-2 justify-center">
        <input
          type="text"
          placeholder="quantity"
          name="quantity"
          className="h-10 outline-none bg-slate-100 text-center rounded-md"
          onChange={(e) => {
            setForm(handleForm(e, form))
            changeForm(e)
          }}
        />
        <select
          className="outline-none bg-slate-100 rounded-md px-3"
          name="product"
          onChange={(e) => {
            handleOrder(e);
          }}
        >
          {Products &&
            Products.map((product) => {
              return <option value={product.name}>{product.name}</option>;
            })}
        </select>
        <input
          type="text"
          placeholder="total"
          name="value"
          value={form.value}
          disabled
          className="h-10 outline-none bg-slate-100 text-center rounded-md"
        />

        <input
          type="text"
          placeholder="shippingdetails"
          name="shippingdetails"
          className="h-10 outline-none bg-slate-100 text-center rounded-md"
          onChange={(e) => setForm(handleForm(e, form))}
        />

        <button
          data-testid="insert-order-button"
          className="bg-blue-600 h-10 rounded-md text-white text-sm text-center px-3"
          onClick={() => newOrder()}
        >
          Add Order
        </button>
      </div>

      <table data-testid="orders" className="w-full text-center my-6 rounded-md bg-slate-50 ">
        <thead>
          <tr>
            <th>Id</th>
            <th>Item</th>
            <th>Quantity</th>
            <th>Value</th>
            <th>Address</th>
            <th>Shipped</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Order &&
            Order.map((order) => {
              return (
                <tr>
                  <td>{order.id}</td>
                  <td>{order.product}</td>
                  <td>{order.quantity}</td>
                  <td>{order.value}</td>
                  <td>{order.shippingdetails}</td>
                  <td>
                    {order.shipped ? "Yes" : "No"}
                    <button
                      data-testid="toggle-button"
                      onClick={() => update(order)}
                      className="text-sm bg-green-300 p-1 rounded-md m-1"
                    >
                      Change
                    </button>
                  </td>
                  <td>
                    <button
                      className="text-sm bg-red-50 text-red-500 px-2 py-1 rounded-md"
                      onClick={() => removeOrder(order.id)}
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
