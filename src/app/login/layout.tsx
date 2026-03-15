import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Telemart Admin",
  description: "Sign in to the Telemart admin panel",
};

/**
 * Login layout - minimal, without the public Navbar/Footer.
 */
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
