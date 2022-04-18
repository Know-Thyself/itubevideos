import React, { useState } from 'react'
import styles from '../styles/Home.module.css'

const SearchBar = ({ stateUpdater, videos }) => {
	const [searchInput, setSearchInput] = useState('')

	const handleSearchInput = (e) => {
		setSearchInput(e.target.value.toLowerCase())
		const searchResult = videos.filter((video) =>
			video.title.toLowerCase().includes(searchInput)
		)
		stateUpdater(searchResult)
		if (e.target.value === '') stateUpdater(videos)
	}

	return (
		<div key='input-form' className={styles['search-input-wrapper']}>
			<input
				key='search-input'
				type='text'
				className={styles['search-bar']}
				placeholder='Search for a video ...'
				value={searchInput}
				onChange={handleSearchInput}
			/>
			<i key='fasIcon' className={styles['fas fa-search']}></i>
		</div>
	)
}

export default SearchBar
