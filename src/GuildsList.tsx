import {
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Paper,
} from '@material-ui/core';
import React, { FC } from 'react';

type GuildsListProps = {
  guilds: string[] | undefined;
  loading?: boolean;
};
export const GuildsList: FC<GuildsListProps> = (props) => {
  const { guilds, loading } = props;
  return (
    <Paper>
      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {guilds?.map((guild) => (
            <ListItem divider key={guild}>
              <ListItemText>{guild}</ListItemText>
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};
