import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addLike, removeLike } from '../../action/post';

const PostItem = ({
	addLike,
	removeLike,
	auth,
	post: { _id, text, name, avatar, user, likes, comments, date },
}) => {
	return (
		<div class='post bg-white my-1'>
			<div>
				<a href='profile.html'>
					<img class='rounded-img my-1' src={avatar} alt='' />
					<h4>{name}</h4>
				</a>
			</div>
			<div class=''>
				<p class='my-1'>{text}</p>
				<p className='post-date'>
					Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
				</p>
				<button onClick={(e) => addLike(_id)} class='btn'>
					<i class='fas fa-thumbs-up'></i>
					{likes.length > 0 && <span> {likes.length}</span>}
				</button>
				<button class='btn' onClick={(e) => removeLike(_id)}>
					<i class='fas fa-thumbs-down'></i>
				</button>

				<Link to={`/post/${_id}`} class='btn btn-primary'>
					Discussion{' '}
					{comments.length > 0 && (
						<span className='comment-count'>{comments.length}</span>
					)}
				</Link>

				{!auth.loading && user === auth.user._id && (
					<button type='button' className='btn btn-danger'>
						<i className='fas fa-times' />
					</button>
				)}
			</div>
		</div>
	);
};

PostItem.propTypes = {
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike })(PostItem);
