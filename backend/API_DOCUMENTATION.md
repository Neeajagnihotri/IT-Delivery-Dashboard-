
# IT Delivery Dashboard - Backend API Documentation

## Overview
This document provides comprehensive API documentation for the IT Delivery Dashboard backend. The API is built with Flask and provides endpoints for authentication, resource management, project management, analytics, and more.

**Base URL:** `http://localhost:5000/api`

**Authentication:** JWT Bearer Token required for all endpoints except `/auth/login` and `/health`

**Content-Type:** `application/json`

## Table of Contents
1. [Authentication](#authentication)
2. [Dashboard Overview](#dashboard-overview)
3. [Resource Management](#resource-management)
4. [Project Management](#project-management)
5. [Deliverables](#deliverables)
6. [Engineering Metrics](#engineering-metrics)
7. [QA Metrics](#qa-metrics)
8. [Escalations](#escalations)
9. [Financial Management](#financial-management)
10. [Analytics](#analytics)
11. [Utility Endpoints](#utility-endpoints)
12. [Error Handling](#error-handling)

---

## Authentication

### POST /auth/login
**Description:** Authenticate user and receive JWT token

**Request Body:**
```json
{
  "email": "john.doe@zapcom.com",
  "password": "securepassword123"
}
```

**Response (200 Success):**
```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@zapcom.com",
    "role": "resource_manager"
  }
}
```

**Response (401 Unauthorized):**
```json
{
  "message": "Invalid credentials"
}
```

**Response (400 Bad Request):**
```json
{
  "message": "Email and password required"
}
```

---

## Dashboard Overview

### GET /dashboard/overview
**Description:** Get comprehensive dashboard overview with KPIs
**Authorization:** JWT Required
**Role Access:** All roles (data filtered based on role)

**Response (200 Success):**
```json
{
  "project_health": {
    "total_projects": 5,
    "green_projects": 2,
    "yellow_projects": 2,
    "red_projects": 1,
    "avg_health_score": 75.4
  },
  "resource_utilization": {
    "total_resources": 25,
    "billable_resources": 18,
    "benched_resources": 7,
    "utilization_rate": 72.0
  },
  "deliverables": {
    "total_deliverables": 15,
    "completed_deliverables": 8,
    "delayed_deliverables": 2,
    "overdue_deliverables": 1
  },
  "engineering_metrics": {
    "avg_code_quality": 85.2,
    "avg_test_coverage": 78.5,
    "total_bugs_reported": 45,
    "total_bugs_resolved": 42
  },
  "qa_metrics": {
    "avg_automation_coverage": 82.1,
    "avg_defect_removal_efficiency": 89.3,
    "total_test_cases": 1250,
    "total_passed": 1180
  },
  "financial": {
    "total_budget": 500000.00,
    "total_utilized": 375000.00,
    "total_revenue": 625000.00,
    "avg_profit_margin": 25.5,
    "avg_burn_rate": 45000.00
  }
}
```

---

## Resource Management

### GET /resources
**Description:** Get all resources with skills and department information
**Authorization:** JWT Required

**Query Parameters:**
- `department_id` (optional): Filter by department
- `status` (optional): Filter by status (Billable, Benched, Shadow, etc.)
- `skill_id` (optional): Filter by skill

**Response (200 Success):**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@zapcom.com",
    "department_id": 1,
    "department_name": "Engineering",
    "role": "Senior Developer",
    "status": "Billable",
    "level": "Senior",
    "hire_date": "2023-01-15",
    "location": "Bangalore",
    "phone": "+91-9876543210",
    "is_active": true,
    "skills": ["React", "Python", "AWS"],
    "shadow_progress": null,
    "shadow_status": null,
    "bench_reason": null,
    "bench_start_date": null,
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-07-04T15:45:00Z"
  }
]
```

### POST /resources
**Description:** Create a new resource
**Authorization:** JWT Required
**Role Access:** resource_manager, hr, admin

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane.smith@zapcom.com",
  "department_id": 2,
  "role": "UI/UX Designer",
  "status": "Available",
  "level": "Mid",
  "hire_date": "2024-07-01",
  "location": "Mumbai",
  "phone": "+91-9876543211",
  "skills": [3, 7, 12]
}
```

**Response (201 Created):**
```json
{
  "message": "Resource created successfully",
  "id": 26
}
```

### PUT /resources/{id}
**Description:** Update an existing resource
**Authorization:** JWT Required
**Role Access:** resource_manager, hr, admin

**Request Body:**
```json
{
  "name": "Jane Smith Updated",
  "email": "jane.smith@zapcom.com",
  "department_id": 2,
  "role": "Senior UI/UX Designer",
  "status": "Billable",
  "level": "Senior",
  "location": "Mumbai",
  "phone": "+91-9876543211",
  "skills": [3, 7, 12, 15]
}
```

**Response (200 Success):**
```json
{
  "message": "Resource updated successfully"
}
```

### PATCH /resources/{id}/shadow-progress
**Description:** Update shadow resource progress
**Authorization:** JWT Required
**Role Access:** resource_manager, hr, admin

**Request Body:**
```json
{
  "shadow_progress": 75,
  "notes": "Good progress on React fundamentals"
}
```

**Response (200 Success):**
```json
{
  "message": "Shadow progress updated successfully",
  "new_status": "Transition"
}
```

---

## Project Management

### GET /projects
**Description:** Get all projects with client and manager information
**Authorization:** JWT Required

**Query Parameters:**
- `status` (optional): Filter by status
- `client_id` (optional): Filter by client
- `manager_id` (optional): Filter by manager

**Response (200 Success):**
```json
[
  {
    "id": 1,
    "name": "E-commerce Platform",
    "description": "Modern e-commerce solution",
    "client_id": 1,
    "client_name": "TechCorp Solutions",
    "manager_id": 5,
    "manager_name": "Sarah Johnson",
    "status": "In Progress",
    "start_date": "2024-03-01",
    "end_date": "2024-12-31",
    "budget": 250000.00,
    "priority": "High",
    "technology_stack": ["React", "Node.js", "PostgreSQL"],
    "health_score": 85,
    "health_status": "Green",
    "delivery_risk": "Low",
    "escalation_count": 0,
    "resource_count": 6,
    "is_active": true,
    "created_at": "2024-02-15T09:00:00Z",
    "updated_at": "2024-07-04T14:30:00Z"
  }
]
```

### POST /projects
**Description:** Create a new project
**Authorization:** JWT Required
**Role Access:** resource_manager, delivery_owner, admin

**Request Body:**
```json
{
  "name": "Mobile Banking App",
  "description": "Secure mobile banking application",
  "client_id": 2,
  "manager_id": 8,
  "status": "Planning",
  "start_date": "2024-08-01",
  "end_date": "2025-06-30",
  "budget": 400000.00,
  "priority": "Critical",
  "technology_stack": ["React Native", "Node.js", "MongoDB"]
}
```

**Response (201 Created):**
```json
{
  "message": "Project created successfully",
  "id": 6
}
```

### GET /projects/health
**Description:** Get project health overview
**Authorization:** JWT Required

**Response (200 Success):**
```json
[
  {
    "project_id": 1,
    "project_name": "E-commerce Platform",
    "client_name": "TechCorp Solutions",
    "manager_name": "Sarah Johnson",
    "health_score": 85,
    "health_status": "Green",
    "delivery_risk": "Low",
    "budget_utilization": 45.2,
    "timeline_progress": 38.5,
    "resource_utilization": 92.3,
    "escalation_count": 0,
    "deliverables_on_track": 8,
    "deliverables_delayed": 1
  }
]
```

---

## Deliverables

### GET /deliverables
**Description:** Get deliverables with project and assignee information
**Authorization:** JWT Required

**Query Parameters:**
- `project_id` (optional): Filter by project
- `status` (optional): Filter by status
- `assigned_to` (optional): Filter by assignee

**Response (200 Success):**
```json
[
  {
    "id": 1,
    "name": "User Authentication Module",
    "description": "Complete user authentication system",
    "project_id": 1,
    "project_name": "E-commerce Platform",
    "assigned_to": 3,
    "assigned_to_name": "Mike Wilson",
    "status": "In Progress",
    "priority": "High",
    "due_date": "2024-08-15",
    "completion_percentage": 65,
    "estimated_hours": 40,
    "actual_hours": 28,
    "deliverable_type": "Feature",
    "acceptance_criteria": "User can register, login, reset password",
    "created_at": "2024-07-01T10:00:00Z",
    "updated_at": "2024-07-04T16:20:00Z"
  }
]
```

---

## Engineering Metrics

### GET /metrics/engineering
**Description:** Get engineering metrics for projects
**Authorization:** JWT Required

**Query Parameters:**
- `project_id` (optional): Filter by project
- `days` (optional, default: 30): Number of days to fetch

**Response (200 Success):**
```json
[
  {
    "id": 1,
    "project_id": 1,
    "project_name": "E-commerce Platform",
    "metric_date": "2024-07-04",
    "commits_count": 25,
    "lines_of_code": 1250,
    "code_quality_score": 88,
    "test_coverage": 82,
    "bugs_reported": 3,
    "bugs_resolved": 2,
    "code_review_time_avg": 4.5,
    "deployment_frequency": 2,
    "lead_time_hours": 18.5,
    "developer_productivity_score": 85,
    "technical_debt_ratio": 8.2,
    "created_at": "2024-07-04T23:59:59Z"
  }
]
```

---

## QA Metrics

### GET /metrics/qa
**Description:** Get QA metrics for projects
**Authorization:** JWT Required

**Query Parameters:**
- `project_id` (optional): Filter by project  
- `days` (optional, default: 30): Number of days to fetch

**Response (200 Success):**
```json
[
  {
    "id": 1,
    "project_id": 1,
    "project_name": "E-commerce Platform",
    "metric_date": "2024-07-04",
    "test_cases_total": 150,
    "test_cases_passed": 142,
    "test_cases_failed": 8,
    "automation_coverage": 78,
    "manual_test_hours": 32,
    "defects_found": 5,
    "defects_fixed": 4,
    "defect_removal_efficiency": 88.5,
    "test_execution_rate": 94.7,
    "regression_test_success": 96.2,
    "performance_test_score": 82,
    "security_test_score": 91,
    "created_at": "2024-07-04T23:59:59Z"
  }
]
```

---

## Escalations

### GET /escalations
**Description:** Get escalations with project and resource information
**Authorization:** JWT Required

**Query Parameters:**
- `project_id` (optional): Filter by project
- `status` (optional, default: 'Open'): Filter by status

**Response (200 Success):**
```json
[
  {
    "id": 1,
    "title": "Performance Issues in Payment Gateway",
    "description": "Users experiencing timeout during payment processing",
    "project_id": 1,
    "project_name": "E-commerce Platform",
    "priority": "Critical",
    "status": "Open",
    "escalation_type": "Technical",
    "raised_by": 3,
    "raised_by_name": "Mike Wilson",
    "assigned_to": 5,
    "assigned_to_name": "Sarah Johnson",
    "raised_date": "2024-07-03T14:30:00Z",
    "due_date": "2024-07-05T18:00:00Z",
    "resolution_notes": null,
    "resolved_date": null,
    "created_at": "2024-07-03T14:30:00Z",
    "updated_at": "2024-07-04T10:15:00Z"
  }
]
```

### POST /escalations
**Description:** Create a new escalation
**Authorization:** JWT Required

**Request Body:**
```json
{
  "title": "Database Performance Degradation",
  "description": "Query response times have increased significantly",
  "project_id": 2,
  "priority": "High",
  "escalation_type": "Technical",
  "assigned_to": 8,
  "due_date": "2024-07-08T17:00:00Z"
}
```

**Response (201 Created):**
```json
{
  "message": "Escalation created successfully",
  "id": 6
}
```

---

## Financial Management

### GET /financial/overview
**Description:** Get financial overview (HR and Leadership only)
**Authorization:** JWT Required
**Role Access:** hr, leadership

**Query Parameters:**
- `months` (optional, default: 6): Number of months to fetch

**Response (200 Success):**
```json
[
  {
    "month": "2024-07-01",
    "total_budget": 500000.00,
    "budget_utilized": 375000.00,
    "revenue_generated": 625000.00,
    "profit_margin": 40.0,
    "burn_rate": 62500.00,
    "project_count": 5,
    "billable_resources": 18,
    "cost_per_resource": 20833.33,
    "revenue_per_resource": 34722.22
  }
]
```

### GET /departments/performance
**Description:** Get department performance metrics
**Authorization:** JWT Required

**Response (200 Success):**
```json
[
  {
    "department_id": 1,
    "department_name": "Engineering",
    "total_resources": 12,
    "billable_resources": 9,
    "utilization_rate": 75.0,
    "avg_project_health": 82.5,
    "total_revenue": 450000.00,
    "dept_health_score": 85,
    "active_projects": 4,
    "completed_deliverables": 15,
    "pending_escalations": 2
  }
]
```

---

## Analytics

### GET /analytics/allocation
**Description:** Get resource allocation analytics
**Authorization:** JWT Required

**Response (200 Success):**
```json
{
  "status_distribution": [
    {
      "status": "Billable",
      "count": 18,
      "percentage": 72.0
    },
    {
      "status": "Benched",
      "count": 5,
      "percentage": 20.0
    },
    {
      "status": "Shadow",
      "count": 2,
      "percentage": 8.0
    }
  ],
  "department_utilization": [
    {
      "department": "Engineering",
      "total": 12,
      "billable": 9,
      "utilization": 75.0
    },
    {
      "department": "Design",
      "total": 4,
      "billable": 3,
      "utilization": 75.0
    }
  ]
}
```

### GET /analytics/skills
**Description:** Get skills analytics across resources
**Authorization:** JWT Required

**Response (200 Success):**
```json
[
  {
    "skill": "React",
    "count": 8,
    "market_demand": "High",
    "avg_proficiency": 4.2
  },
  {
    "skill": "Python",
    "count": 6,
    "market_demand": "High", 
    "avg_proficiency": 4.0
  }
]
```

### GET /analytics/bench
**Description:** Get bench analytics and cost information
**Authorization:** JWT Required

**Response (200 Success):**
```json
{
  "bench_breakdown": [
    {
      "reason": "Between Projects",
      "count": 3,
      "percentage": 60.0,
      "avg_days": 12.3
    },
    {
      "reason": "Client Ramp Down",
      "count": 2,
      "percentage": 40.0,
      "avg_days": 8.5
    }
  ],
  "monthly_cost": 125000.00
}
```

---

## Utility Endpoints

### GET /departments
**Description:** Get all departments
**Authorization:** JWT Required

**Response (200 Success):**
```json
[
  {
    "id": 1,
    "name": "Engineering",
    "description": "Software development and technical teams",
    "budget": 2000000.00,
    "head_of_department": "Sarah Johnson",
    "location": "Bangalore",
    "is_active": true
  }
]
```

### GET /skills
**Description:** Get all skills
**Authorization:** JWT Required

**Response (200 Success):**
```json
[
  {
    "id": 1,
    "name": "React",
    "category": "Frontend",
    "market_demand": "High",
    "description": "JavaScript library for building user interfaces"
  }
]
```

### GET /clients
**Description:** Get all clients
**Authorization:** JWT Required

**Response (200 Success):**
```json
[
  {
    "id": 1,
    "name": "TechCorp Solutions",
    "industry": "Technology",
    "contact_person": "John Smith",
    "email": "john@techcorp.com",
    "phone": "+1-555-0123",
    "address": "123 Tech Street, Silicon Valley",
    "is_active": true
  }
]
```

### GET /kpis/company
**Description:** Get company-wide KPIs
**Authorization:** JWT Required

**Query Parameters:**
- `days` (optional, default: 90): Number of days to fetch

**Response (200 Success):**
```json
[
  {
    "id": 1,
    "kpi_date": "2024-07-04",
    "revenue": 625000.00,
    "profit_margin": 25.5,
    "employee_utilization": 78.2,
    "client_satisfaction": 4.3,
    "project_delivery_rate": 94.2,
    "quality_score": 87.5,
    "employee_satisfaction": 4.1,
    "innovation_index": 82.0,
    "market_share": 12.5,
    "customer_retention": 89.3
  }
]
```

### GET /hr/resources
**Description:** Get resources with salary information (HR only)
**Authorization:** JWT Required
**Role Access:** hr

**Response (200 Success):**
```json
[
  {
    "resource_id": 1,
    "name": "John Doe",
    "department": "Engineering",
    "base_salary": 80000.00,
    "bonus": 8000.00,
    "total_compensation": 88000.00,
    "performance_rating": 4.2,
    "last_review_date": "2024-06-15",
    "next_review_date": "2024-12-15",
    "utilization_rate": 85.5,
    "billable_hours_ytd": 1456
  }
]
```

---

## Error Handling

### Standard Error Response Format
```json
{
  "message": "Error description",
  "error_code": "SPECIFIC_ERROR_CODE",
  "details": {
    "field": "Additional error details if applicable"
  }
}
```

### HTTP Status Codes

**Success Codes:**
- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `204 No Content` - Request successful, no content to return

**Client Error Codes:**
- `400 Bad Request` - Invalid request format or missing required fields
- `401 Unauthorized` - Invalid or missing authentication token
- `403 Forbidden` - User doesn't have permission for this action
- `404 Not Found` - Requested resource not found
- `409 Conflict` - Resource already exists or conflict with current state
- `422 Unprocessable Entity` - Request format is correct but contains invalid data

**Server Error Codes:**
- `500 Internal Server Error` - Unexpected server error
- `503 Service Unavailable` - Database connection or external service unavailable

### Common Error Examples

**Authentication Required:**
```json
{
  "message": "Access token required"
}
```

**Insufficient Permissions:**
```json
{
  "message": "Access denied"
}
```

**Resource Not Found:**
```json
{
  "message": "Resource with ID 123 not found"
}
```

**Validation Error:**
```json
{
  "message": "Validation failed",
  "details": {
    "email": "Invalid email format",
    "name": "Name is required"
  }
}
```

**Database Connection Error:**
```json
{
  "message": "Database connection failed"
}
```

---

## Authentication & Authorization

### JWT Token Structure
The JWT token contains the following claims:
```json
{
  "sub": "user_id",
  "email": "user@example.com", 
  "role": "resource_manager",
  "exp": 1720123456,
  "iat": 1720037056
}
```

### Role-Based Access Control

**Roles and Permissions:**
- `admin`: Full access to all endpoints
- `hr`: Access to all HR-related data including salary information
- `resource_manager`: Resource and project management operations
- `delivery_owner`: Project delivery and escalation management
- `leadership`: Financial and strategic analytics access

### Rate Limiting
- **General endpoints**: 100 requests per minute per user
- **Analytics endpoints**: 20 requests per minute per user
- **Authentication endpoint**: 5 requests per minute per IP

---

## Webhooks (Future Enhancement)

### Webhook Events
- `resource.created`
- `resource.updated`
- `project.status_changed`
- `escalation.created`
- `escalation.resolved`
- `deliverable.completed`

### Webhook Payload Format
```json
{
  "event": "resource.created",
  "timestamp": "2024-07-04T15:30:00Z",
  "data": {
    "id": 26,
    "name": "New Employee",
    "email": "new@zapcom.com"
  },
  "user_id": 1
}
```

---

This API documentation covers all the endpoints needed for the IT Delivery Dashboard. For additional questions or clarifications, please refer to the database schema documentation or contact the development team.
