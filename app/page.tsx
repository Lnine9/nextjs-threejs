import Container from "@/app/components/Container";
import Scene from "@/app/components/canvas/Scene";
import Logo from "@/app/components/canvas/Logo";
import ClientOnly from "@/app/components/ClientOnly";

interface HomeProps {}

const Home = async ({}: HomeProps) => {
  return (
    <Container className="h-full">
      <ClientOnly>
        <Scene>
          <Logo route="" />
        </Scene>
      </ClientOnly>
    </Container>
  );
};

export default Home;
