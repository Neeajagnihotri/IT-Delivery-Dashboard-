
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Index from '../pages/Index';
import NotFound from '../pages/NotFound';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import { CorporateLayout } from '../components/corporate/CorporateLayout';
import { EnterpriseLayout } from '../components/enterprise/EnterpriseLayout';

// Corporate Pages
import { MainDashboard } from '../components/corporate/MainDashboard';
import { ResourceManagementView } from '../components/corporate/ResourceManagementView';
import { FinancialOverviewView } from '../components/corporate/FinancialOverviewView';
import { HRManagementView } from '../components/corporate/HRManagementView';
import { SettingsView } from '../components/corporate/SettingsView';

// Corporate Detail Pages
import { ProjectDetailView } from '../components/corporate/pages/ProjectDetailView';
import { ResourceDetailPage } from '../components/corporate/pages/ResourceDetailPage';
import { BenchedResourcesView } from '../components/corporate/pages/BenchedResourcesView';
import { ProjectManagementPage } from '../components/corporate/pages/ProjectManagementPage';
import { ProjectResourceDetailPage } from '../components/corporate/pages/ProjectResourceDetailPage';
import { ResourceUtilizationDetail } from '../components/corporate/pages/ResourceUtilizationDetail';
import { ActiveProjectsDetail } from '../components/corporate/pages/ActiveProjectsDetail';
import { AddProjectPage } from '../components/corporate/pages/AddProjectPage';
import { AddResourcePage } from '../components/corporate/pages/AddResourcePage';
import { ProjectAllocationPage } from '../components/corporate/pages/ProjectAllocationPage';
import { ResourceOverviewPage } from '../components/corporate/pages/ResourceOverviewPage';

// KPI Detail Pages
import { TotalResourcesKPIDetail } from '../components/corporate/pages/TotalResourcesKPIDetail';
import { BillableResourcesKPIDetail } from '../components/corporate/pages/BillableResourcesKPIDetail';
import { InternalResourcesKPIDetail } from '../components/corporate/pages/InternalResourcesKPIDetail';
import { ShadowResourcesKPIDetail } from '../components/corporate/pages/ShadowResourcesKPIDetail';
import { ZapmindsResourcesKPIDetail } from '../components/corporate/pages/ZapmindsResourcesKPIDetail';
import { BenchedResourcesDetailPage } from '../components/corporate/pages/BenchedResourcesDetailPage';
import { TotalResourcesDetail } from '../components/corporate/pages/TotalResourcesDetail';
import { ResourceKPIDetailPage } from '../components/corporate/pages/ResourceKPIDetailPage';
import { FinancialHealthDetail } from '../components/corporate/pages/FinancialHealthDetail';
import { ProjectFinancialDetail } from '../components/corporate/pages/ProjectFinancialDetail';
import { DeliverablesDetail } from '../components/corporate/pages/DeliverablesDetail';
import { AverageHealthScoreDetail } from '../components/corporate/pages/AverageHealthScoreDetail';

// Other Detail Pages
import { EscalationDetailPage } from '../components/pages/EscalationDetailPage';
import { CreateEscalationPage } from '../components/pages/CreateEscalationPage';
import { EditEscalationPage } from '../components/pages/EditEscalationPage';
import { CommitsDeveloperDetail } from '../components/pages/CommitsDeveloperDetail';
import { TestExecutionRateDetail } from '../components/pages/TestExecutionRateDetail';
import { AutomationCoverageDetail } from '../components/pages/AutomationCoverageDetail';
import { DevelopmentMetricDetail } from '../components/pages/DevelopmentMetricDetail';
import { QAMetricDetail } from '../components/pages/QAMetricDetail';

// Enterprise Pages
import { EnterpriseDashboard } from '../components/enterprise/EnterpriseDashboard';
import { EnterpriseSettings } from '../components/settings/EnterpriseSettings';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Index />} />

      {/* Corporate Routes */}
      <Route path="/corporate" element={
        <ProtectedRoute>
          <CorporateLayout />
        </ProtectedRoute>
      }>
        <Route index element={<MainDashboard />} />
        <Route path="resource-management" element={<ResourceManagementView />} />
        <Route path="financial-overview" element={<FinancialOverviewView />} />
        <Route path="hr-management" element={<HRManagementView />} />
        <Route path="settings" element={<SettingsView />} />
      </Route>

      {/* Corporate Detail Pages */}
      <Route path="/project-detail-view/:projectId" element={
        <ProtectedRoute>
          <ProjectDetailView />
        </ProtectedRoute>
      } />
      <Route path="/project-detail-view/:projectName" element={
        <ProtectedRoute>
          <ProjectDetailView />
        </ProtectedRoute>
      } />
      <Route path="/resource-detail/:resourceId" element={
        <ProtectedRoute>
          <ResourceDetailPage />
        </ProtectedRoute>
      } />
      <Route path="/benched-resources" element={
        <ProtectedRoute>
          <BenchedResourcesView />
        </ProtectedRoute>
      } />
      <Route path="/project-management" element={
        <ProtectedRoute>
          <ProjectManagementPage />
        </ProtectedRoute>
      } />
      <Route path="/project-resource-detail/:projectName" element={
        <ProtectedRoute>
          <ProjectResourceDetailPage />
        </ProtectedRoute>
      } />
      <Route path="/resource-utilization" element={
        <ProtectedRoute>
          <ResourceUtilizationDetail />
        </ProtectedRoute>
      } />
      <Route path="/active-projects" element={
        <ProtectedRoute>
          <ActiveProjectsDetail />
        </ProtectedRoute>
      } />
      <Route path="/add-project" element={
        <ProtectedRoute>
          <AddProjectPage />
        </ProtectedRoute>
      } />
      <Route path="/add-resource" element={
        <ProtectedRoute>
          <AddResourcePage />
        </ProtectedRoute>
      } />
      <Route path="/project-allocation" element={
        <ProtectedRoute>
          <ProjectAllocationPage />
        </ProtectedRoute>
      } />
      <Route path="/resource-overview" element={
        <ProtectedRoute>
          <ResourceOverviewPage />
        </ProtectedRoute>
      } />

      {/* KPI Detail Routes */}
      <Route path="/total-resources-kpi" element={
        <ProtectedRoute>
          <TotalResourcesKPIDetail />
        </ProtectedRoute>
      } />
      <Route path="/billable-resources-kpi" element={
        <ProtectedRoute>
          <BillableResourcesKPIDetail />
        </ProtectedRoute>
      } />
      <Route path="/internal-resources-kpi" element={
        <ProtectedRoute>
          <InternalResourcesKPIDetail />
        </ProtectedRoute>
      } />
      <Route path="/shadow-resources-kpi" element={
        <ProtectedRoute>
          <ShadowResourcesKPIDetail />
        </ProtectedRoute>
      } />
      <Route path="/zapminds-resources-kpi" element={
        <ProtectedRoute>
          <ZapmindsResourcesKPIDetail />
        </ProtectedRoute>
      } />
      <Route path="/benched-resources-detail" element={
        <ProtectedRoute>
          <BenchedResourcesDetailPage />
        </ProtectedRoute>
      } />
      <Route path="/total-resources-detail" element={
        <ProtectedRoute>
          <TotalResourcesDetail />
        </ProtectedRoute>
      } />
      <Route path="/resource-kpi-detail" element={
        <ProtectedRoute>
          <ResourceKPIDetailPage />
        </ProtectedRoute>
      } />
      <Route path="/financial-health-detail" element={
        <ProtectedRoute>
          <FinancialHealthDetail />
        </ProtectedRoute>
      } />
      <Route path="/project-financial-detail" element={
        <ProtectedRoute>
          <ProjectFinancialDetail />
        </ProtectedRoute>
      } />
      <Route path="/deliverables-detail" element={
        <ProtectedRoute>
          <DeliverablesDetail />
        </ProtectedRoute>
      } />
      <Route path="/average-health-score-detail" element={
        <ProtectedRoute>
          <AverageHealthScoreDetail />
        </ProtectedRoute>
      } />

      {/* Other Detail Routes */}
      <Route path="/escalation/:id" element={
        <ProtectedRoute>
          <EscalationDetailPage />
        </ProtectedRoute>
      } />
      <Route path="/create-escalation" element={
        <ProtectedRoute>
          <CreateEscalationPage />
        </ProtectedRoute>
      } />
      <Route path="/edit-escalation/:id" element={
        <ProtectedRoute>
          <EditEscalationPage />
        </ProtectedRoute>
      } />
      <Route path="/commits-developer-detail" element={
        <ProtectedRoute>
          <CommitsDeveloperDetail />
        </ProtectedRoute>
      } />
      <Route path="/test-execution-rate-detail" element={
        <ProtectedRoute>
          <TestExecutionRateDetail />
        </ProtectedRoute>
      } />
      <Route path="/automation-coverage-detail" element={
        <ProtectedRoute>
          <AutomationCoverageDetail />
        </ProtectedRoute>
      } />
      <Route path="/development-metric-detail" element={
        <ProtectedRoute>
          <DevelopmentMetricDetail />
        </ProtectedRoute>
      } />
      <Route path="/qa-metric-detail" element={
        <ProtectedRoute>
          <QAMetricDetail />
        </ProtectedRoute>
      } />

      {/* Enterprise Routes */}
      <Route path="/enterprise" element={
        <ProtectedRoute>
          <EnterpriseLayout />
        </ProtectedRoute>
      }>
        <Route index element={<EnterpriseDashboard />} />
        <Route path="settings" element={<EnterpriseSettings />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
