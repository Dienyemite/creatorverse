import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../client'

function AddCreator() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: '',
  })
  const [saving, setSaving] = useState(false)

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)

    const { error } = await supabase
      .from('creators')
      .insert([{
        name: form.name,
        url: form.url,
        description: form.description,
        imageURL: form.imageURL || null,
      }])

    if (error) {
      console.error('Error adding creator:', error.message)
      setSaving(false)
    } else {
      navigate('/')
    }
  }

  return (
    <main className="container">
      <nav>
        <ul>
          <li><Link to="/">← Back to all creators</Link></li>
        </ul>
      </nav>

      <h2>Add a Creator</h2>

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
            name="imageURL"
            value={form.imageURL}
            onChange={handleChange}
            placeholder="https://..."
          />
        </label>

        <button type="submit" aria-busy={saving} disabled={saving}>
          {saving ? 'Adding…' : 'Add Creator'}
        </button>
      </form>
    </main>
  )
}

export default AddCreator
