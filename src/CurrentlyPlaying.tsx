import {
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from '@material-ui/core';
import React, { FC } from 'react';
import { MusicStatusEntry } from './App';

type CurrentlyPlayingListProps = {
  currentlyPlaying: MusicStatusEntry[] | undefined;
  loading?: boolean;
};
export const CurrentlyPlayingList: FC<CurrentlyPlayingListProps> = (props) => {
  const { currentlyPlaying, loading } = props;
  return (
    <Paper>
      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {currentlyPlaying?.length === 0 && (
            <ListItem>
              <ListItemText>
                <Typography>No one is listening</Typography>
              </ListItemText>
            </ListItem>
          )}
          {currentlyPlaying?.map((musicStatusEntry) => (
            <ListItem key={musicStatusEntry.guildName}>
              <ListItemText>
                <Typography>{musicStatusEntry.guildName}</Typography>
                <Typography>{musicStatusEntry.songTitle}</Typography>
                <Typography>{musicStatusEntry.currentSongPosition}</Typography>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};
