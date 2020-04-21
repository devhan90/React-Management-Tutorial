// import CustomerAdd from './components/CustomerAdd';
import AppBar from '@material-ui/core/AppBar';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import { default as Paper, default as Table } from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import React, { useEffect, useState } from 'react';
import './App.css';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },

  // 지정한 스타일
  root: {
    width: '100%',
    minWidth: 1080,
  },
  paper: {
    marginLeft: 18,
    marginRight: 18,
  },
  table: {
    minWidth: 1080,
  },
  progress: {
    margin: theme.spacing.unut * 2,
  },
  menu: {
    marginTop: 15,
    marginBottom: 15,
    display: 'flex',
    justifyContent: 'center',
  },
}));

const App = () => {
  const [customers, setCustomers] = useState('');
  const [progress, setProgress] = useState(0);
  const [keyword, setKeyword] = useState('');
  // const { classes } = props;
  const classes = useStyles();

  const stateRefresh = () => {
    setCustomers('');
    setProgress(0);
    setKeyword('');
    callApi()
      .then((res) => setCustomers(res))
      .catch((err) => console.log(err));
  };

  const callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  };

  const handleValueChange = (e) => {
    setKeyword(e.target.value);
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
      setCustomers('');
    };
  }, []);

  const cellList = [
    '번호',
    '프로필 이미지',
    '이름',
    '생년월일',
    '성별',
    '직업',
    '설정',
  ];

  const filteredComponents = (data) => {
    data = data.filter((c) => {
      return c.name.indexOf(keyword) > -1;
    });
    return data.map((c) => {
      return (
        <Customer
          stateRefresh={stateRefresh}
          key={c.id}
          id={c.id}
          image={c.image}
          name={c.name}
          birthDay={c.birthDay}
          gender={c.gender}
          job={c.job}
        />
      );
    });
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            고객관리 시스템
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="검색하기..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              name="searchKeyword"
              value={keyword}
              onChange={handleValueChange}
            />
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.menu}>
        <CustomerAdd stateRefresh={stateRefresh} />
      </div>
      <Paper className={classes.paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {cellList.map((c) => {
                return <TableCell>{c}</TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {customers ? (
              filteredComponents(customers)
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
    </div>
  );
};

export default App;
