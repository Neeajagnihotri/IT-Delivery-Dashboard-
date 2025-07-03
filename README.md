
# Zapcom Resource Management System

A comprehensive, enterprise-grade resource management platform built with React, Flask, and PostgreSQL. This system provides advanced analytics, real-time allocation tracking, and intelligent resource optimization for modern organizations.

## 🚀 Features

### Core Functionality
- **Resource Management**: Complete employee lifecycle management with skills tracking
- **Project Allocation**: Intelligent resource allocation with real-time optimization
- **Advanced Analytics**: Multi-dimensional analytics with 3D visualizations
- **Real-time Dashboard**: Live updates and interactive enterprise dashboards
- **Performance Tracking**: Comprehensive performance reviews and skill assessments

### Key Capabilities
- ✅ Real-time resource allocation and project management
- ✅ Advanced analytics with multiple chart types including 3D views
- ✅ Skills-based resource matching and allocation optimization
- ✅ Department-wise utilization and performance tracking
- ✅ Bench analytics with cost impact analysis
- ✅ Interactive project vs resource heatmaps
- ✅ Role-based access control and permissions
- ✅ Comprehensive audit trails and change tracking
- ✅ Responsive design with dark/light mode
- ✅ Professional enterprise UI with modern design

## 🏗️ Architecture

### Frontend (React + TypeScript)
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom enterprise design system
- **UI Components**: Shadcn/ui component library
- **State Management**: React Query for server state
- **Charts**: Recharts for 2D charts, Three.js for 3D visualizations
- **Authentication**: JWT-based authentication with role management
- **Animations**: Framer Motion for smooth transitions

### Backend (Flask + Python)
- **Framework**: Flask with REST API architecture
- **Database**: PostgreSQL with advanced schema design
- **Authentication**: JWT tokens with role-based permissions
- **ORM**: SQLAlchemy for database operations
- **Security**: bcrypt password hashing, CORS protection
- **API**: RESTful endpoints with comprehensive error handling

### Database (PostgreSQL)
- **Design**: Normalized schema with referential integrity
- **Tables**: 12+ tables with complex relationships
- **Views**: Optimized views for analytics and reporting
- **Indexes**: Performance-optimized indexes for large datasets
- **Triggers**: Automated audit logging and data validation
- **Security**: Row-level security and data encryption

## 📊 Analytics Features

### 1. Allocation Overview
- Resource allocation trends over time
- Utilization rates by department
- Real-time status distribution
- Efficiency metrics and KPIs

### 2. Bench Analytics
- Bench reasons and cost analysis
- Average bench time tracking
- Monthly cost impact calculations
- Trend analysis and predictions

### 3. Skills Distribution
- Skills vs market demand analysis
- Proficiency level tracking
- Skills gap identification
- Category-wise skill distribution with radar charts

### 4. Department Breakdown
- Department-wise performance metrics
- Revenue and cost analysis
- Utilization vs efficiency correlation
- Team size and composition analysis

### 5. Project vs Resource Heatmap (3D)
- Interactive 3D visualization of project allocations
- Resource utilization heat mapping
- Cross-project resource distribution
- Real-time allocation optimization

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ and npm/yarn
- Python 3.9+ and pip
- PostgreSQL 13+
- Git

### Frontend Setup
```bash
# Clone the repository
git clone https://github.com/your-org/zapcom-resource-management.git
cd zapcom-resource-management

# Install dependencies
npm install

# Start development server
npm run dev
```

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Run the Flask server
python app.py
```

### Database Setup
```bash
# Create PostgreSQL database
createdb zapcom_resource_db

# Run schema and sample data
psql -d zapcom_resource_db -f database/schema.sql
psql -d zapcom_resource_db -f database/sample_data.sql
```

### Environment Variables
Create a `.env` file in the backend directory:
```env
DB_HOST=localhost
DB_NAME=zapcom_resource_db
DB_USER=postgres
DB_PASSWORD=your_password
DB_PORT=5432
JWT_SECRET_KEY=your_secret_key_here
FLASK_ENV=development
```

## 🔐 Authentication & Roles

### Default Users
```
Admin: admin@zapcom.com / password
Manager: alice@zapcom.com / password
Analyst: bob@zapcom.com / password
User: carol@zapcom.com / password
```

### Role Permissions
- **Resource Manager**: Full access to all features
- **Project Manager**: Project and allocation management
- **Analyst**: Read-only analytics access
- **User**: Limited resource viewing

## 📱 API Documentation

### Authentication Endpoints
```
POST /api/auth/login - User login
GET /api/auth/verify - Token verification
```

### Resource Management
```
GET /api/resources - List all resources
POST /api/resources - Create new resource
PUT /api/resources/:id - Update resource
DELETE /api/resources/:id - Delete resource
```

### Project Management
```
GET /api/projects - List all projects
POST /api/projects - Create new project
PUT /api/projects/:id - Update project
```

### Analytics Endpoints
```
GET /api/analytics/allocation - Allocation analytics
GET /api/analytics/skills - Skills analytics
GET /api/analytics/bench - Bench analytics
GET /api/analytics/department - Department analytics
```

### Utility Endpoints
```
GET /api/departments - List departments
GET /api/skills - List skills
GET /api/clients - List clients
```

## 🎨 UI/UX Features

### Design System
- **Professional Color Palette**: Subtle tones with high contrast
- **Glass Morphism**: Modern glass effects and backdrop blur
- **Responsive Grid**: Advanced CSS Grid and Flexbox layouts
- **Typography**: Professional font hierarchy
- **Animations**: Smooth transitions and micro-interactions

### Interactive Elements
- **Hover Effects**: Professional hover animations
- **Real-time Updates**: Live data updates without page refresh
- **Modal System**: Advanced modal management
- **Toast Notifications**: User feedback system
- **Loading States**: Professional loading indicators

### Accessibility
- **WCAG Compliance**: Web accessibility standards
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Support**: Semantic HTML structure
- **High Contrast**: Dark/light mode support

## 🔧 Development

### Frontend Development
```bash
# Run development server
npm run dev

# Build for production
npm run build

# Run type checking
npm run type-check

# Run linting
npm run lint
```

### Backend Development
```bash
# Run Flask in development mode
flask run --debug

# Run tests
pytest

# Code formatting
black app.py

# Type checking
mypy app.py
```

### Database Management
```bash
# Create migration
alembic revision --autogenerate -m "Description"

# Apply migration
alembic upgrade head

# Backup database
pg_dump zapcom_resource_db > backup.sql
```

## 📈 Performance Optimization

### Frontend Optimizations
- Code splitting with React.lazy()
- Memoization with React.memo and useMemo
- Virtual scrolling for large datasets
- Image optimization and lazy loading
- Bundle size optimization

### Backend Optimizations
- Database query optimization
- Redis caching for frequent queries
- Connection pooling
- API response compression
- Rate limiting and throttling

### Database Optimizations
- Strategic indexing for common queries
- Query performance monitoring
- Materialized views for analytics
- Partitioning for large tables
- Regular VACUUM and ANALYZE

## 🚀 Deployment

### Production Deployment
```bash
# Build frontend
npm run build

# Set up environment
export NODE_ENV=production
export FLASK_ENV=production

# Use production server
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Docker Deployment
```dockerfile
# Dockerfile provided for containerization
docker build -t zapcom-resource-management .
docker run -p 3000:3000 -p 5000:5000 zapcom-resource-management
```

### Environment Setup
- Configure SSL certificates
- Set up reverse proxy (nginx)
- Configure database backups
- Set up monitoring and logging
- Configure CI/CD pipeline

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open pull request

### Code Standards
- Follow TypeScript/ESLint configurations
- Use conventional commit messages
- Write unit tests for new features
- Update documentation
- Follow security best practices

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Documentation
- [API Documentation](docs/api.md)
- [Database Schema](database/ERD_description.md)
- [Deployment Guide](docs/deployment.md)
- [User Manual](docs/user-manual.md)

### Getting Help
- Create GitHub issues for bugs
- Use discussions for questions
- Check existing documentation
- Contact support team

## 🏢 Enterprise Features

### Advanced Analytics
- Predictive resource allocation
- Machine learning insights
- Custom dashboard creation
- Advanced reporting tools

### Integration Capabilities
- REST API for third-party integration
- Webhook notifications
- SSO integration support
- External calendar sync

### Compliance & Security
- Audit trail logging
- Role-based access control
- Data encryption at rest
- GDPR compliance features

---
