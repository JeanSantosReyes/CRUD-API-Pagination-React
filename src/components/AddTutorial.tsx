// Hooks and Types React
import { ChangeEvent, useState } from "react";
// Services
import { createItem } from "../services/TutorialService";
// Interfaces
import { ITutorialData } from "../types/Tutorial";
// Sweet Alert
import Swal from "sweetalert2";
// Material UI
import { Box, TextField, Button } from '@mui/material';

const initialTutorialState: ITutorialData = {
    id: null,
    title: "",
    description: "",
    published: false
};

export const AddTutorial = () => {

    const [tutorial, setTutorial] = useState<ITutorialData>(initialTutorialState);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setTutorial({ ...tutorial, [name]: value });
    };

    const saveTutorial = () => {
        var data = {
            title: tutorial.title,
            description: tutorial.description
        };
        createItem(data)
            .then(({ data }) => {
                Swal.fire(`${data.title} successfully added.`, '', 'success')
                setTutorial(initialTutorialState);
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="submit-form text-center">
            <h3>Add Tutorial</h3>
            <Box component='form' noValidate autoComplete='off' sx={{ '& > :not(style)': { m: 1 } }}>
                <TextField
                    label='Title'
                    name='title'
                    value={tutorial.title}
                    onChange={handleInputChange}
                    fullWidth
                />
                <TextField
                    label='Description'
                    name='description'
                    value={tutorial.description}
                    onChange={handleInputChange}
                    fullWidth
                />
                <Button variant='contained' onClick={saveTutorial}>
                    Submit
                </Button>
            </Box>
        </div>
    )
}
