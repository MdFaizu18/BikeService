import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export const ImageBox = styled('img')({
       width: '90%',
       borderRadius: '20px',
       '@media (max-width: 600px)': {
              width: '100%',
              marginBottom: '20px'
       }
});

export const ImageBox2 = styled('img')({
       width: '90%',
       borderRadius: '20px',
       '@media (max-width: 600px)': {
              width: '100%',
              marginBottom: '20px'
       }
});

export const LogoBox = styled(Box)({
       display: 'flex',
       justifyContent: 'center',
       alignItems: 'center',
       height: '180px',
       '@media (max-width: 600px)': {
              height: '120px'
       }
})

export const AboutBox = styled(Box)({
       height: '120px', 
       width: '150px', 
       background: '#EEEDEB',
       flexDirection:'column',
       gap:"10px", 
       borderRadius: '10px', 
       display: 'flex', 
       justifyContent: 'center', 
       alignItems: 'center', 
       boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px",
       transition:'all 0.2s ease-in-out',
       '&:hover':{
              boxShadow:" rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px"
       },
       '@media (max-width: 600px)': {
              width:"100px",
       }

})