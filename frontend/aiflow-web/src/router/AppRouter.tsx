import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import AgentPage from "../pages/AgentPage";
import DashboardPage from "../pages/DashboardPage";
import TaskPage from "../pages/TaskPage";
import WorkflowPage from "../pages/WorkflowPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="workflows" element={<WorkflowPage />} />
          <Route path="tasks" element={<TaskPage />} />
          <Route path="agent" element={<AgentPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
