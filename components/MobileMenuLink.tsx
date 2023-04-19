import Link from "next/link";
import { Icons } from "@/components/Icons";

const MobileMenuLink = ({
  title,
  href,
  target,
  icon,
}: {
  title: string;
  href: string;
  target?: string;
  icon?: JSX.Element;
}) => {
  return (
    <li>
      <Link
        href={href}
        target={target}
        className="flex w-full items-center gap-4 rounded-lg border border-gray-300 bg-white px-5 py-2 font-medium text-gray-900 hover:bg-gray-100 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700"
      >
        {icon}
        <span>{title}</span>
      </Link>
    </li>
  );
};

export default MobileMenuLink;
