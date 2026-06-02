import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { supabase } from '../client'

function EditCreator() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    url: '',
    description: '',
    imageurl: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

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
        setForm({
          name: data.name || '',
          url: data.url || '',
          description: data.description || '',
          imageurl: data.imageurl || '',
        })
      }
      setLoading(false)
    }

    fetchCreator()
  }, [id])

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)

    const { error } = await supabase
      .from('creators')
      .update({
        name: form.name,
        url: form.url,
        description: form.description,
        imageurl: form.imageurl,
      })
      .eq('id', id)

    if (error) {
      console.error('Error updating creator:', error.message)
      setSaving(false)
    } else {
      navigate(`/creator/${id}`)
    }
  }

  async function handleDelete() {
    if (!window.confirm('Are you sure you want to delete this creator?')) return

    const { error } = await supabase
      .from('creators')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting creator:', error.message)
    } else {
      navigate('/')
    }
  }

  return (
    <main className="container">
      <nav>
        <ul>
          <li><Link to={`/creator/${id}`}>← Back</Link></li>
        </ul>
      </nav>

      <h2>Edit Creator</h2>

      {loading && <p aria-busy="true">Loading…</p>}

      {!loading && (
        <form onSubmit={handleSubmit}>
          <label>
            Name *
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Creator name"
            />
          </label>

          <label>
            Channel / Page URL *
            <input
              type="url"
              name="url"
              value={form.url}
              onChange={handleChange}
              required
              placeholder="https://..."
            />
          </label>

          <label>
            Description *
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Short description of their content"
            />
          </label>

          <label>
            Image URL (optional)
            <input
              type="url"
              name="imageurl"
              value={form.imageurl}
              onChange={handleChange}
              placeholder="https://..."
            />
          </label>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button type="submit" aria-busy={saving} disabled={saving}>
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
            <button
              type="button"
              className="secondary"
              onClick={handleDelete}
            >
              Delete Creator
            </button>
          </div>
        </form>
      )}
    </main>
  )
}

export default EditCreator
