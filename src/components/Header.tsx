interface HeaderProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({
  title = "Header title",
  subtitle = "",
  className = "",
}) => {
  return (
    <div className={className}>
      <h1 className="animate-text bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 bg-clip-text py-2 text-2xl font-extrabold text-transparent sm:text-4xl">
        {title}
      </h1>
      {subtitle && (
        <h2 className="text-sm text-primary sm:text-lg">{subtitle}</h2>
      )}
    </div>
  );
};

export default Header;
