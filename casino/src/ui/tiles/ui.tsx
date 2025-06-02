import { Tile01Icon, Tile02Icon } from "@/assets";

interface Props {
  className?: string;
  size?: string;
  variant?: string;
  type?: string;
}

const Tiles = ({
  className,
  size = "sm",
  variant = "black",
  type = "standard",
}: Props) => {
  const styleMap: Record<
    NonNullable<Props["variant"]>,
    { color: string; background: string }
  > = {
    red: { color: "bg-accent-red", background: "text-grey-dark-1" },
    green: { color: "bg-accent-green", background: "text-light" },
    black: { color: "bg-grey-dark-1", background: "text-light" },
    purple: { color: "bg-accent-purple", background: "text-light" },
  };

  const sizeMap: Record<NonNullable<Props["size"]>, string> = {
    sm: "w-[32px] h-[32px] rounded-[4px] border-t-1",
    lg: "w-[100px] h-[100px] rounded-[8px] border-t-[2px]",
  };

  const sizeIconMap: Record<NonNullable<Props["size"]>, string> = {
    sm: "w-[19px] h-[19px]",
    lg: "w-[50px] h-[50px] ",
  };

  const selected = styleMap[variant];
  const selectedSize = sizeMap[size];
  const selectedIconSize = sizeIconMap[size];
  const defaultStyles = `flex justify-center items-center  border-border-20  ${selected.color} ${selectedSize}`;

  return (
    <div className={className ?? defaultStyles}>
      {type == "joker" ? (
        <Tile02Icon className={`${selected.background} ${selectedIconSize}`} />
      ) : (
        <Tile01Icon className={`${selected.background} ${selectedIconSize}`} />
      )}
    </div>
  );
};

export default Tiles;
