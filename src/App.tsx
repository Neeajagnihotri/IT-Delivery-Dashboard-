
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthContext';
import { Dashboard } from './components/dashboard/Dashboard';
import LoginPage from './components/auth/Login';
import PrivateRoute from './components/auth/ProtectedRoute';
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
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/corporate-structure" element={<PrivateRoute><CorporateStructurePage /></PrivateRoute>} />
              <Route path="/resource-management" element={<PrivateRoute><ResourceManagementPage /></PrivateRoute>} />
              <Route path="/add-resource" element={<PrivateRoute><AddResourcePage /></PrivateRoute>} />
              <Route path="/add-project" element={<PrivateRoute><AddProjectPage /></PrivateRoute>} />
              <Route path="/project/:projectId" element={<PrivateRoute><ProjectDetailView /></PrivateRoute>} />
              <Route path="/active-projects" element={<PrivateRoute><ResourceManagementPage /></PrivateRoute>} />
            </Routes>
          </div>
        </ProjectProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
