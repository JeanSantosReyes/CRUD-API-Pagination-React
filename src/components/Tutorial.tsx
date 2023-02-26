// Hooks and Types React
import { ChangeEvent, useEffect, useState } from "react";
// React Router DOM
import { useNavigate, useParams } from "react-router-dom";
// Services
import { getItem, removeItem, updateItem } from "../services/TutorialService";
// Interfaces
import { ITutorialData } from "../types/Tutorial";
// Sweet Alert
import Swal from "sweetalert2";
// Material UI
import { Box, TextField, Button } from '@mui/material';

export const Tutorial = () => {

    const { id } = useParams();
    let navigate = useNavigate();

    const initialTutorialState: ITutorialData = {
        id: null,
        title: "",
        description: "",
        published: false
    };

    const [currentTutorial, setCurrentTutorial] = useState<ITutorialData>(initialTutorialState);

    const getTutorial = (id: string) => {
        getItem(id)
            .then(({ data }) => {
                setCurrentTutorial(data);
            })
            .catch((e: Error) => {
                Swal.fire('Error', `Can't get data`, 'error');
                console.log(e);
            });
    };

    useEffect(() => {
        if (id) getTutorial(id);
    }, [id]);

    const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = target;
        setCurrentTutorial({ ...currentTutorial, [name]: value });
    };

    const updatePublished = (status: boolean) => {
        var data = {
            id: currentTutorial.id,
            title: currentTutorial.title,
            description: currentTutorial.description,
            published: status
        };
        updateItem(currentTutorial.id, data)
            .then(() => {
                setCurrentTutorial({ ...currentTutorial, published: status });
                Swal.fire('Status changed successfully', '', 'success')
            })
            .catch((e: Error) => {
                Swal.fire('Error', e.message, 'error');
                console.log(e);
            });
    };

    const updateTutorial = () => {
        updateItem(currentTutorial.id, currentTutorial)
            .then(() => {
                Swal.fire(`${currentTutorial.title} Updated Successfully.`, '', 'success');
                navigate("/tutorials");
            })
            .catch((e: Error) => {
                Swal.fire('Error', e.message, 'error');
                console.log(e);
            });
    };

    const deleteTutorial = () => {
        removeItem(currentTutorial.id)
            .then(() => {
                Swal.fire(`${currentTutorial.title} Successfully Deleted.`, '', 'success');
                navigate("/tutorials");
            })
            .catch((e: Error) => {
                Swal.fire('Error', e.message, 'error');
                console.log(e);
            });
    };

    return (
        <div className="edit-form">
            <h4 className="text-center">Tutorial</h4>

            <Box component='form' noValidate autoComplete='off' sx={{ '& > :not(style)': { m: 1 } }}>
                <TextField
                    label='Title'
                    name='title'
                    value={currentTutorial.title}
                    onChange={handleInputChange}
                    fullWidth
                />
                <TextField
                    label='Description'
                    name='description'
                    value={currentTutorial.description}
                    onChange={handleInputChange}
                    fullWidth
                />
                <Box component='label'>
                    <strong>Status:</strong> {currentTutorial.published ? "Published" : "Pending"}
                </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', '& > :not(style)': { m: 1 } }}>
                <Button variant='contained' color='primary' onClick={() => updatePublished(!currentTutorial.published)}>
                    {currentTutorial.published ? 'UnPublish' : 'Publish'}
                </Button>

                <Button variant='contained' color='error' onClick={deleteTutorial}>
                    Delete
                </Button>

                <Button variant='contained' color='success' onClick={updateTutorial}>
                    Update
                </Button>
            </Box>

        </div>
    )
}
