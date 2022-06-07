import { Button, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TasList() {
  const navigate = useNavigate();
  const [Tasks, setTask] = useState([]);
  const loadTask = async () => {
    const response = await fetch("http://localhost:4000");
    const data = await response.json();
    setTask(data);
  };
  const handleDelete = async (id) => {
    try {
      // console.log(id);
      await fetch(`http://localhost:4000/${id}`, {
        method: "DELETE",
      });
      // console.log(res);
      setTask(Tasks.filter((Task) => Task.id !== id));
    } catch (error) {
      console.log("error!");
    }
  };
  useEffect(() => {
    loadTask();
  }, []);
  return (
    <>
      <h1>Task List</h1>
      {Tasks.map((Task) => (
        <Card
          style={{ marginBottom: "0.7rem", backgroundColor: "#1e272e" }}
          key={Task.id}
        >
          <CardContent
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{ color: "white" }}>
              <Typography>{Task.title}</Typography>
              <Typography>{Task.description}</Typography>
            </div>
            <div>
              <Button
                variant="contained"
                color="inherit"
                onClick={() => navigate(`/${Task.id}/edit`)}
              >
                edit
              </Button>
              <Button
                variant="contained"
                color="warning"
                onClick={() => handleDelete(Task.id)}
                style={{
                  margin: "0.5rem",
                }}
              >
                delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
