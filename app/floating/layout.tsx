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
