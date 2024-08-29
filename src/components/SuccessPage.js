import React from 'react';
import { Typography, Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import rakbankImage from "./rakbank.png";

const SuccessPage = () => (
    <Box sx={{ margin: 'auto', paddingTop: 10 ,textAlign:"center"}}>
        <img src={rakbankImage} alt="Image" width={300} height={200} />
        <Typography variant="h5" gutterBottom color='green'>
            Account Created Successfully!
        </Typography>
        <CheckCircleIcon sx={{ fontSize: 200, color: 'green', mb: 2 }} />
        <Typography>
           Our representative will get back to you shortly.
        </Typography>
    </Box>
);

export default SuccessPage;
