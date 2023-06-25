import { DetailedHTMLProps, ButtonHTMLAttributes } from "react";

export const Button = (
  props: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) => {
  return (
    <button
      className="bg-purple-500 px-2 py-2 rounded-md hover:scale-105 transition"
      {...props}
    />
  );
};
