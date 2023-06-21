import Header from "@/components/layouts/Header";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";
import GlobalProvider from "./GlobalProvider";
import Head from "./head";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head />
      <body>
        <GlobalProvider>
          <Header />
          {children}
        </GlobalProvider>
      </body>
    </html>
  );
}
