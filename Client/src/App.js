import { Routes, Route, Navigate } from 'react-router-dom';

import MainLayout from './layouts/MainLayout.js';
import DashboardPage from './pages/DashboardPage.js';
import ParameterFormPage from './pages/ParameterFormPage.js';
import ParameterViewDetailsPage from './pages/ParameterViewDetailsPage.js';
import KnowledgeHubPage from './pages/KnowledgeHubPage.js';
import OrganolepticFormPage from './pages/OrganolepticFormPage.js';
import OrganolepticViewDataPage from './pages/OrganolepticViewDataPage.js';
import ReviewManagerPage from './pages/ReviewManagerPage.js';

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/parameter-masters/form" element={<ParameterFormPage />} />
        <Route path="/parameter-masters/details" element={<ParameterViewDetailsPage />} />
        <Route path="/knowledge-hub" element={<KnowledgeHubPage />} />
        <Route path="/quality-control/organoleptic-form" element={<OrganolepticFormPage />} />
        <Route path="/quality-control/organoleptic-form/view-data" element={<OrganolepticViewDataPage />} />
        <Route path="/quality-control/review-manager" element={<ReviewManagerPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
