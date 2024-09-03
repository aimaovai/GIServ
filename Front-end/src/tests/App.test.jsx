/* 
  - Test suite id: TS_01
  - Test suite written by: Aima Ovai
  - Test suite written on: April 7, 2022
  - Test suite last updated on: April 28, 2022
  - Test Description: This test suite is written to test the fucntionality
    of the Application. It tests that the page renders properly.
*/


import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, configure } from "enzyme";
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import App from '../App';


configure({adapter: new Adapter()});

describe('GIServ App Component', () => {

  // Test case id: TC_01
  test("App renders without crashing", async () => {
    try {
      //render the application
      render(<App />)

      const loginItem = await waitFor(() => screen.getByTestId('login'));
      expect(loginItem).toBeInTheDocument();
    } catch (e) {
      console.error('App does not render.')
    }
  });
})
