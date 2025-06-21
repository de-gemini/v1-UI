import React from "react";

type HeaderProps = {
  head: string;
  subtitle: string;
};

export const Header = ({ head, subtitle }: HeaderProps) => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">{head}</h1>
      <p className="text-gray-500 mt-1">{subtitle}</p>
    </div>
  );
};