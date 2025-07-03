
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/components/auth/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { LoginForm } from "@/components/auth/LoginForm";
import { CorporateLayout } from "@/components/corporate/CorporateLayout";
import { MainDashboard } from "@/components/corporate/MainDashboard";
import { SettingsView } from "@/components/corporate/SettingsView";
import { ActiveProjectsDetail } from "@/components/corporate/pages/ActiveProjectsDetail";
import { ResourceUtilizationDetail } from "@/components/corporate/pages/ResourceUtilizationDetail";
import { FinancialHealthDetail } from "@/components/corporate/pages/FinancialHealthDetail";
import { AverageHealthScoreDetail } from "@/components/corporate/pages/AverageHealthScoreDetail";
import { DeliverablesDetail } from "@/components/corporate/pages/DeliverablesDetail";
import { ProjectDetailView } from "@/components/corporate/pages/ProjectDetailView";
import { ResourceKPIDetailPage } from "@/components/corporate/pages/ResourceKPIDetailPage";
import { TotalResourcesDetail } from "@/components/corporate/pages/TotalResourcesDetail";
import { ProjectResourceDetailPage } from "@/components/corporate/pages/ProjectResourceDetailPage";
import { BenchedResourcesView } from "@/components/corporate/pages/BenchedResourcesView";
import { ProjectFinancialDetail } from "@/components/corporate/pages/ProjectFinancialDetail";
import { CreateEscalationPage } from "@/components/pages/CreateEscalationPage";
import { EscalationDetailPage } from "@/components/pages/EscalationDetailPage";
import { EditEscalationPage } from "@/components/pages/EditEscalationPage";
import { TestExecutionRateDetail } from "@/components/pages/TestExecutionRateDetail";
import { DevelopmentMetricDetail } from "@/components/pages/DevelopmentMetricDetail";
import { QAMetricDetail } from "@/components/pages/QAMetricDetail";
import { CommitsDeveloperDetail } from "@/components/pages/CommitsDeveloperDetail";
import { AutomationCoverageDetail } from "@/components/pages/AutomationCoverageDetail";
import NotFound from "./pages/NotFound";
import { ResourceManagementView } from "@/components/corporate/ResourceManagementView";
import { AddResourcePage } from "@/components/corporate/pages/AddResourcePage";
import { AddProjectPage } from "@/components/corporate/pages/AddProjectPage";
import { ProjectAllocationPage } from "@/components/corporate/pages/ProjectAllocationPage";
import { ResourceOverviewPage } from "@/components/corporate/pages/ResourceOverviewPage";
import { ProjectManagementPage } from "@/components/corporate/pages/ProjectManagementPage";
import { BenchedResourcesDetailPage } from "@/components/corporate/pages/BenchedResourcesDetailPage";
import { TotalResourcesKPIDetail } from "@/components/corporate/pages/TotalResourcesKPIDetail";
import { BillableResourcesKPIDetail } from "@/components/corporate/pages/BillableResourcesKPIDetail";
import { ShadowResourcesKPIDetail } from "@/components/corporate/pages/ShadowResourcesKPIDetail";
import { InternalResourcesKPIDetail } from "@/components/corporate/pages/InternalResourcesKPIDetail";
import { ZapmindsResourcesKPIDetail } from "@/components/corporate/pages/ZapmindsResourcesKPIDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginForm />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <CorporateLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<MainDashboard />} />
                <Route path="settings" element={<SettingsView />} />
                <Route path="resource-management" element={<ResourceManagementView />} />
                <Route path="resource-management/add-resource" element={<AddResourcePage />} />
                <Route path="resource-management/add-project" element={<AddProjectPage />} />
                <Route path="resource-management/project-allocation" element={<ProjectAllocationPage />} />
                <Route path="resource-management/overview" element={<ResourceOverviewPage />} />
                <Route path="resource-management/projects" element={<ProjectManagementPage />} />
                <Route path="resource-kpi/total-resources" element={<TotalResourcesKPIDetail />} />
                <Route path="resource-kpi/billable-resources" element={<BillableResourcesKPIDetail />} />
                <Route path="resource-kpi/benched-resources" element={<BenchedResourcesDetailPage />} />
                <Route path="resource-kpi/shadow-resources" element={<ShadowResourcesKPIDetail />} />
                <Route path="resource-kpi/internal-resources" element={<InternalResourcesKPIDetail />} />
                <Route path="resource-kpi/zapminds-resources" element={<ZapmindsResourcesKPIDetail />} />
                <Route path="active-projects" element={<ActiveProjectsDetail />} />
                <Route path="resource-utilization" element={<ResourceUtilizationDetail />} />
                <Route path="benched-resources" element={<BenchedResourcesView />} />
                <Route path="resource-kpi/benched" element={<BenchedResourcesDetailPage />} />
                <Route path="financial-health" element={<FinancialHealthDetail />} />
                <Route path="average-health-score" element={<AverageHealthScoreDetail />} />
                <Route path="project-financial/:projectName" element={<ProjectFinancialDetail />} />
                <Route path="deliverables" element={<DeliverablesDetail />} />
                <Route path="project/:projectName" element={<ProjectDetailView />} />
                <Route path="resource-kpi/total" element={<TotalResourcesDetail />} />
                <Route path="resource-kpi/:kpiType" element={<ResourceKPIDetailPage />} />
                <Route path="project-resources/:projectName" element={<ProjectResourceDetailPage />} />
                <Route path="create-escalation" element={<CreateEscalationPage />} />
                <Route path="escalation/:id" element={<EscalationDetailPage />} />
                <Route path="edit-escalation/:id" element={<EditEscalationPage />} />
                <Route path="commits-developer" element={<CommitsDeveloperDetail />} />
                <Route path="automation-coverage" element={<AutomationCoverageDetail />} />
                <Route path="development/:metricType" element={<DevelopmentMetricDetail />} />
                <Route path="qa/:metricType" element={<QAMetricDetail />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
