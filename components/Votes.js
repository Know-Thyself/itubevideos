import React from 'react'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt'
import styles from '../styles/Home.module.css'

const Votes = ({ video, videos, vote, rating, stateUpdater, updateVideo }) => {
	const voteUpdater = (videoObj, totalVote) => {
		let updatedVideo = { ...videoObj, rating: totalVote }
		let newData = [...videos]
		const i = newData.findIndex((video) => video.id === videoObj.id)
		newData[i] = updatedVideo
		const videoId = updatedVideo.id
		const updatedVote = updatedVideo.rating
		updateVideo(videoId, updatedVote)
		return stateUpdater(newData)
	}

	return (
		<div className={styles['votes-container']}>
			<ThumbUpAltIcon
				onClick={() => voteUpdater(video, rating + 1)}
				className={styles.like}
				fontSize='large'
				variant='contained'
			/>
			<h3 className={styles.votes}>Votes: {vote}</h3>
			<ThumbDownAltIcon
				onClick={() => voteUpdater(video, rating - 1)}
				className={styles.dislike}
				fontSize='large'
				variant='contained'
			/>
		</div>
	)
}

export default Votes
