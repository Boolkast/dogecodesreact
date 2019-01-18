/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import AppBar from './AppBar';

jest.mock('../Avatar/avatar', () => () => 'AvatarComponent');

const mockProps = {
  activeUser: {
    isMember: false,
    isCreator: false,
    isChatMember: false,
  },
  activeChat: {
    _id: '123123',
    title: 'TITLE',
  },
  logout: jest.fn(),
  leaveChat: jest.fn(),
  deleteChat: jest.fn(),
  editUser: jest.fn(),
  isConnected: true,
};

describe('<AppBar />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AppBar {...mockProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
