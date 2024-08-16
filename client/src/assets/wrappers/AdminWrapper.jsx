import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Card, Paper } from '@mui/material';
import mainBanner from '../images/back2.png';

export const AdminContainer = styled(Box)({
    padding:'4% 0% 5% 20%',
    backgroundImage:`url(${mainBanner})`,
    backgroundSize:'cover',
    '@media (max-width: 600px)':{
        padding:'5% 12%',
    }
});

export const MainBox = styled(Box)({
    display: 'flex', 
    gap:'5%',
    width:'70vw',
    
    justifyContent: 'space-between',
    '@media (max-width: 600px)':{
        // padding:'5% 8%',
        flexDirection:'column'
    }
});

export const AdminDetailBox = styled(Box)({
    display: 'flex',
    flex:'.5',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem',
    borderRadius: '8px',
    backgroundColor: '#EF5A70',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    margin: '6% 0%',
    '@media (max-width: 600px)': {
        width: '100%',
        margin: '10% 0%',
    }
});

export const AdminCard = styled(Card)({
    width: '100%',
    maxWidth: '400px',
    padding:'10% 2%',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff'
});

export const PaperBox = styled(Paper)({
    padding: 2,
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height:'100px',
    transition: 'background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease', // Transition effects
    '&:hover': {
        backgroundColor: '#EF5A6F',
        color: 'white',
        boxShadow: ' rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px', // Adjust the shadow as needed
    },
    '@media (max-width: 600px)': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '120px'
    }
})
