import Link from "next/link";
import { Icons } from "@/components/Icons";

export interface ILogoLink {
  title: string;
}

export const LogoLink: React.FC<ILogoLink> = ({ title }) => {
  return (
    <Link className="flex items-center gap-2 py-2" href="/">
      <Icons.logo size={40} />
      <span className="self-center whitespace-nowrap text-2xl font-semibold text-gray-800 dark:text-white">
        {title}
      </span>
    </Link>
  );
};
