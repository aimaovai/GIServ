/*
  - Test suite id: TS_06
  - Test suite written by: Aima Ovai
  - Test suite written on: April 7, 2022
  - Test suite last updated on: April 28, 2022
  - Test Description: This test suite was created to confirm that the Vehicles
    webpage renders properly and without crashing. It also contains test cases
    that check that the data for the vehicles are being retrieved and are displayed
    in the table.
*/

import React from "react";
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow, mount, configure } from "enzyme";
import { render, screen, waitFor,fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Vehicle from '../pages/Vehicle';

// jest.mock('../helper/AuthHelper');

// const func = require('../helper/AuthHelper');

Enzyme.configure({adapter: new Adapter()});

describe('GIServ Vehicle Component', () => {

  // Test case: TC_18
  it('user is logged in', () => {
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
  
  // Test case: TC_19
  it("Vehicle renders without crashing", async () => {
    render(<Vehicle />)

    // await expect(render(<Vehicle />)).toMatchSnapshot()
    const vehiclelItem = await waitFor(() => screen.getByTestId('vehicles'));
      expect(vehiclelItem).toBeInTheDocument();
  });

  // Test case: TC_20
  test('it displays a table for Vehicles', async () => {
    
      render(<Vehicle />);

      const vehicleList = await waitFor(() => screen.getByTestId('vehicles'));
      expect(vehicleList).toBeInTheDocument();
  })

  // Test case: TC_21
  test('it retrieves data', async () => {
   
      render(<Vehicle />);

      const vehicleList = await waitFor(() => screen.findAllByTestId('vehicles'));
      expect(vehicleList).toHaveLength(1);
  })

  // Test case: TC_22
  test('test Vehicle insert button on click', () => {
    const { getByTestId } = render(<Vehicle />);
    fireEvent.click(getByTestId('vinsert-button'));
    expect(getByTestId('vehinsert')).toHaveTextContent('Add Vehicle');
  });

  // Test case: TC_23
  test('test that Vehicle status toggle button exists', () => {

      const wrapper = mount(<Vehicle />);
      const table = wrapper.find('table');
      const row = table.find('tr');
      const togleButton = table.find('toggle-button');

      expect(table).toHaveLength(1);
      expect(row).toHaveLength(1);
      expect(togleButton).not.toBeNull();
  });
})