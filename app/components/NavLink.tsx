import Link from "next/link";

const NavLink = ({
  content,
  href,
  target = "",
}: {
  content: string;
  href: string;
  target?: string;
}) => {
  return (
    <li>
      <Link
        href={href}
        target={target}
        className="block text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600"
      >
        {content}
      </Link>
    </li>
  );
};

export default NavLink;
