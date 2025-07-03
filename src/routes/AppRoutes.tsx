
import { Routes, Route } from "react-router-dom";
import { CorporateLayout } from "@/components/corporate/CorporateLayout";
import { MainDashboard } from "@/components/corporate/MainDashboard";
import { EscalationDetailPage } from "@/components/pages/EscalationDetailPage";
import { CreateEscalationPage } from "@/components/pages/CreateEscalationPage";
import { EditEscalationPage } from "@/components/pages/EditEscalationPage";
import { CommitsDeveloperDetail } from "@/components/pages/CommitsDeveloperDetail";
import { AutomationCoverageDetail } from "@/components/pages/AutomationCoverageDetail";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<CorporateLayout />}>
        <Route index element={<MainDashboard />} />
        <Route path="/escalation/:id" element={<EscalationDetailPage />} />
        <Route path="/create-escalation" element={<CreateEscalationPage />} />
        <Route path="/edit-escalation/:id" element={<EditEscalationPage />} />
        <Route path="/commits-developer" element={<CommitsDeveloperDetail />} />
        <Route path="/automation-coverage" element={<AutomationCoverageDetail />} />
      </Route>
    </Routes>
  );
};
