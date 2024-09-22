import { Noto_Sans_JP } from "next/font/google";
import "./assets/css/util/mixin.scss";
import "./assets/css/util/media-queries.scss";
import "./assets/css/util/base.scss";
const notoSanJp = Noto_Sans_JP({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "My Nihon",
  description: "This is Niho's blog",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={notoSanJp.className}>{children}</body>
    </html>
  );
}
