import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../client'

const FALLBACK_IMAGE = 'https://placehold.co/600x340?text=No+Image'

function ViewCreator() {
  const { id } = useParams()
  const [creator, setCreator] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCreator() {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error fetching creator:', error.message)
      } else {
        setCreator(data)
      }
      setLoading(false)
    }

    fetchCreator()
  }, [id])

  return (
    <main className="container">
      <nav>
        <ul>
          <li><Link to="/">← Back to all creators</Link></li>
        </ul>
      </nav>

      {loading && <p aria-busy="true">Loading…</p>}

      {!loading && !creator && <p>Creator not found.</p>}

      {!loading && creator && (
        <article>
          <img
            src={creator.imageURL || FALLBACK_IMAGE}
            alt={creator.name}
            style={{ width: '100%', maxHeight: '340px', objectFit: 'cover', borderRadius: '8px' }}
            onError={(e) => { e.target.src = FALLBACK_IMAGE }}
          />
          <hgroup>
            <h2>{creator.name}</h2>
            <p>
              <a href={creator.url} target="_blank" rel="noreferrer">{creator.url}</a>
            </p>
          </hgroup>
          <p>{creator.description}</p>
          <Link to={`/creator/${creator.id}/edit`} role="button" className="secondary">Edit Creator</Link>
        </article>
      )}
    </main>
  )
}

export default ViewCreator
