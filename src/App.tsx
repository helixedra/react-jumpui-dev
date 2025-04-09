import "./App.css";
import {
  Button,
  Input,
  Checkbox,
  Badge,
  Columns,
  Column,
  Center,
  Card,
  Box,
  Dialog,
  Radio,
} from "./jump-ui";
import { RiArrowLeftLine, RiSearchLine } from "react-icons/ri";
import { Table } from "./jump-ui/components/Table";

// Sample data
const users = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert@example.com",
    role: "Editor",
  },
];

import ThemeToggle from "./ToggleTheme";
import { Select, Option } from "./jump-ui/components/Select";

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
      <Select className="w-80">
        <Option value="op1-1">Opt</Option>
        <Option value="op2">Exercitationem incidunt beatae sed ratione</Option>
        <Option value="op3">Exercitationem incidunt</Option>
      </Select>
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
      <DialogContainer />
      {/* Basic table with striped rows and hover effect */}
      <Table striped hover className="mb-8">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Role</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {users.map((user) => (
            <Table.Tr key={user.id}>
              <Table.Td>{user.id}</Table.Td>
              <Table.Td>{user.name}</Table.Td>
              <Table.Td>{user.email}</Table.Td>
              <Table.Td>{user.role}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      {/* Bordered and compact table */}
      <Table bordered compact>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Role</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <Table.Tr key={user.id}>
                <Table.Td>{user.id}</Table.Td>
                <Table.Td>{user.name}</Table.Td>
                <Table.Td>{user.email}</Table.Td>
                <Table.Td>{user.role}</Table.Td>
              </Table.Tr>
            ))
          ) : (
            <Table.EmptyRow colSpan={4} message="No users found" />
          )}
        </Table.Tbody>
      </Table>

      <Radio.Group
        name="favorite-fruit"
        legend="Choose your favorite fruit"
        required={true}
        orientation="vertical"
      >
        <Radio value="apple" label="Apple" />
        <Radio value="banana" label="Banana" />
        <Radio value="orange" label="Orange" disabled />
        <Radio value="strawberry" label="Strawberry" />
      </Radio.Group>
    </main>
  );
}

export default App;

import { useState } from "react";
export function DialogContainer() {
  "use client";
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Dialog</Button>
      <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Dialog.Header>Dialog Title</Dialog.Header>
        <Dialog.Content>
          <p>This is the content of the dialog.</p>
        </Dialog.Content>
      </Dialog>
    </>
  );
}
