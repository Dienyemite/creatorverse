import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../client'
import Card from '../components/Card'

function ShowCreators() {
  const [creators, setCreators] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCreators() {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .order('id', { ascending: true })

      if (error) {
        console.error('Error fetching creators:', error.message)
      } else {
        setCreators(data)
      }
      setLoading(false)
    }

    fetchCreators()
  }, [])

  return (
    <main className="container">
      <nav>
        <ul>
          <li><strong>✨ Creatorverse</strong></li>
        </ul>
        <ul>
          <li><Link to="/creator/add" role="button">+ Add Creator</Link></li>
        </ul>
      </nav>

      {loading && <p aria-busy="true">Loading creators…</p>}

      {!loading && creators.length === 0 && (
        <p>No creators yet. <Link to="/creator/add">Add one!</Link></p>
      )}

      {!loading && creators.length > 0 && (
        <div className="creators-grid">
          {creators.map((creator) => (
            <Card key={creator.id} creator={creator} />
          ))}
        </div>
      )}
    </main>
  )
}

export default ShowCreators
