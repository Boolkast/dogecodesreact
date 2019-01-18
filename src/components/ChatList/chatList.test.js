/* eslint-env jest */
import React from 'react';
import ReactDOM from 'react-dom';
import ChatList from './chatList';

jest.mock('../../utils/colors', () => () => 'colorFrom');
jest.mock('../ChatListItem/ChatListItem', () => () => 'ChatListItem');

const mockProps = {
  chatlist: [
    {
      _id: '123123',
      title: 'TITLE',
      createdAt: 'DATE DATE',
    },
  ],
  activeChat: {
    _id: '123123321321',
  },
  setActiveChat: jest.fn(),
  isConnected: true,
};
describe('<App />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ChatList {...mockProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
