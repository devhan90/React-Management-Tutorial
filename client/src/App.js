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
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = (theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 1080,
  },
  progress: {
    margin: theme.spacing.unut * 2,
  },
});

const App = (props) => {
  const [customers, setCustomers] = useState('');
  const [progress, setProgress] = useState(0);
  const { classes } = props;

  const callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  };

  useEffect(() => {
    console.log('랜더링 되었다');
    callApi()
      .then((res) => setCustomers(res))
      .catch((err) => console.log(err));
    function tick() {
      // reset when reaching 100%
      setProgress(
        /* 이런식의 익명함수를 보기 좋게 쓰면 밑에것처럼 되는 것이다. 첫번째 ()는 파라미터, 두번째 ()는 함수식과 리턴값 자체를 의미한다. */
        /* function(들어간놈){
          return 들어간놈 >= 100 ? 0 : 들어간놈 + 1
        } */
        (들어간놈) => (들어간놈 >= 100 ? 0 : 들어간놈 + 1)
      );
    }
    const timer = setInterval(tick, 20);
    return () => {
      clearInterval(timer);
    };
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
          {customers ? (
            customers.map((c) => {
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
          ) : (
            <TableRow>
              <TableCell colSpan="6" align="center">
                <CircularProgress
                  className={classes.progress}
                  variant="determinate"
                  value={progress}
                />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default withStyles(styles)(App);
