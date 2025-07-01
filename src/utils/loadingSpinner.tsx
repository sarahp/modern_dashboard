import CircularProgress from '@mui/material/CircularProgress';
import { Box, Typography } from '@mui/material';

const loadingSpinner = ({ message = "Loading..." }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" py={4}>
      <CircularProgress />
      <Typography variant="body2" color="textSecondary" style={{ marginTop: '0.5rem' }}>
        {message}
      </Typography>
    </Box>
  );
};

export default loadingSpinner;
