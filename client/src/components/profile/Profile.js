import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';
import { getProfileById } from '../../action/profile';
import { Link } from 'react-router-dom';

const Profile = ({
	match,
	getProfileById,
	profile: { profile, loading },
	auth,
}) => {
	useEffect(() => {
		getProfileById(match.params.id);
	}, [getProfileById, match.params.id]);
	return (
		<Fragment>
			{profile === null || loading ? (
				<Spinner />
			) : (
				<Fragment>
					<Link to='/profiles' className='btn btn-light'>
						Back To Profies
					</Link>
					{auth.isAuthenticated &&
						auth.loading === false &&
						auth.user._id === profile.user._id && (
							<Link to='/edit-profile' className='btn btn-dark'>
								Edit Profile
							</Link>
						)}
					<div class='profile-grid my-1'>
						<ProfileTop profile={profile} />
						<ProfileAbout profile={profile} />
						<div class='profile-exp bg-white p-2'>
							<h2 class='text-primary'>Experiences</h2>
							{profile.experience.length > 0 ? (
								<Fragment>
									{profile.experience.map((exp) => (
										<ProfileExperience key={exp._id} exp={exp} />
									))}
								</Fragment>
							) : (
								<h4>No Experience Credentials</h4>
							)}
						</div>
						<div class='profile-edu bg-white p-2'>
							<h2 class='text-primary'>Education</h2>
							{profile.education.length > 0 ? (
								<Fragment>
									{profile.education.map((edu) => (
										<ProfileEducation key={edu._id} edu={edu} />
									))}
								</Fragment>
							) : (
								<h4>No Education Credentials</h4>
							)}
						</div>

						{profile.githubusername && (
							<ProfileGithub username={profile.githubusername} />
						)}
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

Profile.propTypes = {
	getProfileById: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
