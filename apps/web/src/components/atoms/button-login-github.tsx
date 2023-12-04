import { Button } from "../ui/button";
import { FaGithub } from "react-icons/fa";

export default function ButtonLoginGithub() {
  return (
    <Button variant="outline">
      <FaGithub className="mr-2 h-4 w-4" />
      Github
    </Button>
  );
}
