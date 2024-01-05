import { ElementType } from "react";

interface ButtonComponentProps {
  as?: ElementType;
  children: React.ReactNode;
}

export type ButtonProps = ButtonComponentProps &
  (JSX.IntrinsicElements["a"] | JSX.IntrinsicElements["button"]);

export const Button: React.FC<ButtonProps> = ({
  children,
  as: Tag = "button",
  ...others
}) => {
  return (
    <Tag
      {...others}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      {children}
    </Tag>
  );
};
