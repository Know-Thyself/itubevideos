import React, { useState } from 'react'
// import Button from '@material-ui/core/Button'
import Button from '@mui/material/Button'
// import Dialog from '@material-ui/core/Dialog'
import Dialog from '@mui/material/Dialog'
// import DialogActions from '@material-ui/core/DialogActions'
import DialogActions from '@mui/material/DialogActions'
// import DialogContent from '@material-ui/core/DialogContent'
import DialogContent from '@mui/material/DialogContent'
// import DialogContentText from '@material-ui/core/DialogContentText'
import DialogContentText from '@mui/material/DialogContentText'
// import DialogTitle from '@material-ui/core/DialogTitle'
import DialogTitle from '@mui/material/DialogTitle'
// import DeleteIcon from '@material-ui/icons/Delete'
import DeleteIcon from '@mui/icons-material/Delete'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faCopyright } from '@fortawesome/free-solid-svg-icons'
import styles from '../styles/Home.module.css'

const DeleteButton = ({ id, videoRemover, title }) => {
	const [open, setOpen] = useState(false)

	const openDialogBox = () => {
		setOpen(true)
	}

	const cancelDelete = () => {
		setOpen(false)
	}

	return (
		<div className={styles['delete-button-container']}>
			<div>
				<button
					// variant='contained'
					// color='secondary'
					className={styles['delete-button']}
					// startIcon={<DeleteIcon />}
					onClick={openDialogBox}
				>
					Delete <FontAwesomeIcon icon={faTrash} />
				</button>
			</div>
			<Dialog
				open={open}
				onClose={cancelDelete}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle
					className={styles['alert-primary delete-dialog']}
					id='alert-dialog-title'
				>
					{'Are you sure you want to delete this video?'}
				</DialogTitle>
				<DialogContent className={styles['alert-primary dialog-content']}>
					<DialogContentText
						aria-labelledby='alert-dialog-title'
						id='alert-dialog-description'
					>
						The video: &apos;{title}&apos; will be permanently removed from our
						database. <br />
						Of course, you can add it later if you change your mind. However,
						the video will lose all of it&apos;s votes it has had so far as
						votes for newly added videos starts from 0.
					</DialogContentText>
				</DialogContent>
				<DialogActions className={styles['alert-primary dialog-content']}>
					<Button onClick={cancelDelete} variant='outlined' color='primary'>
						Cancel
					</Button>
					<Button
						id={id}
						onClick={() => {
							videoRemover(id)
							setOpen(false)
						}}
						variant='outlined'
						color='secondary'
						// startIcon={<DeleteIcon />}
					>
						<svg data-testid='DeleteIcon'></svg>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

export default DeleteButton
