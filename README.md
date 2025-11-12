# Multi-Environment Ticket Management Application

A Docker-based multi-environment application with separate development and production backends, and a unified frontend.

## Architecture

- **Frontend**: React application running on port 3000
- **Development Backend**: Flask API running on port 3001
- **Production Backend**: Flask API running on port 3002

## Prerequisites

- Docker Engine 20.10+
- Docker Compose 2.0+

## Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd multiEnv

Deploy the application

docker-compose up -d
Verify services are running

docker-compose ps
Access the application

Frontend Dashboard: http://localhost:3000

Development API: http://localhost:3001

Production API: http://localhost:3002

API Endpoints
Development Environment
GET /api/dev/tickets - Get all development tickets

POST /api/dev/tickets - Create new development ticket

PUT /api/dev/tickets/:id - Update development ticket

Production Environment
GET /api/prod/tickets - Get all production tickets

POST /api/prod/tickets - Create new production ticket

PUT /api/prod/tickets/:id - Update production ticket

Health Checks
GET /api/dev/health - Development backend health

GET /api/prod/health - Production backend health

Manual Deployment Steps
1. Infrastructure Setup (Local Environment)

# Verify Docker installation
docker --version
docker-compose --version

# Create necessary networks
docker network create ticket-network
2. Build and Deploy Services

# Build all services
docker-compose build

# Start all services
docker-compose up -d

# Check service status
docker-compose ps

# View logs
docker-compose logs -f
3. Verification Tests

# Test development backend
curl http://localhost:3001/health

# Test production backend
curl http://localhost:3002/health

# Test frontend
curl http://localhost:3000/health
Troubleshooting
Common Issues
Port conflicts

# Check what's using the ports
netstat -tulpn | grep :3000
netstat -tulpn | grep :3001
netstat -tulpn | grep :3002
Container not starting

# Check container logs
docker-compose logs <service-name>

# Restart specific service
docker-compose restart <service-name>
Network connectivity issues

# Check network
docker network ls
docker network inspect multienv_ticket-network
Reset Application

# Stop and remove all containers
docker-compose down

# Remove volumes (optional - clears data)
docker-compose down -v

# Rebuild and restart
docker-compose up -d --build
Environment Variables
Backend Services
ENVIRONMENT: development/production

PORT: Service port (3001/3002)

DEBUG: True/False

Monitoring
Check Service Health

docker-compose ps
docker-compose logs
Resource Usage

docker stats
Access URLs
After successful deployment:

Frontend Dashboard: http://localhost:3000

Development API Direct: http://localhost:3001

Production API Direct: http://localhost:3002

Development API via Proxy: http://localhost:3000/api/dev

Production API via Proxy: http://localhost:3000/api/prod

Features
 Multi-environment ticket management

 Real-time status updates

 Cross-environment API calls

 Health monitoring

 Responsive design

 Error handling

 Docker containerization
