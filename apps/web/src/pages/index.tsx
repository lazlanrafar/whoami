import Image from "next/image";
import { Inter } from "next/font/google";
import { Button } from "~/components/ui/button";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque,
        hic accusantium exercitationem alias esse reprehenderit minus? Nostrum
        voluptatum quas voluptatem quod, aut est. A quae quo, ex eos explicabo
        perspiciatis.
      </p>

      <Button>Click me</Button>
    </div>
  );
}
