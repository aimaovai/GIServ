import React, { useEffect, useState } from "react";
import api from "../api";
import Layout from "../components/Layout";
import handleForm from "../helper";
import { checkLoggedIn } from "../helper/AuthHelper";

export default function Vendor() {
  const [Vendors, setVendors] = useState(null);
  const [form, setForm] = useState({
    name: "",
    status: true,
  });

  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
  });

  useEffect(() => {
    checkLoggedIn();

    getAllVendors();
  }, []);

  const newVendor = () => {
    console.log(form);

    if (form.name === "") {
      alert("Fields Cannot Be Empty");
      return;
    }

    api.addVendor(form).then((res) => {
      getAllVendors();
      alert("Successfully Vendor Added");
      setForm({
        name: null,
        status: true,
      });
    });
  };

  const getAllVendors = async () => {
    let Vendors = await api.getVendors();
    console.log(Vendors);
    let active = 0,
      inactive = 0;

    Vendors.map((vendor) => {
      vendor.status ? (active += 1) : (inactive += 1);
    });

    setStats({
      total: Vendors.length,
      active,
      inactive,
    });
    setVendors(Vendors);
  };

  const removeVendor = (id) => {
    api.deleteVendor(id).then((res) => {
      getAllVendors();
      alert("Successfully Vendor Removed");
    });
  };

  const update = (data) => {
    let tempData = {
      ...data,
      status: !data.status,
    };
    api.addVendor(tempData).then((res) => {
      getAllVendors();
    });
  };

  return (
    <Layout>
      <div data-testid="vend" className="flex justify-around">
        <div className="h-20 w-36 bg-blue-50 rounded-lg text-blue-500 text-center p-2">
          <p className="text-4xl">{stats.total}</p>
          <p className="text-sm">Total</p>
        </div>
        <div className="h-20 w-36 bg-green-50 rounded-lg text-green-500 text-center p-2">
          <p className="text-4xl">{stats.active}</p>
          <p className="text-sm">Active</p>
        </div>
        <div className="h-20 w-36 bg-red-50 rounded-lg text-red-500 text-center p-2">
          <p className="text-4xl">{stats.inactive}</p>
          <p className="text-sm">InActive</p>
        </div>
      </div>

      <div data-testid="vendinsert" className="flex gap-2 pt-5 pb-2 justify-center">
        <input
          type="text"
          placeholder="name"
          name="name"
          className="h-10 outline-none bg-slate-100 text-center rounded-md"
          onChange={(e) => setForm(handleForm(e, form))}
        />
        <button
          data-testid="insert-button"
          className="bg-blue-600 h-10 rounded-md text-white text-sm text-center px-3"
          onClick={() => newVendor()}
        >
          Add Vendor
        </button>
      </div>

      <table data-testid="ids" className="w-full text-center my-6 rounded-md bg-slate-50 ">
        <thead>
          <tr className="">
            <th>Id</th>
            <th>Name</th>
            <th>Items</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Vendors &&
            Vendors.map((vendor) => {
              return (
                <tr className="py-3">
                  <td>{vendor.id}</td>
                  <td>{vendor.name}</td>
                  <td>{vendor.items}</td>
                  <td>
                    {vendor.status ? "Active" : "InActive"}
                    <button
                      onClick={() => update(vendor)}
                      className="text-sm bg-green-300 p-1 rounded-md m-1"
                    >
                      Change
                    </button>
                  </td>
                  <td>
                    <button
                      className="text-sm bg-red-50 text-red-500 px-2 py-1 rounded-md"
                      onClick={() => removeVendor(vendor.id)}
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
