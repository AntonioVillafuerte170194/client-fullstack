import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Navbar() {
  const [Task, setTask] = useState({ title: "", description: "" });
  const [Loading, setLoading] = useState(false);
  const [Editing, setEditing] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (Editing) {
      await fetch(`http://localhost:4000/${params.id}`, {
        method: "PUT",
        body: JSON.stringify(Task),
        headers: { "Content-Type": "application/json" },
      });
    } else {
      await fetch("http://localhost:4000/task", {
        method: "POST",
        body: JSON.stringify(Task),
        headers: { "Content-Type": "application/json" },
      });
    }
    setLoading(false);
    navigate("/");
  };
  const handleChange = (e) =>
    setTask({ ...Task, [e.target.name]: e.target.value });

  const LoadTask = async (id) => {
    const res = await fetch(`http://localhost:4000/${id}`);
    const dato = await res.json();
    console.log(dato);
    setTask({ title: dato, description: dato });
    // console.log(Task);
    setEditing(true);
  };
  useEffect(() => {
    if (params.id) {
      LoadTask(params.id);
    }
  }, [params.id]);
  return (
    <Grid
      container
      direction="column"
      alingItem="center"
      justifyContent="center"
    >
      <Grid item xs={3}>
        <Card
          sx={{ mt: 5 }}
          style={{ backgroundColor: "#1e272e", padding: "1rem" }}
        >
          <Typography variant="5" textAlign="center" color="white">
            {Editing ? "Edit Task" : "Creat Task"}
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="filled"
                label="write your title"
                sx={{ display: "block", margin: "5rem 0" }}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
                name="title"
                value={Task.title}
                onChange={handleChange}
              />
              <TextField
                variant="filled"
                label="write your description"
                multiline
                rows={4}
                sx={{ display: "block", margin: "5rem 0" }}
                inputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
                name="description"
                value={Task.description}
                onChange={handleChange}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!Task.title || !Task.description}
              >
                {Loading ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  "Save"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
