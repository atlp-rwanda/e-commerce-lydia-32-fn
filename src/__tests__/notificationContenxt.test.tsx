import React from 'react';
import { render } from '@testing-library/react';
import sellerNotificationSlice from '../slices/notificationSlice/notificationSlice';
import Notification from '../Components/seller/Notification';

describe('sellerNotificationSlice', () => {
  const initialState = {
    sellernotificationsInfo: [],
    unReadCount: 0,
  };

  describe('App Component', () => {
    test('renders without crashing', () => {
      render(
        <Notification 
          icon="example-icon" 
          message="example message" 
          time="example time" 
          status={true} 
        />
      );
      expect(true).toBeTruthy();
    });
  });

  it('should return the initial state', () => {
    expect(sellerNotificationSlice(undefined, { type: '' })).toEqual(initialState);
  });
});
