import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button } from '@mui/material';

export default function Task() {
    const paperStyle = { padding: "30px 20px", maxWidth: 600, margin: "50px auto", }
    const [name, setName] = useState('')
    const [url, setUrl] = useState('')
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
                >
                    <TextField id="outlined-basic" label="Task Name" variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField id="outlined-basic2" label="Task URL" variant="outlined"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    <Button variant="contained">Add Task</Button>
                </Box>
            </Paper>
        </Container>
    );
}