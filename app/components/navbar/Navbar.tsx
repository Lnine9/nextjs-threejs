import Container from "../Container";
import Logo from "./Logo";
import NavMenu from "@/app/components/navbar/NavMenu";
import SmallNavMenu from "@/app/components/navbar/SmallNavMenu";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
  return (
    <div className="sticky top-0 w-full bg-white z-50 shadow">
      <Container>
        <div
          className="
          flex
          flex-row
          justify-between
          md:justify-start
          items-center
          mx-auto
          w-full
          max-w-screen-xl
          space-x-12
          h-navh
          overflow-hidden
        "
        >
          <Logo />
          <NavMenu />
          <SmallNavMenu />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
