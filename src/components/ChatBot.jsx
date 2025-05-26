import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';

const ChatBot = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [awaitingProductLink, setAwaitingProductLink] = useState(false);
  const [awaitingYesNo, setAwaitingYesNo] = useState(false);

  const toggleChat = () => {
    const newChatOpen = !chatOpen;
    setChatOpen(newChatOpen);
    localStorage.setItem('chatOpen', newChatOpen);
  };

  useEffect(() => {
    localStorage.removeItem('messages');
    setMessages([{ from: 'bot', text: 'Hi! How can I assist you?' }]);
    
    const savedChatOpen = JSON.parse(localStorage.getItem('chatOpen')) || false;
    setChatOpen(savedChatOpen);
  }, []);

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userMessage = input.trim();

    if (userMessage) {
      const newMessages = [...messages, { from: 'user', text: userMessage }];
      setMessages(newMessages);

      if (awaitingProductLink) {
        handleProductLink(userMessage, newMessages);
      } else if (awaitingYesNo) {
        handleYesNoResponse(userMessage, newMessages);
      } else {
        handleBotResponse(userMessage, newMessages);
      }
    }

    setInput('');
  };

  const handleProductLink = (userMessage, newMessages) => {
    const productLink = userMessage;
    const botResponse = 'Opening WhatsApp to inquire about the product...';

    const whatsappUrl = `https://wa.me/message/KQ4MING42KBRG1?text=${encodeURIComponent(`Product link: ${productLink}`)}`;
    window.open(whatsappUrl, '_blank');

    setMessages([...newMessages, { from: 'bot', text: botResponse }]);
    setAwaitingProductLink(false);
  };

  const handleYesNoResponse = (userMessage, newMessages) => {
    const userResponse = userMessage.toLowerCase();

    if (userResponse === 'yes') {
      const botResponse = 'Opening WhatsApp to contact the agent...';
      const whatsappUrl = `https://wa.me/message/KQ4MING42KBRG1?src=qr`;
      window.open(whatsappUrl, '_blank');
      setMessages([...newMessages, { from: 'bot', text: botResponse }]);
    } else if (userResponse === 'no') {
      const botResponse = 'How may I help you?';
      setMessages([...newMessages, { from: 'bot', text: botResponse }]);
    } else {
      const botResponse = 'Please enter yes or no.';
      setMessages([...newMessages, { from: 'bot', text: botResponse }]);
    }

    setAwaitingYesNo(false);
  };

  const handleBotResponse = (userMessage, newMessages) => {
    let botResponse;

    if (userMessage.toLowerCase().includes('cash on delivery')) {
      botResponse = 'Sorry, no cash on delivery is available.';
    }
    else if (userMessage.toLowerCase().includes('contact seller agent')) {
      botResponse = 'Opening WhatsApp to contact the agent...';
      const whatsappUrl = `https://wa.me/message/KQ4MING42KBRG1?src=qr`;
      window.open(whatsappUrl, '_blank');
    }
    else if (userMessage.toLowerCase().includes('get information about a product')) {
      botResponse = 'Please enter inquiry type:';
      setAwaitingProductLink(true);
    }
    else {
      botResponse = 'For this, you need to contact our customer agent? Enter yes or no.';
      setAwaitingYesNo(true);
    }

    setMessages([...newMessages, { from: 'bot', text: botResponse }]);
  };

  const handleSuggestionClick = (suggestion) => {
    if (suggestion === 'cash on delivery') {
      const newMessages = [...messages, { from: 'user', text: suggestion }];
      setMessages([...newMessages, { from: 'bot', text: 'Cash on delivery is available here.' }]);
    } else if (suggestion === 'contact seller agent') {
      const whatsappUrl = `https://wa.me/message/KQ4MING42KBRG1?src=qr`;
      window.open(whatsappUrl, '_blank');
    } else {
      setInput(suggestion);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Chatbot Icon */}
      <div className="cursor-pointer" onClick={toggleChat}>
        <img 
          src={assets.chatbot} 
          alt="Chat Icon" 
          className="w-16 h-16 rounded-full border-2 border-blue-500 hover:border-blue-600 transition-colors"
        />
      </div>

      {/* Chat box pop-up */}
      {chatOpen && (
        <div className="fixed bottom-24 right-5 w-72 h-96 bg-white rounded-lg shadow-lg flex flex-col">
          {/* Chat Header */}
          <div className="bg-blue-600 text-white px-4 py-3 rounded-t-lg flex justify-between items-center">
            <h4 className="font-medium">Chat with us</h4>
            <button onClick={toggleChat} className="text-white text-xl hover:text-gray-200 focus:outline-none">
              ×
            </button>
          </div>

          {/* Chat Body */}
          <div className="flex-grow p-3 overflow-y-auto">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`p-2 mb-2 rounded-lg max-w-[80%] ${
                  msg.from === 'bot' 
                    ? 'bg-gray-100 text-gray-800 self-start' 
                    : 'bg-blue-600 text-white self-end ml-auto'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Suggestion buttons */}
          <div className="px-3 py-2 flex flex-wrap justify-center">
            <button 
              onClick={() => handleSuggestionClick('cash on delivery')}
              className="bg-blue-600 text-white text-xs px-2 py-1 rounded m-1 hover:bg-blue-700 transition-colors"
            >
              Cash on delivery
            </button>
            <button 
              onClick={() => handleSuggestionClick('contact seller agent')}
              className="bg-blue-600 text-white text-xs px-2 py-1 rounded m-1 hover:bg-blue-700 transition-colors"
            >
              Contact seller agent
            </button>
            <button 
              onClick={() => handleSuggestionClick('enter inquiry type(here)--')}
              className="bg-blue-600 text-white text-xs px-2 py-1 rounded m-1 hover:bg-blue-700 transition-colors"
            >
              User inquires and suggestions
            </button>
          </div>

          {/* Chat Footer */}
          <div className="p-3 border-t border-gray-200">
            <form onSubmit={handleSubmit} className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-grow px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
              <button 
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;