"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap gap-y-1 text-sm font-body">
      {links.map((link, i) => (
        <span key={link.href}>
          {i > 0 && <span className="text-fg-muted mx-1">/</span>}
          <Link
            href={link.href}
            className={
              pathname === link.href
                ? "font-bold no-underline"
                : ""
            }
          >
            {link.label}
          </Link>
        </span>
      ))}
    </nav>
  );
}
