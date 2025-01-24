"use client";

import AdminSidebar from "@/components/admin/Sidebar";
import { AdminLayoutContainer } from "./layout.styles";
const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AdminLayoutContainer>
      <AdminSidebar />
      {children}
    </AdminLayoutContainer>
  );
};

export default AdminLayout;
