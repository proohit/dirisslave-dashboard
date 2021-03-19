import {
  CircularProgress,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import React, { FC, useState } from 'react';

type LogProps = {
  loading: boolean;
  log: string | undefined;
};

const logStyles = makeStyles((theme) => ({
  logContainer: (props: { expanded: boolean }) => ({
    maxHeight: props.expanded ? undefined : 400,
    padding: theme.spacing(2),
    overflowY: 'auto',
    overflowX: 'hidden',
  }),
}));

export const Log: FC<LogProps> = (props) => {
  const { loading, log } = props;
  const [expanded, setExpanded] = useState(false);
  const classes = logStyles({ expanded });
  return (
    <Paper className={classes.logContainer}>
      {loading ? <CircularProgress /> : <Typography>{log}</Typography>}
    </Paper>
  );
};
