import React, { useEffect, useState } from "react";
import api from "../api";
import Layout from "../components/Layout";
import handleForm from "../helper";
import { checkLoggedIn } from "../helper/AuthHelper";

export default function Employee() {
  const [employees, setEmployees] = useState(null);
  const [form, setForm] = useState({
    name: "",
    role: "",
  });

  const [stats, setStats] = useState({
    total: 0,
    free: 0,
    notfree: 0,
  });

  useEffect(() => {
    checkLoggedIn();    

    getAllEmployees();
  }, []);

  const newEmployee = () => {
    console.log(form);

    if(form.name === "" || form.role === ""){
      alert("Fields Cannot Be Empty")
        return;
    }
    api.addEmployee(form).then((res) => {
      getAllEmployees();
      alert("Successfully Employee Added");
      setForm({
        name: "",
        role: "",
        present: true,
      });
    });
  };

  const getAllEmployees = async () => {
    let employees = await api.getEmployees();
    console.log(employees);

    let free = 0,
    notfree = 0;

  employees.map((employee) => {
    employee.present ? (free += 1) : (notfree += 1);
  });

  setStats({
    total: employees.length,
    free,
    notfree,
  });

    setEmployees(employees);
  };

  const removeEmployee = (id) => {
    api.deleteEmployee(id).then((res) => {
      getAllEmployees();
      alert("Successfully Employee Removed");
    });
  };

  const update = (data) => {
    let tempData = {
      ...data,
      present: !data.present,
    };
    api.addEmployee(tempData).then((res) => {
      getAllEmployees();
    });
  };

  return (
    <Layout>
      <div data-testid="emp" className="flex justify-around">
        <div className="h-20 w-36 bg-blue-50 rounded-lg text-blue-500 text-center p-2">
          <p className="text-4xl">{stats.total}</p>
          <p className="text-sm">Total</p>
        </div>
        <div className="h-20 w-36 bg-green-50 rounded-lg text-green-500 text-center p-2">
          <p className="text-4xl">{stats.free}</p>
          <p className="text-sm">Present</p>
        </div>
        <div className="h-20 w-36 bg-red-50 rounded-lg text-red-500 text-center p-2">
          <p className="text-4xl">{stats.notfree}</p>
          <p className="text-sm">Absent</p>
        </div>
      </div>

      <div data-testid="empinsert" className="flex gap-2 pt-5 pb-2 justify-center">
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
          placeholder="role"
          name="role"
          value={form.role}
          className="h-10 outline-none bg-slate-100 text-center rounded-md"
          onChange={(e) => setForm(handleForm(e, form))}
        />
        <button
          data-testid="insert-button"
          className="bg-blue-600 h-10 rounded-md text-white text-sm text-center px-3"
          onClick={() => newEmployee()}
        >
          Add Employee
        </button>
      </div>
      <table data-testid="roles" className="w-full text-center my-2 rounded-md bg-slate-50 ">
        <thead>
          <tr className="">
            <th>Id</th>
            <th>Name</th>
            <th>Role</th>
            <th>Present</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees &&
            employees.map((employee) => {
              return (
                <tr className="py-3">
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.role}</td>
                  <td data-testid="status">
                    {employee.present ? "Yes" : "No"}
                    <button
                      data-testid="toggle-button"
                      onClick={() => update(employee)}
                      className="text-sm bg-green-300 p-1 rounded-md m-1"
                    >
                      Change
                    </button>
                  </td>
                  <td data-testid="button-action">
                    <button
                      data-testid="remove-button"
                      className="text-sm bg-red-50 text-red-500 px-2 py-1 rounded-md"
                      onClick={() => removeEmployee(employee.id)}
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
