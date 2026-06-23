import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="text-lg font-semibold text-gray-900">
          Med<span className="text-teal-600">Volunteer</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link
            href="/opportunities"
            className="text-gray-600 transition-colors hover:text-teal-600"
          >
            Opportunities
          </Link>
          <Link
            href="/admin"
            className="text-gray-400 transition-colors hover:text-teal-600"
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
