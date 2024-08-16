import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export const NavBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
});

export const NavButton = styled(Button)({
    color: 'white',
    background:'#EF5A6F',
    padding:'5px 8px',
    fontWeight:'600',
    marginLeft: '30px',
    '&:hover':{
        background:'#FF5A6F',
    },
});

export const NavButton2 = styled(Button)({
    color: 'white',
    background:'#EF5A6F',
    padding:'5px 8px',
    fontWeight:'600',
    '&:hover':{
        background:'#FF5A6F',
    },
});

export const ListBox = styled(Box)({
    color:'black',
    textDecoration:'none',
    fontFamily:'sans-serif',
    cursor: 'pointer',
    marginLeft: '30px',
})
export const ListBox2 = styled(Box)({
    color:'black',
    marginLeft:'10%',
    padding:'5% 0 5% 0',
    textDecoration:'none',
    fontFamily:'sans-serif',
    cursor: 'pointer',
    fontSize:'26px'
})

