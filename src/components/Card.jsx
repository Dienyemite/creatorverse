import { Link } from 'react-router-dom'

const FALLBACK_IMAGE = 'https://placehold.co/400x220?text=No+Image'

function Card({ creator }) {
  const { id, name, url, description, imageURL } = creator

  return (
    <article className="creator-card">
      <img
        src={imageURL || FALLBACK_IMAGE}
        alt={name}
        className="creator-card__img"
        onError={(e) => { e.target.src = FALLBACK_IMAGE }}
      />
      <div className="creator-card__body">
        <h3>{name}</h3>
        <p>{description}</p>
        <a href={url} target="_blank" rel="noreferrer">{url}</a>
      </div>
      <footer className="creator-card__footer">
        <Link to={`/creator/${id}`} role="button" className="outline">View</Link>
        <Link to={`/creator/${id}/edit`} role="button" className="secondary outline">Edit</Link>
      </footer>
    </article>
  )
}

export default Card
