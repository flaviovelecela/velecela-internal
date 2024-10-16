import React from 'react';
import Chatbot from './AIPage';
import { useAuth } from '../../Context/AuthContext';

const ChatbotWrapper = () => {
  const { userRoles } = useAuth();

  // Only render Chatbot if the user has the AIChat role
  if (!userRoles.includes('aichat')) {
    return null; // Don't render anything if the user doesn't have the role
  }

  return <Chatbot />;
};

export default ChatbotWrapper;
