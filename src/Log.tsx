import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import React, { FC, useEffect, useState } from 'react';
import { LogEntry } from './App';
import { ExpandMore } from './ExpandMore';

type LogProps = {
  loading: boolean;
  log: LogEntry[];
};

const logStyles = makeStyles((theme) => ({
  logContainer: {
    maxHeight: 400,
    overflowY: 'auto',
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
    wordBreak: 'break-word',
  },
  filter: {
    paddingBottom: theme.spacing(2),
  },
}));

const ALL_LEVELS = 'ALL';
export const Log: FC<LogProps> = (props) => {
  const { loading, log } = props;
  const classes = logStyles();
  const [filteredLogs, setFilteredLogs] = useState(log);
  const [levelFilter, setLevelFilter] = useState(ALL_LEVELS);
  const [textFilter, setTextFilter] = useState('');

  useEffect(() => {
    if (log) {
      filterLogs(log, textFilter, levelFilter);
    }
  }, [levelFilter, log, textFilter]);

  const filterLogs = (logs: LogEntry[], text: string, level: string) => {
    if (logs) {
      let newFilteredLogs = [...logs];
      if (text !== '' && text.length >= 3) {
        newFilteredLogs = newFilteredLogs.filter((entry) =>
          entry.message.includes(text)
        );
      }
      if (level !== ALL_LEVELS) {
        newFilteredLogs = newFilteredLogs.filter(
          (entry) => entry.level === level
        );
      }
      setFilteredLogs(newFilteredLogs);
    }
  };

  const handleTextFilter = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const value = event.target.value || event.currentTarget.value;
    setTextFilter(value);
  };

  const handleLevelFilter = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    const value = event.target.value || event.currentTarget.value;
    setLevelFilter(value as string);
  };

  return (
    <div className={classes.logContainer}>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <div className={classes.filter}>
            <TextField
              variant="outlined"
              label="Search..."
              value={textFilter}
              placeholder="Please enter at least 3 words"
              onChange={handleTextFilter}
            />
            <Select
              variant="outlined"
              label="Level"
              value={levelFilter}
              onChange={handleLevelFilter}
              defaultValue={ALL_LEVELS}
            >
              <MenuItem value={ALL_LEVELS}>All</MenuItem>
              <MenuItem value={'INFO'}>Info</MenuItem>
              <MenuItem value={'WARN'}>Warn</MenuItem>
              <MenuItem value={'ERROR'}>Error</MenuItem>
            </Select>
          </div>
          {filteredLogs?.map((entry, index) => (
            <Accordion key={index}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                {entry.timestamp}, {entry.level}
              </AccordionSummary>
              <AccordionDetails>{entry.message}</AccordionDetails>
            </Accordion>
          ))}
        </>
      )}
    </div>
  );
};
