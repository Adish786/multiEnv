import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [devTickets, setDevTickets] = useState([]);
  const [prodTickets, setProdTickets] = useState([]);
  const [newTicketTitle, setNewTicketTitle] = useState('');
  const [selectedEnv, setSelectedEnv] = useState('dev');
  const [loading, setLoading] = useState({ dev: false, prod: false });

  const API_BASE = 'http://localhost:3000/api';

  const fetchTickets = async (environment) => {
    setLoading(prev => ({ ...prev, [environment]: true }));
    try {
      const response = await axios.get(`${API_BASE}/${environment}/tickets`);
      if (environment === 'dev') {
        setDevTickets(response.data.tickets);
      } else {
        setProdTickets(response.data.tickets);
      }
    } catch (error) {
      console.error(`Error fetching ${environment} tickets:`, error);
    } finally {
      setLoading(prev => ({ ...prev, [environment]: false }));
    }
  };

  const createTicket = async (environment) => {
    if (!newTicketTitle.trim()) return;

    try {
      await axios.post(`${API_BASE}/${environment}/tickets`, {
        title: newTicketTitle
      });
      setNewTicketTitle('');
      fetchTickets(environment);
    } catch (error) {
      console.error(`Error creating ${environment} ticket:`, error);
    }
  };

  const updateTicketStatus = async (environment, ticketId, newStatus) => {
    try {
      await axios.put(`${API_BASE}/${environment}/tickets/${ticketId}`, {
        status: newStatus
      });
      fetchTickets(environment);
    } catch (error) {
      console.error(`Error updating ${environment} ticket:`, error);
    }
  };

  useEffect(() => {
    fetchTickets('dev');
    fetchTickets('prod');
  }, []);

  const TicketCard = ({ ticket, environment }) => (
    <div className={`ticket-card ${ticket.status}`}>
      <h4>{ticket.title}</h4>
      <div className="ticket-info">
        <span className={`status-badge ${ticket.status}`}>
          {ticket.status}
        </span>
        <span className="environment-badge">{environment}</span>
        <span className="date">Created: {ticket.created_at}</span>
      </div>
      <div className="ticket-actions">
        <select 
          value={ticket.status} 
          onChange={(e) => updateTicketStatus(environment, ticket.id, e.target.value)}
        >
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
      </div>
    </div>
  );

  return (
    <div className="app">
      <header className="app-header">
        <h1>Multi-Environment Ticket Management</h1>
        <p>Manage tickets across Development and Production environments</p>
      </header>

      <div className="ticket-creation">
        <input
          type="text"
          placeholder="Enter ticket title..."
          value={newTicketTitle}
          onChange={(e) => setNewTicketTitle(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && createTicket(selectedEnv)}
        />
        <select 
          value={selectedEnv} 
          onChange={(e) => setSelectedEnv(e.target.value)}
        >
          <option value="dev">Development</option>
          <option value="prod">Production</option>
        </select>
        <button onClick={() => createTicket(selectedEnv)}>
          Create Ticket in {selectedEnv.toUpperCase()}
        </button>
      </div>

      <div className="environments-container">
        <div className="environment-section">
          <div className="environment-header">
            <h2>Development Environment</h2>
            <button 
              onClick={() => fetchTickets('dev')}
              disabled={loading.dev}
            >
              {loading.dev ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
          <div className="tickets-grid">
            {devTickets.map(ticket => (
              <TicketCard 
                key={`dev-${ticket.id}`} 
                ticket={ticket} 
                environment="dev" 
              />
            ))}
          </div>
        </div>

        <div className="environment-section">
          <div className="environment-header">
            <h2>Production Environment</h2>
            <button 
              onClick={() => fetchTickets('prod')}
              disabled={loading.prod}
            >
              {loading.prod ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
          <div className="tickets-grid">
            {prodTickets.map(ticket => (
              <TicketCard 
                key={`prod-${ticket.id}`} 
                ticket={ticket} 
                environment="prod" 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;