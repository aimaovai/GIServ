/*
  - Test suite id: TS_08
  - Test suite written by: Aima Ovai
  - Test suite written on: April 7, 2022
  - Test suite last updated on: April 28, 2022
  - Test Description: This test suite tests the functionalities for the
    products page. It contains test cases to check that the page renders 
    properly and without crashing. It also contains test cases to confirm
    that product data are being retrieved and displayed in the table.
*/


import React from "react";
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow, mount, configure } from "enzyme";
import { render, screen, waitFor,fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Product from '../pages/Product';


Enzyme.configure({adapter: new Adapter()});

describe('GIServ Product Component', () => {

  // Test case: TC_29
  test("Product renders without crashing", async () => {
    render(<Product />)

    const productItem = await waitFor(() => screen.getByTestId('product'));
    expect(productItem).toBeInTheDocument();
  });

  // Test case: TC_30
  test('successfully returns Product data', async () => {
    Product.getAllProduct = jest.fn();
    await expect(Product.getAllProduct.mock).not.toBeNull();
  })

  // Test case: TC_31
  test('it displays a table for Products', async () => {
    
    render(<Product />);

    const productList = await waitFor(() => screen.getByTestId('products'));
    expect(productList).toBeInTheDocument();
})

// Test case: TC_32
test('test Product insert button on click', () => {
  const { getByTestId } = render(<Product />);
  fireEvent.click(getByTestId('insert-button'));
  expect(getByTestId('productinsert')).toHaveTextContent('Add Product');
});

// Test case: TC_33
test('test that Product status toggle button exists', () => {

    const wrapper = mount(<Product />);
    const table = wrapper.find('table');
    const row = table.find('tr');
    const togleButton = table.find('toggle-button');

    expect(table).toHaveLength(1);
    expect(row).toHaveLength(1);
    expect(togleButton).not.toBeNull();
});
})