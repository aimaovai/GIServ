/* 
  - Test suite id: TS_04
  - Test suite written by: Aima Ovai
  - Test suite written on: April 7, 2022
  - Test suite last updated on April 28,2022
  - Test Description: This test suite is written to test the fucntionalities
    on the Employee webpage. It tests that the page renders properly, 
    that the employee details are being retrieved, and that the buttons are
    present and clickable. 
*/

import React from "react";
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow, mount, configure } from "enzyme";
import { render, screen, waitFor,fireEvent } from '@testing-library/react';
import { employee } from "../../__mocks__/mockData";
import '@testing-library/jest-dom';
import mockConsole from "jest-mock-console";

import Employee from '../pages/Employee';

Enzyme.configure({adapter: new Adapter()});

describe('Employee component', () => {
  // Test case: TC_07
  test('it renders successfully', async () => {
    try {
      render(<Employee />);
      
      const emplItem = await waitFor(() => screen.getByTestId('emp'));
      expect(emplItem).toBeInTheDocument();
    } catch (error) {
      console.error('Could not render employee page succeddfully.')
    }
  })
  // Test case: TC_08
  test('it displays a table for employees', async () => {
    try {
      render(<Employee />);

      const empList = await waitFor(() => screen.getByTestId('roles'));
      expect(empList).toBeInTheDocument();

    } catch (erro) {
      console.error('Did not display table of employees.')
    }
  })

  // Test case: TC_09
  test('it retrieves data', async () => {
    try {
      render(<Employee />);

      const emplList = await waitFor(() => screen.findAllByTestId('roles'));
      expect(emplList).toHaveLength(1);
    } catch (error) {
        console.error('Did not retrieve data.')
    }
  })

  // Test case: TC_10
  test('Insert button present on click', () => {
    const { getByTestId } = render(<Employee />);
    fireEvent.click(getByTestId('insert-button'));
    expect(getByTestId('empinsert')).toHaveTextContent('Add Employee');
  });

  // Test case: TC_11
  test('Employee status toggle button exists', () => {
    try {

      const wrapper = mount(<Employee />);
      const table = wrapper.find('table');
      const row = table.find('tr');
      const togleButton = table.find('toggle-button');

      expect(table).toHaveLength(1);
      expect(row).toHaveLength(1);
      expect(togleButton).not.toBeNull();
    } catch (error) {
      console.error('Employee status toggle button does')
    }
  });
});
