import Container from "../Container";
import Logo from "./Logo";
import NavMenu from "@/app/components/navbar/NavMenu";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
  return (
    <div className="fixed w-full bg-white z-10 shadow">
      <Container>
        <div
          className="
          flex
          flex-row
          items-center
          justify-between
          gap-3
          md:gap-0
        "
        >
          <Logo />
          <NavMenu />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
