import { getCsrfToken } from "next-auth/react";
import {
  type InferGetServerSidePropsType,
  type GetServerSidePropsContext,
  type NextPage,
} from "next";
import Head from "next/head";
import SigninForm from "@/components/form/SigninForm";

type SignInPageType = NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
>;

const SigninPage: SignInPageType = ({ csrfToken }) => {
  return (
    <>
      <Head key="adasdd">
        <title>Sign In</title>
        <meta name="description" content="sign in page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="grid min-h-screen bg-[#0f1e57] lg:grid-cols-2">
        <div className=" col-span-1 col-start-1 flex flex-col items-center justify-center gap-5 p-6">
          <SigninForm csrfToken={csrfToken} />
        </div>
        <div
          style={{
            backgroundImage: "url(/reasearch-woman.jpg)",
            backgroundPosition: "top center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
          className="col-span-2 col-start-2  hidden items-center justify-center lg:flex "
        ></div>
      </main>
    </>
  );
};

export default SigninPage;
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const csrfToken = (await getCsrfToken(context)) as string;
  return {
    props: {
      csrfToken,
    },
  };
}