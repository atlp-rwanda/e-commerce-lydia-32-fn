// import React, { createContext, useContext, useEffect, useRef } from 'react';
// import { useSelector } from 'react-redux';
// import { RootState } from '../store';
// import { notify } from '../utils/notifyUsers';
// import { useGetNotificationsQuery } from '../slices/notificationSlice/notificationApiSlice';

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

// interface NotificationContextValue {
//   showToast: () => void;
//   refetchNotifications: () => void;
// }

// const NotificationContext = createContext<NotificationContextValue | undefined>(undefined);

// export const NotificationProvider: React.FC<NotificationContextProps> = ({ children }) => {
//   const notifications = useSelector((state: RootState) => state.sellernotifications.sellernotificationsInfo);
//   const { refetch } = useGetNotificationsQuery(undefined, {
//     pollingInterval: 2000, // Refetch every 2 seconds
//   });

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
//     // Implement your toast logic here
//   };

//   const contextValue: NotificationContextValue = {
//     showToast,
//     refetchNotifications: refetch
//   };

//   return (
//     <NotificationContext.Provider value={contextValue}>
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

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { notify } from '../utils/notifyUsers';
import { useGetNotificationsQuery } from '../slices/notificationSlice/notificationApiSlice';
import notificationSound from '../utils/notifications/notificationSound.wav'

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
  const [notificationQueue, setNotificationQueue] = useState<string[]>([]);

  useEffect(() => {
    if (notifications.length > 0) {
      const newNotifications = notifications.filter(notification =>
        !seenNotificationsRef.current.has(notification.id)
      );

      if (newNotifications.length > 0) {
        setNotificationQueue(prev => [...prev, ...newNotifications.map(n => n.message)]);
        newNotifications.forEach(notification => {
          seenNotificationsRef.current.add(notification.id);
        });
        setSeenNotifications(seenNotificationsRef.current);
      }
    }
  }, [notifications]);

  useEffect(() => {
    if (notificationQueue.length > 0) {
      const timer = setTimeout(() => {
        const message = notificationQueue[0];
        notify(message);
        playBellSound();
        setNotificationQueue(prev => prev.slice(1));
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [notificationQueue]);

  const playBellSound = () => {
    const audio = new Audio(notificationSound);  
    audio.play().catch(e => {
      console.error("Error playing sound:", e)
      console.error("Audio src:", audio.src)
    }
    );
  };

  const showToast = () => {
    // This function is now handled by the queue system
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