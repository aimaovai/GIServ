/* 
  - Test suite id: TS_05
  - Test suite written by: Aima Ovai
  - Test suite written on: April 7, 2022
  - Test suite last updated on: April 28, 2022
  - Test Description: This test suite is written to test the fucntionality
    of the Order webpage. It tests that the page renders properly, 
    and that the order details are being retreived from the database. 
*/

import React from "react";
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow, mount, configure } from "enzyme";
import { render, screen, waitFor,fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Order from '../pages/Order';

// jest.mock('../helper/AuthHelper');

// const func = require('../helper/AuthHelper');

Enzyme.configure({adapter: new Adapter()});

describe('GIServ Order Component', () => {

  // Test case: TC_12
  test('user is logged in', () => {
    try {
      const loggedin = jest.fn().mockReturnValueOnce("loggedin");
      Storage.prototype.setItem = jest.fn(() => {
        console.log("isUserLoggedin")
      });

      checkLoggedIn.setItem("isUserLoggedin", loggedin);
      } catch (error) {
        console.log('User not logged in.')
      }
  })
  
  // Test case: TC_13
  it("Order renders without crashing", async () => {
    render(<Order />)

    // await expect(render(<Order />)).toMatchSnapshot()
      const orderItem = await waitFor(() => screen.getByTestId('order'));
      expect(orderItem).toBeInTheDocument();
  });

  // Test case: TC_14
  test('it displays a table for Orders', async () => {
    
      render(<Order />);

      const orderList = await waitFor(() => screen.getByTestId('orders'));
      expect(orderList).toBeInTheDocument();
  })

  // Test case: TC_15
  test('it retrieves data', async () => {
   
      render(<Order />);

      const orderList = await waitFor(() => screen.findAllByTestId('orders'));
      expect(orderList).toHaveLength(1);
  })

  // Test case: TC_16
  test('test Order insert button on click', () => {
    const { getByTestId } = render(<Order />);
    fireEvent.click(getByTestId('insert-order-button'));
    expect(getByTestId('orderinsert')).toHaveTextContent('Add Order');
  });

  // Test case: TC_17
  test('test that Order status toggle button exists', () => {

      const wrapper = mount(<Order />);
      const table = wrapper.find('table');
      const row = table.find('tr');
      const togleButton = table.find('toggle-button');

      expect(table).toHaveLength(1);
      expect(row).toHaveLength(1);
      expect(togleButton).not.toBeNull();
  });
})