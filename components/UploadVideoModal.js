import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import Modal from 'react-bootstrap/Modal'
import AddToQueueRoundedIcon from '@material-ui/icons/AddToQueueRounded'
//import TextField from '@material-ui/core/TextField'
import TextField from '@mui/material/TextField'
import Alert from 'react-bootstrap/Alert'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from '../styles/Home.module.css'
import SelectCheckmarks from './SelectCheckmarks'

const UploadVideoModal = ({ addNewVideo }) => {
	const [showModal, setShowModal] = useState(false)
	const [title, setTitle] = useState('')
	const [url, setUrl] = useState('')
	const [titleErrorAlert, setTitleErrorAlert] = useState(false)
	const [emptyUrlAlert, seEmptyUrlAlert] = useState(false)
	const [invalidUrlAlert, setInvalidUrlAlert] = useState(false)

	const cancelButtonHandler = () => {
		setShowModal(false)
		setTitleErrorAlert(false)
		seEmptyUrlAlert(false)
		setTitle('')
		setUrl('')
	}
	const handleShow = () => setShowModal(true)

	const submitNewVideo = (e) => {
		e.preventDefault()
		const regExp =
			/^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
		const match = url.match(regExp)
		if (title === '' && showModal) {
			setTitleErrorAlert(true)
			const hideTitleErrorAlert = () => {
				setTitleErrorAlert(false)
			}
			setTimeout(hideTitleErrorAlert, 5000)
		} else if (url === '' && showModal) {
			seEmptyUrlAlert(true)
			setTimeout(() => {
				seEmptyUrlAlert(false)
			}, 5000)
		} else if (!match) {
			setInvalidUrlAlert(true)
			setTimeout(() => {
				setInvalidUrlAlert(false)
			}, 5000)
		} else if (title !== '' && url !== '' && match) {
			setTitle('')
			setUrl('')
			addNewVideo(title, url)
			setShowModal(false)
		}
	}

	return (
		<>
			<Button
				className={styles['add-button']}
				variant='contained'
				color='primary'
				onClick={handleShow}
			>
				Add Video &nbsp;
				<AddToQueueRoundedIcon />
			</Button>
			<Modal
				className={styles.modal}
				show={showModal}
				onHide={cancelButtonHandler}
				backdrop='static'
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Video Uploader Modal</Modal.Title>
				</Modal.Header>
				<Modal.Body className={styles['modal-fullscreen-lg-down modal-body']}>
					Please enter a title and a valid url of a YouTube video
					<Alert
						show={titleErrorAlert}
						dismissible
						variant='danger'
						onClose={() => setTitleErrorAlert(false)}
					>
						Failure! — Title field should not be empty!
					</Alert>
					<TextField
						className={styles['modal-content modal-text']}
						autoFocus
						margin='dense'
						required
						id='title'
						variant='outlined'
						label='Title'
						type='text'
						style={{ color: 'red' }}
						fullWidth
						onChange={(e) => {
							setTitleErrorAlert(false)
							setTitle(e.target.value)
						}}
						value={title}
					/>
					<Alert
						show={emptyUrlAlert}
						variant='danger'
						dismissible
						onClose={() => seEmptyUrlAlert(false)}
					>
						Failure! — URL field can not be empty!
					</Alert>
					<Alert
						show={invalidUrlAlert}
						variant='danger'
						dismissible
						onClose={() => setInvalidUrlAlert(false)}
					>
						Failure! — Invalid URL!
					</Alert>
					<TextField
						className={styles['modal-content modal-text']}
						required
						variant='outlined'
						margin='dense'
						id='url'
						label='URL'
						type='url'
						fullWidth
						onChange={(e) => {
							seEmptyUrlAlert(false)
							setUrl(e.target.value)
						}}
						value={url}
					/>
					<SelectCheckmarks />
				</Modal.Body>
				<Modal.Footer>
					<div className={styles['upload-and-cancel-buttons']}>
						<Button
							type='cancel'
							className={styles['cancel-button']}
							variant='contained'
							color='default'
							onClick={cancelButtonHandler}
						>
							Cancel
						</Button>
						<Button
							onClick={submitNewVideo}
							type='submit'
							className={styles['submit-btn']}
							variant='contained'
							color='primary'
						>
							Upload
						</Button>
					</div>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default UploadVideoModal
