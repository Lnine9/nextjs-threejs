import Burger from "@/app/components/models/burger/Burger";
import LaptopSection from "@/app/components/homeSections/LaptopSection";
import { Suspense } from "react";
import Loader from "@/app/components/Loader";
import ClientOnly from "@/app/components/ClientOnly";
import "./home.css";

const Home = () => {
  return (
    <div
      id="container"
      className="h-[calc(100vh-theme(height.navh))] relative overflow-y-scroll"
    >
      <ClientOnly>
        <section className="h-full">
          <LaptopSection />
        </section>
        <section className="h-full">
          <span className="hash-span" id="burger">
            &nbsp;
          </span>
          <Suspense fallback={<Loader />}>
            <Burger />
          </Suspense>
        </section>
        <section className="h-full" />
      </ClientOnly>
    </div>
  );
};

export default Home;
