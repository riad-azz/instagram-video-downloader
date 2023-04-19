import Link from "next/link";
import { Icons } from "@/components/Icons";

const NavLink = ({
  title,
  href,
  target,
}: {
  title: string;
  href: string;
  target?: string;
}) => {
  return (
    <li>
      <Link
        href={href}
        target={target}
        className="flex items-center gap-2 rounded bg-white px-5 py-2 font-medium text-gray-900 hover:bg-gray-100 focus:outline-none dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
      >
        <Icons.github />
        <span>{title}</span>
      </Link>
    </li>
  );
};

export default NavLink;
