import { Inter } from "next/font/google";
import "./assets/util/mixin.scss";
import "./assets/util/media-queries.scss";
import "./assets/util/base.scss";
import "./assets/component.scss";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My Nihon",
  description: "This is Niho's blog",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
