const employee = [
  { id: 3, name: 'Sowmit', role: 'Manager', present: true },
  { id: 4, name: 'Vinay', role: 'Accountant', present: false },
  { id: 6, name: 'Shiva', role: 'Supplier', present: true },
  { id: 8, name: 'Siva', role: 'Marketing', present: false },
  { id: 9, name: 'aima', role: 'manager', present: false },
  { id: 10, name: 'devi', role: 'audit', present: false },
  { id: 11, name: 'Veera', role: 'Admin', present: true }
]

  const vehicle = [
    { id: 2, name: 'Safari', number: 3622, free: true },
    { id: 3, name: 'Jeep', number: 3654, free: true },
    { id: 4, name: 'Audi', number: 1500, free: true },
    { id: 6, name: 'Ford F150', number: 7645, free: true },
    { id: 7, name: 'BMW', number: 5432, free: true }
  ]



  // const path = require('path');

  // const checkLoggedIn = jest.createMockFromModule('checkLoggedIn');

  // let mockFiles = Object.create(null);
  // function __setMockFiles(newMockFiles) {
    

  // }

// const  Employee = async() => {
//   const getAllEmployees = emp => {
//     return new Promise((resolve, reject) => {
//       const empData = _.filter(employee, obj => {
//         return obj.id === emp;
//       });
  
//       if (empData) {
//         resolve({ data: empData});
//       } else {
//         reject({ error: 'Employee not found.'});
//       }
//     });
//   };
// // }

module.exports = { employee, vehicle };