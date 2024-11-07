import React from 'react'
import { Button, Group } from "evergreen-ui";

const Tabs = ({size, array}) => {
  return (
    <Group size={size}>
		{array.map((item, index) => (
			<Button key={index} isActive={true}>{item}</Button>
		))}
		</Group>
  )
}

export default Tabs;
