import React from "react";
// import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
// import ThumbUpAltIcon from '@mui/material/ThumbUpAltIcon'
import { ThumbUpAltIcon } from '@mui/material'
import { ThumbDownAltIcon } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'

// import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import styles from "../styles/Home.module.css";

const Votes = ({ video, videos, vote, rating, stateUpdater, updateVideo }) => {
	const voteUpdater = (videoObj, totalVote) => {
		let updatedVideo = { ...videoObj, rating: totalVote };
		let newData = [...videos];
		const i = newData.findIndex((video) => video.id === videoObj.id);
		newData[i] = updatedVideo;
		const videoId = updatedVideo.id;
		const updatedVote = updatedVideo.rating;
		updateVideo(videoId, updatedVote);
		return stateUpdater(newData);
	};

	function kFormatter(num) {
		return Math.abs(num) > 999
			? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'K'
			: Math.sign(num) * Math.abs(num)
	}

	return (
		<div className={styles['votes-container']}>
			{/* <ThumbUpAltIcon
				onClick={() => voteUpdater(video, rating + 1)}
				className={styles.like}
				fontSize='large'
				variant='contained'
			/> */}
			<FontAwesomeIcon icon={faThumbsUp} />
			<h3 className={styles.votes}>Votes: {kFormatter(vote)}</h3>
			{/* <ThumbDownAltIcon
				onClick={() => voteUpdater(video, rating - 1)}
				className={styles.dislike}
				fontSize='large'
				variant='contained'
			/> */}
			<FontAwesomeIcon icon={faThumbsDown} />
		</div>
	)
};

export default Votes;
