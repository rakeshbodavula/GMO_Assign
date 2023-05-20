import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Grid } from '@mui/material';

const FirstPage = () => {
    const navigate = useNavigate();
    const [details, setDetails] = useState({});

    const inputChangeHandler = (e) => {
        setDetails((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const formSubmitHandler = (e) => {
        e.preventDefault();
        localStorage.setItem('details', JSON.stringify(details));
        navigate('/second');
    };

    return (
        <>
        <h2>Enter Details</h2>
            <Grid container justifyContent="center">
                <Grid item xs={12} sm={6} md={4}>
                    <form onSubmit={formSubmitHandler}>
                        <TextField
                            label="Name"
                            variant="outlined"
                            name="name"
                            fullWidth
                            margin="normal"
                            onChange={inputChangeHandler}
                            required
                        />
                        <TextField
                            label="Phone"
                            variant="outlined"
                            name="phone"
                            fullWidth
                            margin="normal"
                            onChange={inputChangeHandler}
                            required
                        />
                        <TextField
                            label="Email"
                            variant="outlined"
                            name="email"
                            fullWidth
                            margin="normal"
                            onChange={inputChangeHandler}
                            required
                        />
                        <Button variant="contained" type="submit" fullWidth>
                            Submit
                        </Button>
                    </form>
                </Grid>
            </Grid>
        </>
    );
};

export default FirstPage;
