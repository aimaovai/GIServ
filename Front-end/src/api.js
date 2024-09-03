import axios from "axios";
const URL = "https://3c7c-2600-6c56-7f00-b936-7d5c-ca12-2f2f-ec27.ngrok.io"

const getProducts = async () => {
    return axios.get(`${URL}/getProducts`).then(res => res.data)
}

const addProduct = (product) => {
    return axios.post(`${URL}/addProduct`, product)
}

const deleteProduct = (product) => {
    return axios.post(`${URL}/deleteProduct`, product)
}

const getVendors = async () => {
    return axios.get(`${URL}/getVendors`).then(res => res.data)
}

const addVendor = (product) => {
    return axios.post(`${URL}/addVendor`, product)
}

const deleteVendor = (id) => {
    return axios.post(`${URL}/deleteVendor?id=${id}`)
}

const getEmployees = async () => {
    return axios.get(`${URL}/getEmployees`).then(res => res.data)
}

const addEmployee = (product) => {
    return axios.post(`${URL}/addEmployee`, product)
}

const deleteEmployee = (id) => {
    return axios.post(`${URL}/deleteEmployee?id=${id}`)
}


const getOrders = async () => {
    return axios.get(`${URL}/getOrders`).then(res => res.data)
}

const addOrder = (product) => {
    return axios.post(`${URL}/addOrder`, product)
}

const deleteOrder = (id) => {
    return axios.post(`${URL}/deleteOrder?id=${id}`)
}

const deleteVehicle = (id) => {
    return axios.post(`${URL}/deleteVehicle?id=${id}`)
}

const getVehicles = async () => {
    return axios.get(`${URL}/getVehicles`).then(res => res.data)
}

const addVehicle = (product) => {
    return axios.post(`${URL}/addVehicle`, product)
}

const api = {
    getProducts, addProduct, deleteProduct, getOrders,
    getEmployees, getVendors, addEmployee, addOrder,
    addVendor, deleteOrder, deleteVendor, deleteEmployee,
    addVehicle, getVehicles, deleteVehicle
}

export default api;
