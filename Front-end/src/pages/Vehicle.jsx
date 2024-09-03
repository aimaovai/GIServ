import React, { useEffect, useState } from "react";
import api from "../api";
import Layout from "../components/Layout";
import handleForm from "../helper";
import { checkLoggedIn } from "../helper/AuthHelper";

export default function Vehicle() {
  const [Vehicles, setVehicles] = useState(null);
  const [form, setForm] = useState({
    name: "",
    number: "",
    free: true,
  });

  const [stats, setStats] = useState({
    total: 0,
    free: 0,
    notfree: 0,
  });

  useEffect(() => {
    checkLoggedIn();    

    getAllVehicles();
  }, []);

  const newVehicle = () => {

    if(form.name === "" || form.number === ""){
      alert("Fields Cannot Be Empty")
        return;
    }

    console.log(form);
    api.addVehicle(form).then((res) => {
      getAllVehicles();
      alert("Successfully Vehicle Added");
      setForm({
        name: "",
        number: "",
        free: true,
      });
    });
  };

  const getAllVehicles = async () => {
    let Vehicles = await api.getVehicles();
    console.log(Vehicles);

    let free = 0,
      notfree = 0;

    Vehicles.map((vehicle) => {
      vehicle.free ? (free += 1) : (notfree += 1);
    });

    setStats({
      total: Vehicles.length,
      free,
      notfree,
    });
    setVehicles(Vehicles);
  };

  const removeVehicle = (id) => {
    api.deleteVehicle(id).then((res) => {
      getAllVehicles();
      alert("Successfully Vehicle Removed");
    });
  };

  const update = (data) => {
    let tempData = {
      ...data,
      free: !data.free,
    };
    api.addVehicle(tempData).then((res) => {
      getAllVehicles();
    });
  };

  return (
    <Layout>
      <div className="flex justify-around">
        <div className="h-20 w-36 bg-blue-50 rounded-lg text-blue-500 text-center p-2">
          <p className="text-4xl">{stats.total}</p>
          <p className="text-sm">Total</p>
        </div>
        <div className="h-20 w-36 bg-green-50 rounded-lg text-green-500 text-center p-2">
          <p className="text-4xl">{stats.free}</p>
          <p className="text-sm">Available</p>
        </div>
        <div className="h-20 w-36 bg-red-50 rounded-lg text-red-500 text-center p-2">
          <p className="text-4xl">{stats.notfree}</p>
          <p className="text-sm">Not Available</p>
        </div>
      </div>


      <div data-testid="vehinsert" className="flex gap-2 pt-5 pb-2 justify-center">
        <input
          type="text"
          placeholder="name"
          name="name"
          value={form.name}
          className="h-10 outline-none bg-slate-100 text-center rounded-md"
          onChange={(e) => setForm(handleForm(e, form))}
        />
        <input
          type="text"
          placeholder="number"
          name="number"
          value={form.number}
          className="h-10 outline-none bg-slate-100 text-center rounded-md"
          onChange={(e) => setForm(handleForm(e, form))}
        />
        <button
          data-testid="vinsert-button"
          className="bg-blue-600 h-10 rounded-md text-white text-sm text-center px-3"
          onClick={() => newVehicle()}
        >
          Add Vehicle
        </button>
      </div>
      <table data-testid="vehicles" className="w-full text-center my-2 rounded-md bg-slate-50 ">
        <thead>
          <tr className="">
            <th>Id</th>
            <th>Name</th>
            <th>Number</th>
            <th>Available</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Vehicles &&
            Vehicles.map((Vehicle) => {
              return (
                <tr className="py-3">
                  <td>{Vehicle.id}</td>
                  <td>{Vehicle.name}</td>
                  <td>{Vehicle.number}</td>
                  <td>
                    {Vehicle.free ? "Yes" : "No"}
                    <button
                      data-testid="toggle-button"
                      onClick={() => update(Vehicle)}
                      className="text-sm bg-green-300 p-1 rounded-md m-1"
                    >
                      Change
                    </button>
                  </td>
                  <td>
                    <button
                      className="text-sm bg-red-50 text-red-500 px-2 py-1 rounded-md"
                      onClick={() => removeVehicle(Vehicle.id)}
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
