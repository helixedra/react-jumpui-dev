import "./App.css";
import { Button, Input, Checkbox } from "./jump-ui";
import { RiArrowLeftLine, RiSearchLine } from "react-icons/ri";
import Columns from "./jump-ui/components/Columns";
import Column from "./jump-ui/components/Column";
import Center from "./jump-ui/components/Center";
import Card from "./jump-ui/components/Card";
import Box from "./jump-ui/components/Box";
import Badge from "./jump-ui/components/Badge";
import ThemeToggle from "./ToggleTheme";

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
      <ThemeToggle />
      <Button disabled>Button</Button>
      <Button className="w-full">Button</Button>
      <Button icon={<RiArrowLeftLine />}>Button</Button>
      <Button icon={<RiArrowLeftLine />} iconEnd={<RiArrowLeftLine />}>
        Button
      </Button>
      <Button outline>Outline Button</Button>
      <Button outline iconEnd={<RiSearchLine />}>
        Outline Button
      </Button>

      <Input />
      <Input
        placeholder="Search"
        icon={<RiSearchLine />}
        iconEnd={<RiArrowLeftLine />}
      />

      <form onSubmit={(e) => submitHandler(e)} className="space-y-4">
        <Checkbox name="option" />
        <Box gap={4}>
          <Input className="flex-grow" name="name" />
          <Box gap={4}>
            <Button className="w-24">Submit</Button>
            <Button className="w-24" outline onClick={(e) => handleReset(e)}>
              Reset
            </Button>
          </Box>
        </Box>
      </form>

      <Box justify="between">
        <Button iconButton>
          <RiArrowLeftLine size={18} />
        </Button>
        <Button iconButton outline>
          <RiArrowLeftLine size={18} />
        </Button>
      </Box>

      <Columns cols={2} outline rounded>
        <Column p={8}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Exercitationem incidunt beatae sed ratione, vitae harum accusantium
          voluptatum, officiis, corrupti distinctio culpa laudantium qui ullam
          reiciendis assumenda. Impedit ea ex officiis?
        </Column>
        <Column>
          <Center>
            <Card p={8} shadow>
              <form className="space-y-4">
                <Input name="email" type="email" label="E-mail" />
                <Input name="password" type="password" label="Password" />
                <Button className="mt-8">Login</Button>
              </form>
            </Card>
          </Center>
        </Column>
      </Columns>

      <Box gap={1}>
        <Badge dot="bg-red-500" bg="bg-red-500">
          Declined
        </Badge>
        <Badge bg="bg-yellow-500">Pending</Badge>
        <Badge bg="bg-green-600" fill text="text-white">
          Approved
        </Badge>
        <Badge bg="bg-[#0000ff]" dot="bg-[#0000ff]" text="text-[#0000ff]">
          Approved
        </Badge>
      </Box>
    </main>
  );
}

export default App;
