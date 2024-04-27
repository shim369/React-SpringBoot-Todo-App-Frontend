import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button } from '@mui/material';
import { red } from '@mui/material/colors';
import { Link, useParams } from "react-router-dom";
import { Todo } from '../../types/todo';

export default function TaskEdit() {
    const paperStyle = { padding: '30px 20px', maxWidth: 600, margin: '50px auto' };
    const buttonColor = red[600];
    const { id } = useParams();
    const [errors, setErrors] = useState<string[]>([]);
    const [task, setTask] = useState<Todo>({ id: 0, title: '', url: '' });

    useEffect(() => {
        const getTaskById = async () => {
            try {
                const response = await fetch(`http://localhost:8080/task/get/${id}`);
                const fetchedTask = await response.json();
                setTask({ ...fetchedTask });
            } catch (error) {
                console.error('Error fetching task:', error);
            }
        };

        getTaskById();
    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTask(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = {
            id: task.id,
            title: task.title,
            url: task.url
        };

        let errors: string[] = [];

        if (!data.title) {
            errors.push('Task title is required!');
        }

        if (!data.url) {
            errors.push('Task URL is required!');
        }

        setErrors(errors);

        if (errors.length === 0) {
            try {
                const response = await fetch(`http://localhost:8080/task/update/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                const textResponse = await response.text();
                console.log(textResponse);
            } catch (error) {
                console.error('Error updating task:', error);
            }
        }
    };

    return (
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <h2 style={{ color: '#1976d2' }}>Edit Task</h2>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        '& > :not(style)': { m: 2, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        id="outlined-basic"
                        label="Task Title"
                        variant="outlined"
                        value={task.title}
                        name="title"
                        onChange={handleInputChange}
                    />
                    <TextField
                        id="outlined-basic2"
                        label="Task URL"
                        variant="outlined"
                        value={task.url}
                        name="url"
                        onChange={handleInputChange}
                    />
                    <div>
                        <ul className="text-danger">
                            {errors.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </div>
                    <Button variant="contained" type="submit" style={{ backgroundColor: buttonColor }}>
                        Update Task
                    </Button>
                </Box>
            </Paper>
            <Link to="/">Back to Top</Link>
        </Container>
    );
}
