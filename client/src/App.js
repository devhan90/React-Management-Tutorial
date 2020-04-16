import React, { useEffect, useState } from 'react';
import './App.css';
import Customer from './components/Customer';
import Paper from '@material-ui/core/Table';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 1080,
  },
});

const App = (props) => {
  const [customers, setCustomers] = useState('');
  const { classes } = props;

  const callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  };

  useEffect(() => {
    console.log('랜덩될때');
    callApi()
      .then((res) => setCustomers(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>번호</TableCell>
            <TableCell>이미지</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>생년월일</TableCell>
            <TableCell>성별</TableCell>
            <TableCell>직업</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers
            ? customers.map((c) => {
                return (
                  <Customer
                    key={c.id}
                    id={c.id}
                    image={c.image}
                    name={c.name}
                    birthday={c.birthday}
                    gender={c.gender}
                    job={c.job}
                  />
                );
              })
            : ''}
          ;
        </TableBody>
      </Table>
    </Paper>
  );
};

export default withStyles(styles)(App);
