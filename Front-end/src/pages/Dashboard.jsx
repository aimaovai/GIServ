import React from 'react';
import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import { checkLoggedIn } from "../helper/AuthHelper";
import api from "../api";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

export default function Dashboard() {
  const [stats, setStats] = useState({
    employees: [],
    orders: [],
    vehicles: [],
    vendors: [],
    sales: [],
  });

  const [unshippedOrders, setOrders] = useState(null);
  const [topProducts, setProducts] = useState(null);

  useEffect(async () => {
    checkLoggedIn();
    let employees = await api.getEmployees();
    let orders = await api.getOrders();
    let vehicles = await api.getVehicles();
    let vendors = await api.getVendors();

    let sales = 0;
    let unshipped = [];
    let products = [];

    orders.map((order) => {
      sales += order.value;
      if (!order.shipped) {
        unshipped.push(order);
      }

      if (order.value > 100) {
        products.push({
          id: order.id,
          product: order.product,
          value: order.value,
        });
      }
    });

    setOrders(unshipped);
    setProducts(products);

    setStats({
      employees: employees,
      orders: orders,
      vehicles: vehicles,
      vendors: vendors,
      sales,
    });
  }, []);

  return (
    <Layout>
      <div className="flex justify-around">
        <div data-testid="sales" className="h-20 w-36 bg-green-50 rounded-lg text-green-500 text-center p-2">
          <p className="text-4xl">${stats.sales}</p>
          <p className="text-sm" data-testid="sales-num">
            Sales
          </p>
        </div>
        <div className="h-20 w-36 bg-green-50 rounded-lg text-green-500 text-center p-2">
          <p className="text-4xl">{stats.orders.length}</p>
          <p className="text-sm">Orders</p>
        </div>
        <div className="h-20 w-36 bg-green-50 rounded-lg text-green-500 text-center p-2">
          <p className="text-4xl">{stats.vendors.length}</p>
          <p className="text-sm">Vendors</p>
        </div>
        <div className="h-20 w-36 bg-green-50 rounded-lg text-green-500 text-center p-2">
          <p className="text-4xl">{stats.employees.length}</p>
          <p className="text-sm">Employees</p>
        </div>
        <div className="h-20 w-36 bg-green-50 rounded-lg text-green-500 text-center p-2">
          <p className="text-4xl">{stats.vehicles.length}</p>
          <p className="text-sm">Vehicles</p>
        </div>
      </div>

      <div className="flex gap-2 justify-around mt-4">
        <p className="text-white">Unshipped Orders</p>
        <p className="text-white">High Value Orders</p>
      </div>

      <div className="flex gap-2">
        <table className="w-full text-center my-2 border-collapse rounded-md bg-slate-50">
          <thead>
            <tr>
              <th className="p-3 m-1 bg-slate-200">Id</th>
              <th className="p-3 m-1 bg-slate-200">Item</th>
              <th className="p-3 m-1 bg-slate-200">Quantity</th>
              <th className="p-3 m-1 bg-slate-200">Value</th>
            </tr>
          </thead>
          <tbody>
            {unshippedOrders &&
              unshippedOrders.map((order) => {
                return (
                  <tr>
                    <td>{order.id}</td>
                    <td>{order.product}</td>
                    <td>{order.quantity}</td>
                    <td>{order.value}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        <table className="w-full text-center my-2 border-collapse rounded-md bg-slate-50">
          <thead>
            <tr>
              <th className="p-3 m-1 bg-slate-200">Id</th>
              <th className="p-3 m-1 bg-slate-200">Item</th>
              <th className="p-3 m-1 bg-slate-200">Value</th>
            </tr>
          </thead>
          <tbody>
            {topProducts &&
              topProducts.map((order) => {
                return (
                  <tr>
                    <td className="">{order.id}</td>
                    <td className="">{order.product}</td>
                    <td className="">{order.value}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      <div className="flex bg-slate-50 rounded-md mt-4">
        <div className="flex w-[50%]">
          <Bar
            datasetIdKey="id"
            data={{
              labels: ["Employees"],
              datasets: [
                {
                  id: 1,
                  label: "Present Employees",
                  data: [
                    stats.employees.filter((vendor) => vendor.present === true)
                      .length,
                  ],
                  backgroundColor: "rgba(0, 255, 172, 0.7)",
                },
                {
                  id: 2,
                  label: "Absent Employees",
                  data: [
                    stats.employees.filter((vendor) => vendor.present === false)
                      .length,
                  ],
                  backgroundColor: "rgba(255, 99, 132, 0.7)",
                },
              ],
            }}
          />
        </div>
        <div className="flex w-[50%]">
          <Bar
            datasetIdKey="id"
            data={{
              labels: ["April"],
              datasets: [
                {
                  id: 1,
                  label: "Active Vendors",
                  data: [
                    stats.vendors.filter((vendor) => vendor.status === true)
                      .length,
                  ],
                  backgroundColor: "rgba(53, 162, 235, 0.7)",
                },
                {
                  id: 2,
                  label: "Inctive Vendors",
                  data: [
                    stats.vendors.filter((vendor) => vendor.status === false)
                      .length,
                  ],
                  backgroundColor: "rgba(255, 99, 132, 0.7)",
                },
              ],
            }}
          />
        </div>
      </div>

      <div className="flex bg-slate-50 rounded-md mt-6">
        <div className="flex w-[50%] px-6">
          <Pie
            datasetIdKey="id1"
            data={{
              labels: ["Shipped", "Unshipped"],
              datasets: [
                {
                  id: 1,
                  data: [
                    stats.orders.filter((order) => order.shipped === true)
                      .length,
                    stats.orders.filter((order) => order.shipped === false)
                      .length,
                  ],
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                  ],
                  borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                  ],
                },
                {
                  id: 2,
                  label: "Inctive Vendors",
                  data: [
                    stats.vendors.filter((vendor) => vendor.status === false)
                      .length,
                  ],
                  backgroundColor: "rgba(53, 162, 235, 0.7)",
                },
              ],
            }}
          />
        </div>

        <div className="flex w-[50%]">
          <Bar
            datasetIdKey="id"
            data={{
              labels: ["Vehicles"],
              datasets: [
                {
                  id: 1,
                  label: "Free Vehicles",
                  data: [
                    stats.vehicles.filter((vendor) => vendor.free === true)
                      .length,
                  ],
                  backgroundColor: "rgba(255, 131, 60, 0.7)",
                },
                {
                  id: 2,
                  label: "Occupied Vehicles",
                  data: [
                    stats.vehicles.filter((vendor) => vendor.free === false)
                      .length,
                  ],
                  backgroundColor: "rgba(53, 162, 235, 0.7)",
                },
              ],
            }}
          />
        </div>
      </div>
    </Layout>
  );
}
