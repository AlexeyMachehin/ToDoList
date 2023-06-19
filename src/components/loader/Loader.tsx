import { memo } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import classes from './loader.module.css';

function Loader() {
  return (
    <div className={classes.loaderWrapper}>
      <CircularProgress />
    </div>
  );
}

export default memo(Loader);
