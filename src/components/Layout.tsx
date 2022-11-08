import React from "react";

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  return (
    <div className="min-w-screen min-h-screen flex flex-col bg-white">
      <header className="bg-orange-400 flex flex-col items-center rounded-xl m-6 py-3">
        <h1 className="font-bold text-3xl font-azeret">TIPIKOR</h1>
        <h2 className="mt-1 font-semibold text-xl font-sans tracking-wide">
          Titip Beli Anak Kantor
        </h2>
      </header>
      <main className="flex h-full flex-1 overflow-y-scroll">{children}</main>
      <footer className="h-20 bg-orange-400 mt-6 flex items-center justify-center flex-col">
        <p className="text-lg">
          Created by{" "}
          <a className="font-semibold" href="https://sudiddo.me">
            Asynchronous
          </a>
        </p>
        <p className="font-semibold">2022</p>
      </footer>
    </div>
  );
}

export default Layout;
