import { ReactNode } from "react";

interface MainModel {
  children: ReactNode;
}

function main({ children }: MainModel) {
  return <main>{children}</main>;
}

export default main;
