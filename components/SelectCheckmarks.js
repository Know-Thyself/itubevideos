import * as React from 'react'
// import OutlinedInput from '@mui/material/OutlinedInput'
// import InputLabel from '@mui/material/InputLabel'
// import MenuItem from '@mui/material/MenuItem'
// import FormControl from '@mui/material/FormControl'
// import ListItemText from '@mui/material/ListItemText'
// import Select from '@mui/material/Select'
// import Checkbox from '@mui/material/Checkbox'
import styles from '../styles/Home.module.css'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
}

const categories = [
	'Computer Programming',
	'Personal Development',
	'Motivational/Inspirational',
	'TED TALK',
	'Entertainment',
	'Educational',
	'Documentary',
	'Other'
]

export default function SelectCheckmarks() {
	const [videoCategory, setVideoCategory] = React.useState([])

	const handleChange = (event) => {
		const {
			target: { value },
		} = event
		setVideoCategory(
			typeof value === 'string' ? value.split(',') : value
		)
	}
	console.log(videoCategory)

	return (
		<div className={styles['checkbox-wrapper']}>
			<FormControl sx={{ width: '100%' }}>
				<InputLabel id='multiple-checkbox-label'>Please choose a category/ies</InputLabel>
				<Select
					labelId='multiple-checkbox-label'
					id='multiple-checkbox'
					multiple
					value={videoCategory}
					onChange={handleChange}
					input={<OutlinedInput label='Please choose a category/ies' />}
					renderValue={(selected) => selected.join(', ')}
					MenuProps={MenuProps}
				>
					{categories.map((category) => (
						<MenuItem key={category} value={category}>
							<Checkbox checked={videoCategory.indexOf(category) > -1} />
							<ListItemText primary={category} />
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	)
}
