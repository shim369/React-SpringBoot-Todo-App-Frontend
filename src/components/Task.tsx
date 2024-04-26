import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button, Link } from '@mui/material';
import { Todo } from "../../types/todo"
import { red } from '@mui/material/colors';

export default function Task() {
    const paperStyle = { padding: "30px 20px", maxWidth: 600, margin: "50px auto", }
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [tasks, setTasks] = useState<Todo[]>([])
    const buttonColor = red[600]

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const task = { title, url }
        console.log(task)
        fetch("http://localhost:8080/task/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task)
        }).then(() => {
            console.log("New Task Added")
        })
    }

    useEffect(() => {
        const getAllTask = () => {
            fetch("http://localhost:8080/task/getAll")
                .then(res => res.json())
                .then((result) => {
                    setTasks(result)
                })
        }
        getAllTask();
    }, [tasks])

    const handleDelete = (id: number) => {
        fetch(`http://localhost:8080/task/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        })
        .then(() => {
            setTasks(tasks.filter((task) => task.id !== id));
            console.log("Deleted Task");
        })
        .catch((error) => {
            console.error('There was a problem deleting the task:', error);
        });
    };
    
    return (
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <h2 style={{ color: "#1976d2" }}>Add Task</h2>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 2, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >
                    <TextField id="outlined-basic" label="Task Title" variant="outlined"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextField id="outlined-basic2" label="Task URL" variant="outlined"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    <Button variant="contained" type='submit' style={{ backgroundColor: buttonColor }}>Submit</Button>
                </Box>
            </Paper>
            <Paper elevation={3} style={paperStyle}>
                <h2 style={{ color: "#1976d2" }}>Tasks</h2>
                {tasks.map((task,index) => (
                    <Paper elevation={3} style={{margin:"10px",padding:"15px",textAlign:"left", display: 'flex', justifyContent: 'space-between', alignItems: 'center'}} key={index}>
                        <div>{task.id} <Link href={task.url} target="_blank">{task.title}</Link></div>
                        <Button variant="contained" onClick={() => handleDelete(task.id)}>Delete</Button>
                    </Paper>
                ))}
            </Paper>
        </Container>
    );
}