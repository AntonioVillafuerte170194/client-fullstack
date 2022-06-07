import { Routes, Route } from "react-router-dom";
import Menu from "./components/Navbar";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { Container } from "@mui/material";

export default function App() {
  return (
    <div>
      <Menu />
      <Container>
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/task/new" element={<TaskForm />} />
          <Route path="/:id/edit" element={<TaskForm />} />
        </Routes>
      </Container>
    </div>
  );
}
