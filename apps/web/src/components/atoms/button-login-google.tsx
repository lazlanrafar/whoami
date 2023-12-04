import { Button } from "../ui/button";
import { FaGoogle } from "react-icons/fa";

export default function ButtonLoginGoogle() {
  return (
    <Button variant="outline">
      <FaGoogle className="mr-2 h-4 w-4" />
      Google
    </Button>
  );
}
