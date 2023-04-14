import Scene from "@/app/components/canvas/Scene";
import Logo from "@/app/components/canvas/Logo";
import ClientOnly from "@/app/components/ClientOnly";
import { Backdrop } from "@react-three/drei";

interface HomeProps {}

const Home = async ({}: HomeProps) => {

  return (
    <ClientOnly>
      <Scene className="h-full" shadows="basic">
        <Logo route="" />
      </Scene>
    </ClientOnly>
  );
};

export default Home;
