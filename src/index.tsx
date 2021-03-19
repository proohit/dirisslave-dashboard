import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AppBar, Button, CssBaseline, Toolbar } from '@material-ui/core';

const queryClient = new QueryClient();
ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppBar position="sticky">
        <Toolbar>
          DirisSlave Dashboard
          <Button variant="text">Logs</Button>
        </Toolbar>
      </AppBar>
      <CssBaseline />
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
