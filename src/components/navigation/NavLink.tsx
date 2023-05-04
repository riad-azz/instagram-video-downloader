import Link from "next/link";

export interface INavLink {
  href: string;
  target?: string;
  children: React.ReactNode;
}

export const NavLink: React.FC<INavLink> = ({ href, target, children }) => {
  return (
    <li>
      <Link
        href={href}
        target={target}
        className="flex items-center gap-2 rounded bg-white px-3 py-2 font-medium text-gray-900 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
      >
        {children}
      </Link>
    </li>
  );
};
