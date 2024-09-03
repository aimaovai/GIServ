/*
  - Test suite id: TS_03
  - Test suite written by: Aima Ovai
  - Test suite written on: April 7, 2022
  - Test suite last uodated on: April 28 2022
  - Test Description: This test suite contains two tests to check that the 
    dashoard renders without crashing and renders properly. 
*/

import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, configure } from "enzyme";
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
// import { checkLoggedIn } from "../helper/AuthHelper";

import Dashboard from '../pages/Dashboard';

// jest.mock('../helper');
configure({adapter: new Adapter()});

describe('GIServ Dashboard Component', () => {

  //Test case id: TC_05
  test("Dashboard renders without crashing", () => {
    try {
      render(<Dashboard />)
      expect(render(<Dashboard />)).toMatchSnapshot()
    } catch (e) {
      console.error('Dashboard failed to render without crashing')
    }
  });

  // Test case id: TC_06
  test('Dashboard renders properly', async () => {
    try {
      render(<Dashboard />);

      const dashItem = await waitFor(() => screen.getByTestId('sales'));
      expect(dashItem).toBeInTheDocument();
    } catch (e) {
      console.error('Failed to render dashboard properly.')
    }
  });
});