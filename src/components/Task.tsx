import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button } from '@mui/material';

export default function Task() {
    const paperStyle = { padding: "30px 20px", maxWidth: 600, margin: "50px auto", }
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const task = {title, url}
        console.log(task)
        fetch("http://localhost:8080/task/add",{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(task)
        }).then(() => {
            console.log("New Task Added")
        })
    }
    return (
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <h1 style={{ color: "#1976d2" }}>Add Task</h1>
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
                    <Button variant="contained" type='submit'>Submit</Button>
                </Box>
            </Paper>
        </Container>
    );
}