import { Container, Grid, IconButton, Typography } from '@material-ui/core';
import React from 'react';
import { useQuery } from 'react-query';
import './App.css';
import { CurrentlyPlayingList } from './CurrentlyPlaying';
import { GuildsList } from './GuildsList';
import { Log } from './Log';

const url = 'http://localhost:8080';
export interface MusicStatusEntry {
  guildName: string;
  songTitle: string;
  currentSongPosition: string;
}

const getJson = async (url: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return await (await fetch(url)).json();
};

function App() {
  const { data: guilds, isLoading: guildsLoading } = useQuery<string[]>(
    'guilds',
    () => getJson(`${url}/guilds`)
  );

  const {
    data: currentlyPlaying,
    isLoading: currentlyPlayingLoading,
  } = useQuery<MusicStatusEntry[]>('currentlyPlaying', () =>
    getJson(`${url}/nowplaying`)
  );

  const { data: logText, isLoading: logLoading } = useQuery<string>(
    'log',
    async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const data = await fetch(`${url}/logs`);
      return data.text();
    }
  );

  const renderCurrentlyPlaying =
    currentlyPlayingLoading || !isNaN(currentlyPlaying?.length as number);
  return (
    <Container>
      <Grid container direction="column" spacing={5}>
        <Grid item>
          <Typography variant="h4">Connected Servers</Typography>
          <GuildsList guilds={guilds} loading={guildsLoading} />
        </Grid>
        <Grid item>
          <Typography variant="h4">Currently Playing</Typography>
          <CurrentlyPlayingList
            currentlyPlaying={currentlyPlaying}
            loading={currentlyPlayingLoading}
          />
        </Grid>
        <Grid item>
          <Typography variant="h5">Log</Typography>
          <IconButton>
            <
          </IconButton>
          <Log loading={logLoading} log={logText} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
