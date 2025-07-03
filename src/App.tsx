
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthContext';
import { Dashboard } from './components/dashboard/Dashboard';
import { Login } from './components/auth/Login';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import CorporateStructurePage from './components/corporate/pages/CorporateStructurePage';
import ResourceManagementPage from './components/corporate/pages/ResourceManagementPage';
import { AddResourcePage } from './components/corporate/pages/AddResourcePage';
import { AddProjectPage } from './components/corporate/pages/AddProjectPage';
import { ProjectDetailView } from './components/corporate/pages/ProjectDetailView';
import { ProjectProvider } from './contexts/ProjectContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProjectProvider>
          <div className="min-h-screen">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/corporate-structure" element={<ProtectedRoute><CorporateStructurePage /></ProtectedRoute>} />
              <Route path="/resource-management" element={<ProtectedRoute><ResourceManagementPage /></ProtectedRoute>} />
              <Route path="/add-resource" element={<ProtectedRoute><AddResourcePage /></ProtectedRoute>} />
              <Route path="/add-project" element={<ProtectedRoute><AddProjectPage /></ProtectedRoute>} />
              <Route path="/project/:projectId" element={<ProtectedRoute><ProjectDetailView /></ProtectedRoute>} />
              <Route path="/active-projects" element={<ProtectedRoute><ResourceManagementPage /></ProtectedRoute>} />
            </Routes>
          </div>
        </ProjectProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
