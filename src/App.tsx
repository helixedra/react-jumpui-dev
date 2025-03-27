import "./App.css";
import { Button, Input, Checkbox } from "./jump-ui";
import { RiArrowLeftLine, RiSearchLine } from "react-icons/ri";

function App() {
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    for (const [name, value] of formData.entries()) {
      console.log(`${name}: ${value}`);
    }
  };
  const handleReset = (e: React.MouseEvent) => {
    e.preventDefault();
    const form = (e.currentTarget as HTMLButtonElement).form;
    form?.reset();
  };
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

      <form onSubmit={(e) => submitHandler(e)} className="space-y-4">
        <Checkbox name="option" />
        <Input name="name" />
        <Button>submit</Button>
        <Button onClick={(e) => handleReset(e)}>reset</Button>
      </form>
    </main>
  );
}

export default App;
