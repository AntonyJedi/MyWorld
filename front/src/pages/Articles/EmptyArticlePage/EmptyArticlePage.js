import React from 'react';
import { motion } from "framer-motion";
import './EmptyArticlePage.scss';

function EmptyArticlePage() {
	const styles = {
		shape: {
			position: 'absolute',
		},
		text: {
			position: 'relative',
			color: '#000',
			fontSize: '2.5rem',
			fontWeight: 'bold',
		},
	};
	const shapes = [
		{ id: 1, size: 100, color: '#0e1538', border: '#228B22', x: -200, y: 150 },
		{ id: 2, size: 80, color: '#0e1538', border: '#00ccff', x: 200, y: -100 },
		{ id: 3, size: 120, color: '#0e1538', border: '#ff22bb', x: -150, y: -200 },
		{ id: 4, size: 70, color: '#0e1538', border: '#ff0000', x: 150, y: 200 },
	];
	return (
		<motion.div
			initial={{ translateX: "-25%", opacity: 0 }}
			animate={{ translateX: 0, opacity: 1 }}
			exit={{ translateX: "50%", opacity: 0 }}
			transition={{ duration: 0.5 }}
		>
			<div className='animate_container'>
				{shapes.map(shape => (
					<motion.div
						key={shape.id}
						// className='box'
						initial={{ x: shape.x, y: shape.y, scale: 1 }}
						animate={{ x: [shape.x, shape.x * -1, shape.x * -1, shape.x], y: [shape.y, shape.y * -1, shape.y * -1, shape.y], rotate: 360 }}
						transition={{
							duration: 8,
							repeat: Infinity
						}}
						style={{
							...styles.shape,
							width: shape.size,
							height: shape.size,
							border: "2px solid" + shape.border,
							backgroundColor: shape.color,
							borderRadius: '20%', // Circle or rounded rectangle
						}}
					/>
				))}
				<motion.h1
					initial={{ scale: 1 }}
					animate={{ scale: [1, 1.1, 1] }}
					transition={{
						duration: 2,
						repeat: Infinity,
						repeatType: "mirror",
						ease: "easeInOut",
					}}
					style={styles.text}
				// initial={{x: 0, y: 0}}
				// animate={{x: [0, 100, 100, 0], y: [0, 100, 100, 0]}}
				// transition={{repeat: Infinity, delay: 2, duration: 2}}
				>
					Nothing&apos;s here
				</motion.h1>
			</div>
		</motion.div>
	)
}

export default EmptyArticlePage;