"use client"
import Navbar from "../components/reusable/Navbar";

export default  function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <header>
      <Navbar />
        {children}
    </header>
  );
}

