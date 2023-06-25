import { DetailedHTMLProps, InputHTMLAttributes } from "react";

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label: string;
};
export const Input = ({ label, ...props }: InputProps) => {
  return (
    <div className="flex flex-col">
      <p>{label}</p>
      <input {...props} className="text-black px-4 py-2 rounded-md" />
    </div>
  );
};
