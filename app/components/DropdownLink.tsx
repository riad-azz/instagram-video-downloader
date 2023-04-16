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
        className="block text-gray-900 bg-white border border-gray-400 focus:outline-none hover:bg-gray-100 font-medium text-sm px-5 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600"
      >
        {content}
      </Link>
    </li>
  );
};

export default DropdownLink;
