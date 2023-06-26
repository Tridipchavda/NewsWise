import * as React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { grey, red } from '@mui/material/colors';
import { Padding } from '@mui/icons-material';

function CircularProgressWithLabel(props) {
  /* Error Warning Success */
  const [progressColor,setProgressColor] = React.useState("error");
  React.useEffect(() => {
    if(props.value < 33){
      // progressColor = 'Error'
      setProgressColor('error');
    }else if(props.value <66){
      // progressColor = 'Warning'
      setProgressColor('warning');
    }else{
      // progressColor = 'Success'
      setProgressColor('success');
    }
  
  }, [])
  
  return (
    <Box sx={{ position: 'relative', display: 'flex',flexDirection:'column' }}>
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress style={{marginLeft:18}} color={progressColor} variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
    <Typography variant='p' color="#63a2bb"> VerityScale </Typography>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function MyCircularProgress(props) {
  return <CircularProgressWithLabel value={props.value} />;
}