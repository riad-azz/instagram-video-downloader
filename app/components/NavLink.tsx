import Link from "next/link";

type NavLinkProps = {
  content: string;
  href: string;
  target?: string;
};
const NavLink = ({ content, href, target = "" }: NavLinkProps) => {
  return (
    <li>
      <Link
        href={href}
        target={target}
        className="block text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      >
        {content}
      </Link>
    </li>
  );
};

export default NavLink;
