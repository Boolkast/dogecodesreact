/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import AvatarComponent from './avatar';

jest.mock('../../utils/colors', () => () => 'colorFrom');

describe('<App />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AvatarComponent name="test" />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
