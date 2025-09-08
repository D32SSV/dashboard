import Navbar from "../components/reusable/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    return <header>
        <Navbar/>
        {children}
    </header>
}
