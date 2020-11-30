import { CircularProgress, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(() => ({
  spinner: {
    height: '80px!important',
    width: '80px!important'
  },
  wrapper: {
    width: '100%',
    position: 'fixed',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

export const Loading = () => {
  const styles = useStyles();
  return (
    <div className={styles.wrapper}>
      <CircularProgress className={styles.spinner} />
    </div>
  )
}
