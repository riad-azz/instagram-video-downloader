import { Icons } from "@/components/Icons";

interface IMenuButton {
  onClick: () => void;
}

export const MenuButton: React.FC<IMenuButton> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      data-collapse-toggle="navbar-dropdown"
      type="button"
      className="order-last ml-3 inline-flex items-center rounded-lg border border-gray-300 p-2 text-sm text-gray-500 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
      aria-controls="navbar-dropdown"
      aria-expanded="false"
    >
      <span className="sr-only">Open navbar menu</span>
      <Icons.menu />
    </button>
  );
};
