import React from 'react'
import style from "./Articles.module.scss";
import { IconButton, EditIcon, TrashIcon, Badge, Pill } from "evergreen-ui";
import { Link } from "react-router-dom";
import { baseApi } from "../../../API/api";

const ArticleViewCard = ({ index, article, user, isAuth, isUserAdmin, handleLike, handleDelete, categories }) => {
	const articleCat = categories.find(cat => cat.id === article.categoryId)
	return (
		<li key={index} className='list-group-item article'>
			<Link className={style.link} to={`/article/${article.id}`}>
				<div className={style.userName}>{article.userName}</div>
				<h3 className={style.title}>{article.title}</h3>
				<div>{article.text.substr(0, 150)}...</div>
				{article.img && <img src={baseApi + article.img} alt={article.title} />}
			</Link>
			{(user.id === article.userId || isUserAdmin) &&
				<div className={style.edit_links}>
					<Link to={`/update/${article.id}`}>
						<IconButton icon={EditIcon} />
					</Link>
					<IconButton icon={TrashIcon} intent='danger' onClick={() => handleDelete(article.id)} />
				</div>
			}
			<Link to={`/articles/${articleCat.title}`} className={style.category}>{articleCat.title}</Link>
			<section className={style.like_container}>
				{article.liked.length > 0 && <Pill className={style.count} color='red'>{article.liked.length}</Pill>}
				{isAuth && <Badge color='teal' className={[style.like, article.liked.includes(user.nickName) && style.clicked].join(' ')} onClick={() => handleLike(article.id, !article.liked.includes(user.nickName))}>Like</Badge>}
				<ul className={style.likedList}>{article.liked.map(like => <li key={article.id}>{like}</li>)}</ul>
			</section>
		</li>
	)
}

export default ArticleViewCard;