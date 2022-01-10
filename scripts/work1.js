import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import withReducer from 'app/store/withReducer';
import _ from '@lodash';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import reducer from './store';
// import { selectProjects, getProjects } from './store/projectsSlice';


import Widget11 from './widgets/Widget11';
import Widget2 from './widgets/Widget2';

const useStyles = makeStyles(theme => ({
	content: {
		'& canvas': {
			maxHeight: '100%'
		}
	},
	selectedProject: {
		background: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
		borderRadius: '8px 0 0 0'
	},
	projectMenuButton: {
		background: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
		borderRadius: '0 8px 0 0',
		marginLeft: 1
	},
	paperModal: {
		position: 'absolute',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	  },
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

function ProjectDashboardApp(props) {
	const dispatch = useDispatch();

	const classes = useStyles(props);
	const pageLayout = useRef(null);
	const [tabValue, setTabValue] = useState(0);
	const [data, setData] = useState([]);
	const classesModal = useStyles();
	const [modalStyle] = React.useState(getModalStyle);
	const [open, setOpen] = React.useState(false);
	const [messageError, setMessageError] = useState("");
	const [messageSuccess, setMessageSuccess] = useState("");
	const [openS, setOpenS] = useState(false);
	const [openE, setOpenE] = useState(false);

	function Alert(dataA) {
		return <MuiAlert elevation={6} variant="filled" {...dataA} />;
	  }

	function handleChangeTab(event, value) {
		setTabValue(value);
	}

	function getModalStyle() {
		const top = 50;
		const left = 50;
	  
		return {
		  top: `${top}%`,
		  left: `${left}%`,
		  transform: `translate(-${top}%, -${left}%)`,
		};
	  }

	  const handleCloseM = (event, reason) => {
		if (reason === 'clickaway') {
		  return;
		}
	
		setOpenS(false);
		setOpenE(false);
	  };
	
	const handleOpen = () => {
		setOpen(true);
	};
	
	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmitAdd = (event) => {
		event.preventDefault()
		const token = localStorage.getItem('jwt_access_token');
			return new Promise((resolve, reject) => {
				axios.post('/unit/add', {
					"name" : event.target.name.value,
					"parent_id" : event.target.parent_id.value === "" ? null : event.target.parent_id.value,
					"description" : event.target.description.value === "" ? null :  event.target.description.value,
					"capacity" :  event.target.capacity.value === "" ? null :  event.target.capacity.value,
					"shortcut" : event.target.shortcut.value === "" ? null :  event.target.shortcut.value,
					"age":event.target.age.value === "" ? null :  event.target.age.value,
					"registration_open":event.target.registration.value === "" ? null :  event.target.registration.value,
					"facility_id": event.target.facility.value === "" ? null :  event.target.facility.value,
				}).then(response => {
					if(response.data.success){
					handleClose();
					setMessageSuccess("Úspěšně jste založili skupinu");
					setOpenS(true);
					}else{
						handleClose();
						setMessageError("Nepovedlo se založit skupinu, zkuste to později");
						setOpenE(true);
					}
				}).catch(error => {
					handleClose();
					setMessageError("Něco se nepovedlo, zkuste to později, nebo kontaktujte správce");
					setOpenE(true);
				});
			});
	}

	const body = (
		<div style={modalStyle} className={classesModal.paperModal}>
		<h2 id="simple-modal-title" className="mt-10 mb-36 theme.colors.blue font-semibold">Přidat skupinu</h2>
		<form onSubmit={handleSubmitAdd}>
		<div className="form-inputs overflow-y-auto max-h-half">	
			<div className="form-group my-10">
			<label htmlFor="name" className="font-medium text-gray-700 mb-10">Jméno: 
			<input type="text" className="form-control rounded-md w-full py-10 px-10 text-gray-700 leading-tight bg-gray-50 border border-solid border-gray-300 mt-5 focus:bg-gray-200 focus:border-gray-500 focus:border-8" id="name" name="name" required />
			</label>
		</div>
		<div className="form-group my-10">
			<label htmlFor="description" className="font-medium text-gray-700 mb-10">Popis: 
			<input type="text" className="form-control appearance-none border rounded w-full py-10 px-10 text-gray-700 leading-tight focus:outline-none focus:-outline bg-gray-50 border-solid border-1 border-gray-300 mt-5" id="description" name="description" />
			</label>
		</div>
		<div className="form-group my-10">
			<label htmlFor="capacity" className="font-medium text-gray-700 mb-10">Kapacita:  
			<input type="number" className="form-control  appearance-none border rounded w-full py-10 px-10 text-gray-700 leading-tight focus:outline-none focus:-outline bg-gray-50 border-solid border-1 border-gray-300 mt-5" id="capacity" name="capacity" />
			</label>
		</div>
		<div className="form-group my-10">
			<label htmlFor="parent_id" className="font-medium text-gray-700 mb-10">Nadřazená skupina:  
			<input type="number" className="form-control  appearance-none border rounded w-full py-10 px-10 text-gray-700 leading-tight focus:outline-none focus:-outline bg-gray-50 border-solid border-1 border-gray-300 mt-5" id="parent_id" name="parent_id" />
			</label>
		</div>
		<div className="form-group my-10">
			<label htmlFor="shortcut" className="font-medium text-gray-700 mb-10">Zkratka:  
			<input type="text" className="form-control  appearance-none border rounded w-full py-10 px-10 text-gray-700 leading-tight focus:outline-none focus:-outline bg-gray-50 border-solid border-1 border-gray-300 mt-5" id="shortcut" name="shortcut"/>
			</label>
		</div>
		<div className="form-group my-10">
			<label htmlFor="age" className="font-medium text-gray-700 mb-10">Věk:  
			<input type="text" className="form-control  appearance-none border rounded w-full py-10 px-10 text-gray-700 leading-tight focus:outline-none focus:-outline bg-gray-50 border-solid border-1 border-gray-300 mt-5" id="age" name="age"/>
			</label>
		</div>
		<div className="form-group my-10">
			<label htmlFor="registration" className="font-medium text-gray-700 mb-10">Registrace otevřena: 
			<select className="form-control  appearance-none border rounded w-full py-10 px-10 text-gray-700 leading-tight focus:outline-none focus:-outline bg-gray-50 border-solid border-1 border-gray-300 mt-5" id="registration" name="registration">
			<option value="0">Ne</option>
			<option value="1">Ano</option>
			</select>
			</label>
		</div>
		<div className="form-group my-10">
			<label htmlFor="facility" className="font-medium text-gray-700 mb-10">Sportoviště: 
			<select className="form-control  appearance-none border rounded w-full py-10 px-10 text-gray-700 leading-tight focus:outline-none focus:-outline bg-gray-50 border-solid border-1 border-gray-300 mt-5" id="facility" name="facility">
			<option value="1">Koráb</option>
			<option value="2">Dynamo</option>
			<option value="3">Mikulovka</option>
			</select>
			</label>
		</div>
	  </div>
	  <button type="submit"  variant="contained" color="primary" className="w-full bg-blue-500 py-10 mt-36 text-white font-medium rounded">Přidat skupinu</button>
	  </form>
	  </div>
	  );

	React.useEffect(()=>{
		getWidget2Data();
	}, []);

	function getWidget2Data() {
		const token = localStorage.getItem('jwt_access_token');
		return new Promise((resolve, reject) => {
			axios.get('/unit/list').then(response => {
				setData(response.data.data);
			});
		});
	}

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
					<Tab className="text-14 font-600 normal-case" label="Home" />
					<Tab className="text-14 font-600 normal-case" label="Team Members" />
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
							<>
							{openS ? <Snackbar
		 style={{ height: "100%" }}
		 anchorOrigin={{
			vertical: "top",
			horizontal: "center"
		 }}
		 open={openS} autoHideDuration={6000} onClose={handleCloseM}>
        		<Alert onClose={handleCloseM} severity="success">
					{messageSuccess}
				</Alert>
					 </Snackbar> :
					  <Snackbar
					  style={{ height: "100%" }}
  					  anchorOrigin={{
      				  vertical: "top",
      				  horizontal: "center"
   		}} 
					  open={openE} autoHideDuration={6000} onClose={handleCloseM}>
 		        <Alert onClose={handleCloseM} severity="error">
					{messageError}
				 </Alert>
						</Snackbar>
			}
							<Button variant="contained" className="btn-primary" style={{width: "100%", height: "50px", margin: "0px 10px"}} onClick={handleOpen}>Přidat skupinu</Button>{' '}
							<Modal
        						open={open}
        						onClose={handleClose}
        						aria-labelledby="simple-modal-title"
        						aria-describedby="simple-modal-description"
     						>
        						{body}
      						</Modal>
							</>
							{data.map(map => 
							<div
							key = {map.id}
							className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
								<Widget2
								id = {map.id}
								facility = {map.facility_id}
								member_count = {map.member_count}
								name= {map.name}
								age={map.age}
								registration_open={map.registration_open}
								shortcut = {map.shortcut}
								parent_id = {map.parent_id}
								description = {map.description}
								capacity = {map.capacity}
								/>
							</div>
						
						)}
						</FuseAnimateGroup>
					)}
					{tabValue === 2 && (
						<FuseAnimateGroup
							className="flex flex-wrap"
							enter={{
								animation: 'transition.slideUpBigIn'
							}}
						>
							<div className="widget flex w-full p-12">
								<Widget11 />
							</div>
						</FuseAnimateGroup>
					)}
				</div>
			}
			ref={pageLayout}
		/>
	);
}

export default withReducer('projectDashboardApp', reducer)(ProjectDashboardApp);