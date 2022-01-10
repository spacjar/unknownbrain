//TODO: refactor in future, make more classes and fucntions
import { CSVLink } from 'react-csv'
import React, {useState, useRef, createRef} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { Button } from '@material-ui/core';
import { withRouter ,useLocation } from 'react-router-dom';
import {useHistory} from 'react-router';
import axios from 'axios';
import { getUserData } from '../members/store/userSlice';

/*function createData(name, email, age, phone, registrationNumber) {
  return { name, email, age, phone, registrationNumber };
}

const rows = [
  createData('Test', 'test1', 3, 6765646645, 4),
  createData('Tesstt', 'test2', 25, 551, 4),
  createData('Testtt', 'test3', 16, 24, 6),
  createData('Testt', "test4", 24, 4, 10),
  createData('Teest', "test5", 16, 49, 3),
  createData('TTest', "test6", 3, 87, 6),
  createData('TEEST', "test7", 9, 37, 4),
  createData('Testak', "test8", 0, 94, 0),
  createData('Testik', "test9", 26, 65, 7),
  createData('Testuiju', "test10", 0, 98, 0),
  createData('Testy', "test11", 0, 81, 2),
  createData('Atak', "test12", 19, 9, 37),
  createData('Dale', "test13", 18, 63, 4),
];*/

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'img', numeric: false, disablePadding: true },
  { id: 'name', numeric: false, disablePadding: true, label: 'Jméno' },
  { id: 'email', numeric: true, disablePadding: false, label: 'E-mail' },
  { id: 'age', numeric: true, disablePadding: false, label: 'Datum narození' },
  { id: 'phone', numeric: true, disablePadding: false, label: 'Telefon' },
  { id: 'unit', numeric: false, disablePadding: false, label: 'Skupina' },
  { id: 'events', numeric: false, disablePadding: false, label: 'Tréninky' },
  { id: 'facility', numeric: false, disablePadding: false, label: 'Sportoviště' },
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  const [csvData, setcsvData] = useState([]);
  const [userMenu, setUserMenu] = useState(null);
  const csvLink = useRef();

  const handleOpen = async () => {
    const url = "/user/export";
    await axios.get(url).then(response => {
      setcsvData(response.data);
      csvLink.current.link.click()
      });
  }

  const userMenuClick = event => {
		setUserMenu(event.currentTarget);
	};

	const userMenuClose = () => {
		setUserMenu(null);
	};

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Uživatelé
        </Typography>
      )}
      <Popover
				open={Boolean(userMenu)}
				anchorEl={userMenu}
				onClose={userMenuClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center'
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center'
				}}
				classes={{
					paper: 'py-8'
				}}
			>
        <MenuItem role="button" onClick={() => {userMenuClose(); handleOpen(); }}>
							<ListItemIcon className="min-w-40" >
								<Icon>account_circle</Icon>
							</ListItemIcon>
							<ListItemText primary="Export všech uživatelů" />
						</MenuItem>
						<MenuItem role="button" onClick={() => {userMenuClose;}}>
							<ListItemIcon className="min-w-40">
								<Icon>mail</Icon>
							</ListItemIcon>
							<ListItemText primary="Export pro MŠMT (doplníme)" />
						</MenuItem>
            <MenuItem role="button" onClick={() => {userMenuClose;}}>
							<ListItemIcon className="min-w-40">
								<Icon>mail</Icon>
							</ListItemIcon>
							<ListItemText primary="Export pro Magistrát města (doplníme)" />
						</MenuItem>
      </Popover>
      <>
      <button onClick={(e)=> userMenuClick(e)} type="submit">Export uživatele</button>
      </>
      <CSVLink
         data={csvData}
         filename='users.csv'
         className='hidden'
         ref={csvLink}
         target='_blank'
      />
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [tabValue, setTabValue] = useState(0);
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [dataP, setDataP] = useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = React.useState([]);
  const history = useHistory();

function getUsers( ) {
  const url = "/user/list?member=1";
return new Promise((resolve, reject) => {
axios.get(url).then(response => {
      setData(response.data.data);
});
});
}

function getPublics( ) {
  const url = "/user/list?member=0";
return new Promise((resolve, reject) => {
axios.get(url).then(response => {
      setDataP(response.data.data);
});
});
}

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

	function handleChangeTab(event, value) {
		setTabValue(value);
	}

  React.useEffect(()=>{
		getUserData();
    getUsers( );
    getPublics();
	}, []);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const submitFilter = (event) => {
    event.preventDefault();
    const url = `/user/search?text=${event.target.text.value}`;
    return new Promise((resolve, reject) => {
    axios.get(url).then(response => {
          setData(response.data.data);
    });
    });
  }

  function handleUserDetail( id ) {
	  const replace = "/users/detail/:id/edit".replace(":id", id);
    history.push(replace);
  }

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  return (
    <FusePageSimple
    classes={{
      header: 'min-h-160 h-160',
      toolbar: 'min-h-48 h-48',
      rightSidebar: 'w-288',
      content: classes.content
    }}
    
    contentToolbar={
      <Tabs
        value={tabValue}
        onChange={handleChangeTab}
        indicatorColor="secondary"
        textColor="secondary"
        variant="scrollable"
        scrollButtons="off"
        className="w-full px-24"
      >
        <Tab className="text-14 font-600 normal-case" label="Členové" />
        <Tab className="text-14 font-600 normal-case" label="Veřejnost" />
      </Tabs>
    }

    content={
        <div className="p-12">
          {tabValue === 0 && (
            <FuseAnimateGroup
              className="flex flex-wrap"
              enter={{
                animation: 'transition.slideUpBigIn'
              }}
            >
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
          <form onSubmit={submitFilter} method="POST" style={{margin: "0 15px"}}>
              Filtrovat uživatele: 
              <input type="text" name="text" id="text"/>
              <input type="submit" value="Filtrovat"/>
          </form>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={data.length}
              />
              <TableBody>
                {stableSort(data, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((dataS, index) => {
                    const isItemSelected = isSelected(dataS.name);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                      key={dataS.id}
                        hover
                        onClick={(event) => handleClick(event, dataS.name)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </TableCell>
                        <TableCell>
                          <Avatar src={`https//api.bvsp.rezervin.app/${dataS.photo}`} alt="User img"/>
                        </TableCell>
                        <TableCell component="th" id={labelId} scope="row" padding="none" align="left">
                          <Button onClick={() => handleUserDetail(dataS.id)}>
                            {dataS.first_name} {dataS.last_name} 
                          </Button>
                        </TableCell>  
                        <TableCell align="left">{dataS.mail}</TableCell>
                        <TableCell align="left">{dataS.birthday}</TableCell>
                        <TableCell align="left">{dataS.phone}</TableCell>
                        <TableCell align="left">{dataS.units ? dataS.units.map((unit)=>{return `${unit.name} `}) : " "}</TableCell>
                        <TableCell align="left">{dataS.units ? dataS.units.map((unit)=>{return unit.events.map((event)=>{return `${event.description} `})}) : " "}</TableCell>
                        <TableCell align="left">{dataS.facility_id === 1 ? "Koráb" : dataS.facility_id === 2 ? "Domyno" : "Mikulovka"}</TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}       // outdated material-ui knihovna? tohle v ofiko dokumentaci není
            onChangeRowsPerPage={handleChangeRowsPerPage} //same
          />
          </Paper>
          </div>
          </FuseAnimateGroup>
          )}
          {tabValue === 1 && (
              <FuseAnimateGroup
                className="flex flex-wrap"
                enter={{
                  animation: 'transition.slideUpBigIn'
                }}
              >
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
          <form onSubmit={submitFilter} method="POST" style={{margin: "0 15px"}}>
            Filtrovat uživatele: 
            <input type="text" name="text" id="text"/>
            <input type="submit" value="Filtrovat" />
          </form>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={dataP.length}
              />
              <TableBody>
                {stableSort(dataP, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((dataS, index) => {
                    const isItemSelected = isSelected(dataS.name);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                      key={dataS.id}
                        hover
                        onClick={(event) => handleClick(event, dataS.name)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                          <Button onClick={() => handleUserDetail(dataS.id)}>{dataS.first_name} {dataS.last_name}</Button>
                        </TableCell>  
                        <TableCell align="left">{dataS.mail}</TableCell>
                        <TableCell align="left">{dataS.birthday}</TableCell>
                        <TableCell align="left">{dataS.phone}</TableCell>
                        <TableCell align="left">{dataS.units ? dataS.units.map((unit)=>{return `${unit.name} `}) : " "}</TableCell>
                        <TableCell align="left">{dataS.units ? dataS.units.map((unit)=>{return unit.events.map((event)=>{return `${event.description} `})}) : " "}</TableCell>
                        <TableCell align="left">{dataS.facility_id === 1 ? "Koráb" : dataS.facility_id === 2 ? "Domyno" : "Mikulovka"}</TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}       // outdated material-ui knihovna? tohle v ofiko dokumentaci není
            onChangeRowsPerPage={handleChangeRowsPerPage} //same
          />
          </Paper>
          </div>
          </FuseAnimateGroup>
          )}
      </div>
    }
    />
  );
}

export default withRouter(EnhancedTable);