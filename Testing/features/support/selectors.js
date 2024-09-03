// These are ways of being able to identify HTML elements to interact with and check.
const selectors = {
  links: {
    'Vendor': 'a[href="/vendor"]',
    'Order': 'a[href="/order"]',
    'Product': 'a[href="/product"]',
    'Employee': 'a[href="/employee"]',
    'Vehicles': 'a[href="/vehicles"]',
    Logout: 'a[href="/"]',
  },
  buttons: {
    'Add Vendor': 'button.bg-blue-600',
    'Add Order': 'button.bg-blue-600',
    'Add Product': 'button.bg-blue-600',
    'Add Employee': 'button.bg-blue-600',
    'Add Vehicle': 'button.bg-blue-600',
    Login: 'button',
  },
  texts: {
  }
};

module.exports = selectors;
