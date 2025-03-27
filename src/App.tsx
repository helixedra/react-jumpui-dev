import "./App.css";
import { Button } from "./jump-ui";
import { RiArrowLeftLine, RiSearchLine } from "react-icons/ri";
import Input from "./jump-ui/components/Input";

function App() {
  return (
    <main className="p-4 space-y-4">
      <Button disabled>Button</Button>
      <Button className="w-full">Button</Button>
      <Button
        className="bg-red-600 text-2xl someClass"
        icon={<RiArrowLeftLine />}
      >
        Button
      </Button>

      <Input />
      <Input icon={<RiSearchLine />} iconEnd={<RiArrowLeftLine />} />
    </main>
  );
}

export default App;
