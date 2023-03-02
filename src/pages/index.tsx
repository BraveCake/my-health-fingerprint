import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "@/utils/api";
import CompanyLogo from "@/components/brand/CompanyLogo";
import Image from "next/image";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>MHFP</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid min-h-screen grid-rows-[200px_1fr] bg-[#0f1e57] p-8 xl:py-8 xl:px-48">
        <header className="row- flex items-center justify-between rounded-lg  ">
          <CompanyLogo />
          <nav className="hidden lg:block">
            <ul className="flex gap-9 text-lg text-white">
              <li>
                <Link href="">Link 1</Link>
              </li>
              <li>
                <Link href="">Link 2</Link>
              </li>
              <li>
                <Link href="">Link 3</Link>
              </li>
              <li>
                <Link href="">Link 4</Link>
              </li>
              <li>
                <Link href="">Link 5</Link>
              </li>
            </ul>
          </nav>
          <AuthShowcase />
        </header>
        <main className="grid gap-3  bg-[#0f1e57] md:grid-cols-2">
          <div className="col-span-1 col-start-1 flex flex-col items-start justify-center gap-10 text-white ">
            <div className="flex flex-col gap-3 font-mont font-semibold capitalize ">
              <h2 className="text-5xl lg:text-6xl ">Intelligent</h2>
              <h2 className="text-5xl lg:text-6xl">automation</h2>
              <h2 className="text-5xl lg:text-6xl">
                For{" "}
                <span className="bg-gradient-to-r from-[#f75e8e] to-[#fc737c] bg-clip-text text-transparent">
                  healthcare
                </span>
              </h2>
            </div>
            <p className="max-w-[30ch] text-2xl font-normal leading-normal">
              Automate every patient encounter and workflow, from front desk to
              back office.
            </p>
            <button className="rounded-md bg-white px-6 py-3 font-semibold text-black shadow-md">
              Request demo
            </button>
          </div>
          <div className="col-span-2 col-start-2 hidden md:flex ">
            <Image
              width={700}
              height={700}
              src="./pomodoro-technique.svg"
              alt=""
            />
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <button
      className="rounded-full bg-white px-8 py-2 font-semibold text-[#0f1e57] no-underline transition md:px-10 md:py-3"
      onClick={sessionData ? () => void signOut() : () => void signIn()}
    >
      {sessionData ? "Sign out" : "Sign in"}
    </button>
  );
};
