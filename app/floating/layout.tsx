export const metadata = {
  title: "Sweesh Voice Widget",
  description: "A compact always-on-top voice widget for quick recordings.",
};

export default function FloatingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: "transparent",
          overflow: "hidden",
        }}
      >
        {children}
      </body>
    </html>
  );
}
