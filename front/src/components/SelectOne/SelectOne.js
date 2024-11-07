import React from 'react'
import { Select, Checkbox } from "evergreen-ui";

const SelectOne = ({ array, selectedItem, setSelectedItem, replace = array[0], isDefault, setIsDefault, isAuth }) => {
	
	const setDefault = value => {
		value ? setSelectedItem(array) : setSelectedItem([array[0]]);
		setIsDefault(value)
	}
	return (
		<div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
			<Select style={{ flex: 'unset', display: isDefault ? 'none' : 'block' }} value={selectedItem} onChange={e => setSelectedItem([e.target.value])}>
				{array.map((item, index) => <option key={index} value={item} selected={index === 0}>{index === 0 && isAuth ? replace : item}</option>)}
			</Select>
			<Checkbox
				label='All songs'
				checked={isDefault}
				onChange={e => setDefault(e.target.checked)}
			/>
		</div>
	)
}

export default SelectOne;