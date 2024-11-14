import Sidebar from "@/components/main-layout-page/sidebar";

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={"flex"}>
      <Sidebar />
      {children}
    </div>
  );
}
