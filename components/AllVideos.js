import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from '@material-ui/core/Button'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import UploadVideoModal from './UploadVideoModal'
// import Alert from '@material-ui/lab/Alert'
import Alert from 'react-bootstrap/Alert'
import Header from './Header'
import SearchBar from './SearchBar'
import Title from './Title'
import EmbeddedVideos from './EmbeddedVideos'
import Votes from './Votes'
import DeleteButton from './DeleteButton'
import Footer from './Footer'
import styles from '../styles/Home.module.css'

const AllVideos = ({ videosData, addVideo, deleteVideo, updateVideo }) => {
	const [videos, setVideos] = useState(videosData)
	const [backupVideos, setBackupVideos] = useState(videosData)
	const [successAlert, setSuccessAlert] = useState(false)
	const [deleteAlert, setDeleteAlert] = useState(false)
	const [open, setOpen] = useState(false)

	function youtubeIdParser(url) {
		let regExp =
			/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
		let match = url.match(regExp)
		return match && match[7].length === 11 ? match[7] : false
	}

	const ascendingOrder = () => {
		let tempArray = [...backupVideos]
		let sortedArray = tempArray.sort((a, b) => a.rating - b.rating)
		setVideos(sortedArray)
	}

	const descendingOrder = () => {
		let tempArray = [...backupVideos]
		let sortedArray = tempArray.sort((a, b) => b.rating - a.rating)
		setVideos(sortedArray)
	}

	const addNewVideo = (title, url) => {
		let newArray = videos
		let newVideo = {
			id: Date.now().toString(),
			title: title,
			url: url,
			rating: 0,
			posted: new Date().toString(),
		}
		addVideo(newVideo)
		newArray = [newVideo, ...newArray]
		setSuccessAlert(true)
		const hideSuccessAlert = () => {
			setSuccessAlert(false)
		}
		setTimeout(hideSuccessAlert, 5000)
		return setVideos(newArray)
	}

	const videoRemover = (id) => {
		console.log(id)
		deleteVideo(id)
		const remainingVideos = videos.filter((video) => video.id !== id)
		setVideos(remainingVideos)
		setDeleteAlert(true)
		const hideDeleteAlert = () => {
			setDeleteAlert(false)
		}
		setTimeout(hideDeleteAlert, 5000)
	}

	const stateUpdater = (updatedState) => {
		let newState = updatedState
		return setVideos(newState)
	}

	return (
		<div key='mainWrapper'>
			<div className={styles['App-header']}>
				<Header />
				<SearchBar stateUpdater={stateUpdater} videos={backupVideos} />
			</div>
			<div
				className={`${successAlert} ? ${styles['success-alert']} : ${styles['d-none']}`}
			>
				<Alert
					show={successAlert}
					variant='success'
					// severity='success'
					// className={successAlert ? styles['success-alert'] : styles['d-none']}
					onClose={() => setSuccessAlert(false)}
				>
					Success! — Your video is successfully uploaded!
				</Alert>
			</div>
			<div
				className={`${deleteAlert} ? ${styles['success-alert']} : ${styles['d-none']}`}
			>
				<Alert
					severity='success'
					className={`${deleteAlert} ? alert-success : ${styles['d-none']}`}
					onClose={() => setDeleteAlert(false)}
				>
					Success! — Your video is successfully deleted!
				</Alert>
			</div>
			<div className={styles['main-buttons-outer-container']}>
				<div className={styles['main-buttons']}>
					<div className={styles['asc-desc-order']}>
						<p className='order-by'>Order By Votes:&nbsp;</p>
						<Button
							className=''
							onClick={ascendingOrder}
							variant='contained'
							color='primary'
						>
							Asc &nbsp;
							<ArrowUpwardIcon />
						</Button>
						<Button
							className=''
							onClick={descendingOrder}
							variant='contained'
							color='primary'
						>
							Desc &nbsp;
							<ArrowDownwardIcon />
						</Button>
					</div>
					<UploadVideoModal
						className={styles['upload-button']}
						addNewVideo={addNewVideo}
					/>
				</div>
			</div>
			<div key='displayWrapper' className={styles['main-container']}>
				{videos.map((video, index) => {
					const video_id = youtubeIdParser(video.url)
					return (
						<div key={index} className={styles['video-and-details-wrapper']}>
							<Title title={video.title} />
							<EmbeddedVideos id={video_id} />
							<div className={styles['vote-and-delete']}>
								<Votes
									vote={video.rating}
									video={video}
									videos={videos}
									rating={video.rating}
									stateUpdater={stateUpdater}
									updateVideo={updateVideo}
								/>
								<DeleteButton
									id={video.id}
									videoRemover={videoRemover}
									title={video.title}
								/>
							</div>
						</div>
					)
				})}
			</div>
			<Footer />
		</div>
	)
}

export default AllVideos
