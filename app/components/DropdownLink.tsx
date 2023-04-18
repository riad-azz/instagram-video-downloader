import Link from "next/link";

const DropdownLink = ({
  content,
  href,
  target = "",
  animation = "",
}: {
  content: string;
  href: string;
  target?: string;
  animation?: string;
}) => {
  return (
    <li className={animation}>
      <Link
        href={href}
        target={target}
        className="block border border-gray-400 bg-white px-5 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700"
      >
        {content}
      </Link>
    </li>
  );
};

export default DropdownLink;
