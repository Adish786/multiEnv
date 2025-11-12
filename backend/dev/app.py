from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Environment configuration
ENV = os.getenv('ENVIRONMENT', 'development')
PORT = os.getenv('PORT', 3001)

tickets = [
    {"id": 1, "title": "Fix Login Issue", "status": "open", "environment": "dev", "created_at": "2024-01-15"},
    {"id": 2, "title": "Update API Documentation", "status": "in-progress", "environment": "dev", "created_at": "2024-01-16"}
]

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "healthy",
        "environment": ENV,
        "timestamp": datetime.now().isoformat()
    })

@app.route('/tickets', methods=['GET'])
def get_tickets():
    return jsonify({
        "environment": ENV,
        "tickets": tickets,
        "total": len(tickets)
    })

@app.route('/tickets', methods=['POST'])
def create_ticket():
    data = request.get_json()
    new_ticket = {
        "id": len(tickets) + 1,
        "title": data.get('title', 'Untitled Ticket'),
        "status": "open",
        "environment": "dev",
        "created_at": datetime.now().strftime("%Y-%m-%d")
    }
    tickets.append(new_ticket)
    return jsonify(new_ticket), 201

@app.route('/tickets/<int:ticket_id>', methods=['PUT'])
def update_ticket(ticket_id):
    data = request.get_json()
    for ticket in tickets:
        if ticket['id'] == ticket_id:
            ticket.update(data)
            return jsonify(ticket)
    return jsonify({"error": "Ticket not found"}), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=PORT, debug=True)