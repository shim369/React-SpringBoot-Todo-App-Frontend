import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper } from '@mui/material';

export default function Task() {
    const paperStyle = {padding: "30px 20px", marginTop: "50px"}
    return (
        <Container>
            <Paper elevation={3} style={paperStyle}>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 2, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField id="outlined-basic" label="Task Name" variant="outlined" />
                <TextField id="outlined-basic" label="Task URL" variant="outlined" />
            </Box>
            </Paper>
        </Container>
    );
}