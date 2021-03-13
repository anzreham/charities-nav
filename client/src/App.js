import React from 'react';
import { Router, Link, navigate } from '@reach/router';
import Storage from './components/Storage';
import axios from 'axios';
import Register from './components/Register';
import Login from './components/Login';
import UserPage from './components/UserPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import CharityPage from './components/CharityPage';
import CharityDetail from './components/CharityDetail';
import CharityActivities from './components/CharityActivities';
import CharityNews from './components/CharityNews';
import InformationCharity from './components/InformationCharity';
import Charitylocation from './components/Charitylocation';
import UpateActivity from './components/UpateActivity';


function App() {
	const handleLogout = () => {
		axios
			.delete('http://localhost:7000/api/sessions/?format=json')
			.then((res) => {
				Storage.clear();
				console.log('logout', Storage);
				navigate(`/`);
			})
			.catch((err) => console.error(err));
	};

	return (
		<div className="">
			<Router>
				<Home path="/" handleLogout={handleLogout} />
				<Register path="/register/" />
				<Login path="/login" />
				<UserPage path="/user-dashboard" handleLogout={handleLogout} />
				<CharityPage path="/charity-dashboard" />
				<CharityDetail path="/charity-detail" />
				<CharityDetail path="/charity-detail" />
				<CharityActivities path="/CharityActivities" />
				<UpateActivity path="/updateActivity" />
				<InformationCharity path="/charity/information/:pk" handleLogout={handleLogout} />
				<Charitylocation path="/Charitylocation" />
				<CharityNews path="/CharityNews" />
			</Router>
		</div>
	);
}

export default App;
