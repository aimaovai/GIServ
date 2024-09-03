/*
  - Test suite id: TS_07
  - Test suite written by: Aima Ovai
  - Test suite written on: April 7, 2022
  - Test suite last updated on: April 28, 2022
  - Test Description: This test suite was created to test that the webpage 
    which contains the vendors renders correctlyand without crashing. It
    also contains test cases that check to ensure that the vendor data are 
    being retrieved from the database and are being displayed in the table.
*/

import React from "react";
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow, mount, configure } from "enzyme";
import { render, screen, waitFor,fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Vendor from '../pages/Vendor';

// jest.mock("..helper/AuthHelper", () => jest.fn());
Enzyme.configure({adapter: new Adapter()});

describe('GIServ Vendor Component', () => {
  // test("Vendor renders without crashing", async () => {
  //   render(<Vendor />)
  //   await expect(render(<Vendor />)).toMatchSnapshot()
  // });

  //test that page renders 

  // Test case: TC_24
  test('it renders successfully', async () => {
    const emplPage = render(<Vendor />);

    const emplItem = await waitFor(() => screen.getByTestId('vend'));
    expect(emplItem).toBeInTheDocument();
  })

  // Test case: TC_25
  test('it displays a table for Vendors', async () => {
    render(<Vendor />);

    const empList = await waitFor(() => screen.getByTestId('ids'));
    expect(empList).toBeInTheDocument();
  })

  // Test case: TC_26
  test('it retrieves data', async () => {
    render(<Vendor />);

    const emplList = await waitFor(() => screen.findAllByTestId('ids'));
    expect(emplList).toHaveLength(1);
  })

  // Test case: TC_27
  test('test vendor insert button on click', () => {
    const { getByTestId } = render(<Vendor />);
    fireEvent.click(getByTestId('insert-button'));
    expect(getByTestId('vendinsert')).toHaveTextContent('Add Vendor');
  });

  // Test case: TC_28
  test('test that Vendor status toggle button exists', () => {

    const wrapper = mount(<Vendor />);
    const table = wrapper.find('table');
    const row = table.find('tr');
    const togleButton = table.find('toggle-button');

    expect(table).toHaveLength(1);
    expect(row).toHaveLength(1);
    expect(togleButton).not.toBeNull();
  });
})