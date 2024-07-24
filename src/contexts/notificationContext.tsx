// import React, { createContext, useContext, useEffect, useRef } from 'react';
// import { useSelector } from 'react-redux';
// import { RootState } from '../store';
// import { notify } from '../utils/notifyUsers';
// const getSeenNotifications = () => {
//   const seen = localStorage.getItem('seenNotifications');
//   return seen ? new Set(JSON.parse(seen)) : new Set();
// };

// const setSeenNotifications = (seen: Set<string>) => {
//   localStorage.setItem('seenNotifications', JSON.stringify([...seen]));
// };

// interface NotificationContextProps {
//   children: React.ReactNode;
// }

// const NotificationContext = createContext<{ showToast: () => void } | undefined>(undefined);

// export const NotificationProvider: React.FC<NotificationContextProps> = ({ children }) => {
//   const notifications = useSelector((state: RootState) => state.sellernotifications.sellernotificationsInfo);

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       refetch();

//     }, 2000);
//   }, [refetch]
//   );
  
//   // Maintain a ref to keep track of already seen notifications
//   const seenNotificationsRef = useRef<Set<string>>(getSeenNotifications());

//   useEffect(() => {
//     if (notifications.length > 0) {
//       const newNotifications = notifications.filter(notification =>
//         !seenNotificationsRef.current.has(notification.id)
//       );

//       newNotifications.forEach(notification => {
//         notify(notification.message);
//         seenNotificationsRef.current.add(notification.id);
//       });

//       setSeenNotifications(seenNotificationsRef.current);
//     }
//   }, [notifications]);

//   const showToast = () => {
    
//   };

//   return (
//     <NotificationContext.Provider value={{ showToast }}>
//       {children}
//     </NotificationContext.Provider>
//   );
// };

// export const useNotification = () => {
//   const context = useContext(NotificationContext);
//   if (context === undefined) {
//     throw new Error('useNotification must be used within a NotificationProvider');
//   }
//   return context;
// };

import React, { createContext, useContext, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { notify } from '../utils/notifyUsers';
import { useGetNotificationsQuery } from '../slices/notificationSlice/notificationApiSlice';

const getSeenNotifications = () => {
  const seen = localStorage.getItem('seenNotifications');
  return seen ? new Set(JSON.parse(seen)) : new Set();
};

const setSeenNotifications = (seen: Set<string>) => {
  localStorage.setItem('seenNotifications', JSON.stringify([...seen]));
};

interface NotificationContextProps {
  children: React.ReactNode;
}

interface NotificationContextValue {
  showToast: () => void;
  refetchNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextValue | undefined>(undefined);

export const NotificationProvider: React.FC<NotificationContextProps> = ({ children }) => {
  const notifications = useSelector((state: RootState) => state.sellernotifications.sellernotificationsInfo);
  const { refetch } = useGetNotificationsQuery(undefined, {
    pollingInterval: 2000, // Refetch every 2 seconds
  });

  // Maintain a ref to keep track of already seen notifications
  const seenNotificationsRef = useRef<Set<string>>(getSeenNotifications());

  useEffect(() => {
    if (notifications.length > 0) {
      const newNotifications = notifications.filter(notification =>
        !seenNotificationsRef.current.has(notification.id)
      );

      newNotifications.forEach(notification => {
        notify(notification.message);
        seenNotificationsRef.current.add(notification.id);
      });

      setSeenNotifications(seenNotificationsRef.current);
    }
  }, [notifications]);

  const showToast = () => {
    // Implement your toast logic here
  };

  const contextValue: NotificationContextValue = {
    showToast,
    refetchNotifications: refetch
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};