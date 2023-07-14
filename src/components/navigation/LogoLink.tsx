import Link from "next/link";
import { Icons } from "@/components/Icons";

export interface ILogoLink {
  title: string;
  href: string;
}

export const LogoLink: React.FC<ILogoLink> = ({ title, href }) => {
  return (
    <Link className="flex items-center gap-2 py-2" href={href}>
      <Icons.download size={30} />
      <span className="self-center whitespace-nowrap text-2xl font-semibold text-gray-800 dark:text-white">
        {title}
      </span>
    </Link>
  );
};
