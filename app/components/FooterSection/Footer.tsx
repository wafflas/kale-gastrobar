import Logo from "../shared/Logo";
import Button from "../shared/Button";
import InfoTable from "./components/InfoTable";

export default function Footer() {
  return (
    <footer className="bg-darkbrown text-cream py-12 flex items-center justify-center w-full h-[90%] rounded-t-[70px] relative">
      <div className="w-full mx-auto px-1 h-full flex flex-col justify-center space-y-10">
        <div className="flex flex-col items-center justify-center space-y-8 ">
          <Logo useImage={true} imageSrc="/logo.png" size="md"  />
          <p className="text-center text-[25px] md:text-[40px] lg:text-[50px] font-vollkorn  leading-tight">
            Great stories begin at our table.
          </p>
          <Button variant="secondary" size="lg" aria-label="Make a reservation">
            RESERVE
          </Button>
          <InfoTable />
          <p className="text-center text-sm lg:text-md tracking-wider">
            &copy; {new Date().getFullYear()} Kalè Gastrobar. All rights
            reserved.
          </p>
          <p className="text-center text-xs lg:text-md tracking-wider opacity-30 text-cream">
            This website made by wafflas
          </p>
        </div>
      </div>
    </footer>
  );
}
