"use client";

import { IconType } from "react-icons";

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`
        rounded-lg
        border-2
        p-4
        flex
        flex-col
        gap-3
        items-center
        justify-center
        hover:border-blue-500
        hover:text-blue-500
        transition
        cursor-pointer
        ${
          selected
            ? "border-blue-500 text-blue-500"
            : "border-neutral-200 text-neutral-500"
        }
      `}
    >
      <Icon size={30} />
      <div className="font-semibold">{label}</div>
    </div>
  );
};

export default CategoryBox;
