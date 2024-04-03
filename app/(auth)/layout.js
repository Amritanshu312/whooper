export const metadata = {
  title: "whooper",
  description: "whooper website description here ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="root">
          {children}
        </div>
      </body>
    </html>
  );
}
