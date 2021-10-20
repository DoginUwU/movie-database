import type { NextPage } from "next";
import { useRouter } from "next/router";
import HomeContainer from "../components/Home";
import Sidebar from "../components/Sidebar";

const Home: NextPage = () => {
  const router = useRouter();
  const { type } = router.query;

  return (
    <>
      <Sidebar />
      <HomeContainer type={type?.toString()} />
    </>
  );
};

export default Home;
