const employee = {
    1:  { id: 3, name: 'Sowmit', role: 'Manager', present: true },
    2:  { id: 4, name: 'Vinay', role: 'Accountant', present: false },
    3:  { id: 6, name: 'Shiva', role: 'Supplier', present: true },
    4:  { id: 8, name: 'Siva', role: 'Marketing', present: false },
    5:  { id: 9, name: 'aima', role: 'manager', present: false },
    6:  { id: 10, name: 'devi', role: 'audit', present: false },
    7:  { id: 11, name: 'Veera', role: 'Admin', present: true }
}


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

module.exports = { employee };