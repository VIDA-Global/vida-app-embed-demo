import "./globals.css";

export const metadata = {
  title: "Alma AI",
  description: "Demo for embedding the Vida app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
