import SeoHeader from "@/components/SeoHeader";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SeoHeader />
      {children}
    </>
  );
}
