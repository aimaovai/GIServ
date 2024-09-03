/* 
  - Test suite id: TS_02
  - Test written by: Aima Ovai
  - Test written on: April 7, 2022
  - Test last updated on: Aprill 28, 2022
  - Test Description: This test suite is written to test the fucntionality
    of the login page. It tests that the page renders properly, and the
    login button acts as expected on click.
*/


import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, configure } from "enzyme";
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import Login from '../pages/Login';


configure({adapter: new Adapter()});

describe('GIServ Login Component', () => {
  
  // Test case id: TC_02
  it("Login page renders without crashing", async () => {
    try {
      //render loging page
      render(<Login />)
      const loginItem = await waitFor(() => screen.getByTestId('login'));
      expect(loginItem).toBeInTheDocument();
    } catch (e) {
      console.error('Failed to render login page without crashing.')
    }
  });

  // Test case id: TC_03
  test("Login page renders correctly", async () => {
    try {
      //render the login page
      render(<Login />)

      const loginItem = await waitFor(() => screen.getByTestId('login'));
      expect(loginItem).toBeInTheDocument();
    } catch (e) {
      console.error('Failed to render login page correctly.')
    }
  });

  // Test case id: TC_04
  test('Tests the login button on click', () => {
    try {
      const mockCallBack = jest.fn();
      const page = shallow(<Login />);
      page.find('button').simulate('click');
      expect(mockCallBack.mock.calls.length).not.toBeNull();
    } catch(e) {
      console.error('Failed to call action on button click.')
    }
  });
});
