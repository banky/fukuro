"use client";
import { ConnectKitButton } from "connectkit";
import Link from "next/link";
import { ReactNode } from "react";

export const Header = () => {
  return (
    <div className="flex justify-between">
      <button className="flex gap-2 text-2xl items-center">
        <h1>袋</h1>
        <h1>|</h1>
        <h1>Fukuro</h1>
      </button>
      <div className="flex gap-8 items-center">
        <HeaderLink href="/buy">Buy</HeaderLink>
        <HeaderLink href="/sell">Sell</HeaderLink>
        <ConnectKitButton />
      </div>
    </div>
  );
};

const HeaderLink = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) => {
  return (
    <Link
      className="hover:bg-slate-700 rounded-lg px-8 py-2 transition duration-200"
      href={href}
    >
      {children}
    </Link>
  );
};
