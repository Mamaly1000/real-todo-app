import React from "react";
import Layout from "../containers/layout/Layout";
import { useSession } from "next-auth/react";
import Loading from "../components/Loading";
const profile = () => {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }
  return (
    <Layout>
      {session && session.user ? (
        <div className="w-full p-2 md:p-10 flex justify-center items-center gap-2">
          <h1>wellcome to your application {session?.user?.name}</h1>
          <img
            src={session.user.image}
            alt="my profile image"
            className="max-w-[30px] max-h-[30px]"
          />
        </div>
      ) : (
        <h1 className="p-10 font-bold capitalize">
          please sign in to your account
        </h1>
      )}
    </Layout>
  );
};

export default profile;
