interface Props {
  children: React.ReactNode;
  className?: string;
  variant?: string;
}

const TableHeader = ({ children, className, variant = "black" }: Props) => {
  const styleMap: Record<
    NonNullable<Props["variant"]>,
    { color: string; background: string }
  > = {
    red: { color: "bg-accent-red", background: "text-grey-dark-1" },
    green: { color: "bg-accent-green", background: "text-light" },
    black: { color: "bg-grey-dark-1", background: "text-light" },
    purple: { color: "bg-accent-purple", background: "text-light" },
  };

  const selected = styleMap[variant];
  const defaultStyles = `flex justify-center items-center  border-border-20 px-4 py-3 rounded-[8px]  border-t-1 ${selected.color}`;

  return <div className={className ?? defaultStyles}>{children}</div>;
};

export default TableHeader;
