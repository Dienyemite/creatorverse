import { Link } from 'react-router-dom'

const FALLBACK_IMAGE = 'https://placehold.co/400x220?text=No+Image'

function Card({ creator }) {
  const { id, name, url, description, imageurl } = creator

  return (
    <article className="creator-card">
      <Link to={`/creator/${id}`} className="creator-card__img-link">
        <img
          src={imageurl || FALLBACK_IMAGE}
          alt={name}
          className="creator-card__img"
          onError={(e) => { e.target.src = FALLBACK_IMAGE }}
        />
      </Link>
      <div className="creator-card__body">
        <h3>
          <Link to={`/creator/${id}`} className="creator-card__name-link">{name}</Link>
        </h3>
        <p>{description}</p>
        <a href={url} target="_blank" rel="noreferrer" className="creator-card__url">{url}</a>
      </div>
      <footer className="creator-card__footer">
        <Link to={`/creator/${id}`} role="button" className="outline">View</Link>
        <Link to={`/creator/${id}/edit`} role="button" className="secondary outline">Edit</Link>
      </footer>
    </article>
  )
}

export default Card
