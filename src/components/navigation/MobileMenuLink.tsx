import Link from "next/link";

export interface IMobileMenuLink {
  href: string;
  target?: string;
  children: React.ReactNode;
}

export const MobileMenuLink: React.FC<IMobileMenuLink> = ({
  href,
  target,
  children,
}) => {
  return (
    <li>
      <Link
        href={href}
        target={target}
        className="flex w-full items-center gap-4 rounded-lg border border-gray-300 bg-white px-5 py-2 font-medium text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700"
      >
        {children}
      </Link>
    </li>
  );
};
