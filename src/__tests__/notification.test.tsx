// Notification.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import Notification from '../Components/seller/Notification';
import '@testing-library/jest-dom'; // For the matchers

describe('Notification', () => {
  const icon = '🔔';
  const message = 'New message received';
  const time = '2 minutes ago';

  it('renders the notification with bold message when status is false', () => {
    render(<Notification icon={icon} message={message} time={time} status={false} />);
    
    expect(screen.getByText(icon)).toBeInTheDocument();
    expect(screen.getByText(message)).toHaveClass('font-bold');
    expect(screen.getByText(time)).toBeInTheDocument();
  });

  it('renders the notification with light message when status is true', () => {
    render(<Notification icon={icon} message={message} time={time} status={true} />);
    
    expect(screen.getByText(icon)).toBeInTheDocument();
    expect(screen.getByText(message)).toHaveClass('font-light');
    expect(screen.getByText(time)).toBeInTheDocument();
  });

  it('renders the notification with the correct icon', () => {
    render(<Notification icon={icon} message={message} time={time} status={false} />);
    
    expect(screen.getByText(icon)).toBeInTheDocument();
  });

  it('renders the notification with the correct time', () => {
    render(<Notification icon={icon} message={message} time={time} status={false} />);
    
    expect(screen.getByText(time)).toBeInTheDocument();
  });

  it('does not apply the bold class when status is true', () => {
    render(<Notification icon={icon} message={message} time={time} status={true} />);
    
    expect(screen.getByText(message)).not.toHaveClass('font-bold');
  });

  it('does not apply the light class when status is false', () => {
    render(<Notification icon={icon} message={message} time={time} status={false} />);
    
    expect(screen.getByText(message)).not.toHaveClass('font-light');
  });

  it('displays an icon correctly', () => {
    render(<Notification icon={icon} message={message} time={time} status={false} />);
    
    expect(screen.getByText(icon)).toBeInTheDocument();
  });

  it('displays the correct message text', () => {
    render(<Notification icon={icon} message={message} time={time} status={false} />);
    
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it('displays the correct time text', () => {
    render(<Notification icon={icon} message={message} time={time} status={false} />);
    
    expect(screen.getByText(time)).toBeInTheDocument();
  });

  it('renders the notification with a different icon', () => {
    const newIcon = '📧';
    render(<Notification icon={newIcon} message={message} time={time} status={false} />);
    
    expect(screen.getByText(newIcon)).toBeInTheDocument();
  });

  it('renders the notification with a different message', () => {
    const newMessage = 'You have a new email';
    render(<Notification icon={icon} message={newMessage} time={time} status={false} />);
    
    expect(screen.getByText(newMessage)).toBeInTheDocument();
  });

  it('renders the notification with a different time', () => {
    const newTime = '5 minutes ago';
    render(<Notification icon={icon} message={message} time={newTime} status={false} />);
    
    expect(screen.getByText(newTime)).toBeInTheDocument();
  });

  it('applies the bold class correctly when status is false', () => {
    render(<Notification icon={icon} message={message} time={time} status={false} />);
    
    expect(screen.getByText(message)).toHaveClass('font-bold');
  });

  it('applies the light class correctly when status is true', () => {
    render(<Notification icon={icon} message={message} time={time} status={true} />);
    
    expect(screen.getByText(message)).toHaveClass('font-light');
  });

  it('renders multiple notifications correctly', () => {
    const notifications = [
      { icon: '🔔', message: 'First message', time: '1 minute ago', status: false },
      { icon: '📧', message: 'Second message', time: '2 minutes ago', status: true },
    ];

    notifications.forEach((notif) => {
      render(<Notification icon={notif.icon} message={notif.message} time={notif.time} status={notif.status} />);
      
      expect(screen.getByText(notif.icon)).toBeInTheDocument();
      expect(screen.getByText(notif.message)).toBeInTheDocument();
      expect(screen.getByText(notif.time)).toBeInTheDocument();
    });
  });
});
