import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Message, MessageProps } from './message';
import { blue } from '@mui/material/colors';

describe('Message', () => {
  const mockProps: MessageProps = {
    avatar: 'https://example.com/avatar.png',
    message: 'Hello, world!',
    createdTime: '10:00 AM',
    owner: true,
  };

  it('renders the message with the correct content and styles for the owner', () => {
    render(<Message {...mockProps} />);

    const avatar = screen.getByRole('img');
    expect(avatar).toHaveAttribute('src', mockProps.avatar);

    const messageText = screen.getByText(mockProps.message);
    expect(messageText).toBeInTheDocument();

    const createdTime = screen.getByText(mockProps.createdTime);
    expect(createdTime).toBeInTheDocument();

    const messageBox = messageText.closest('div');
    expect(messageBox).toHaveStyle({
      backgroundColor: blue[200],
      padding: '12px',
      borderRadius: '12px',
    });
  });

  it('renders the message with the correct content and styles for non-owner', () => {
    render(<Message {...mockProps} owner={false} />);

    const avatar = screen.getByRole('img');
    expect(avatar).toHaveAttribute('src', mockProps.avatar);

    const messageText = screen.getByText(mockProps.message);
    expect(messageText).toBeInTheDocument();

    const createdTime = screen.getByText(mockProps.createdTime);
    expect(createdTime).toBeInTheDocument();

    const messageBox = messageText.closest('div');
    expect(messageBox).toHaveStyle({
      backgroundColor: 'rgb(255, 255, 255)',
      padding: '12px',
      borderRadius: '12px',
    });
  });
});
