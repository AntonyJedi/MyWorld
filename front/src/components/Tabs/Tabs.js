import React from 'react'

function Tabs({size, array}) {
  return (
    <Group size={size}>
		{array.map((item, index) => (
			<Button key={index} isActive={true}>{item}</Button>
		))}
		</Group>
  )
}

export default Tabs;
