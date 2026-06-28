import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import AdminLayout from '../../components/admin/AdminLayout';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../../services/categoryService';
import toast from 'react-hot-toast';
import { Plus, Pencil, Trash2, Check, X, Tag, Loader2 } from 'lucide-react';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [adding, setAdding] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editDesc, setEditDesc] = useState('');

  const fetch = () => {
    setLoading(true);
    getCategories()
      .then((res) => setCategories(res.data || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetch(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setAdding(true);
    try {
      const res = await createCategory({ name: newName, description: newDesc });
      setCategories((prev) => [...prev, res.data]);
      setNewName(''); setNewDesc('');
      toast.success('Category created');
    } catch (err) { toast.error(err.message); }
    finally { setAdding(false); }
  };

  const handleUpdate = async (id) => {
    try {
      const res = await updateCategory(id, { name: editName, description: editDesc });
      setCategories((prev) => prev.map((c) => c._id === id ? res.data : c));
      setEditId(null);
      toast.success('Category updated');
    } catch (err) { toast.error(err.message); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this category?')) return;
    try {
      await deleteCategory(id);
      setCategories((prev) => prev.filter((c) => c._id !== id));
      toast.success('Category deleted');
    } catch (err) { toast.error(err.message); }
  };

  return (
    <>
      <Helmet><title>Categories — Admin | Lohitha Murmura</title></Helmet>
      <AdminLayout>
        <div className="space-y-6 max-w-2xl">
          {/* Add form */}
          <div className="card p-6">
            <h3 className="font-heading font-semibold text-text mb-4 flex items-center gap-2">
              <Tag className="w-4 h-4 text-primary" /> Add New Category
            </h3>
            <form onSubmit={handleAdd} className="space-y-3">
              <div>
                <label className="label">Category Name</label>
                <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="e.g. Plain Murmura" className="input" />
              </div>
              <div>
                <label className="label">Description (optional)</label>
                <input type="text" value={newDesc} onChange={(e) => setNewDesc(e.target.value)} placeholder="Short description" className="input" />
              </div>
              <button type="submit" disabled={adding || !newName.trim()} className="btn-primary disabled:opacity-60">
                {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                {adding ? 'Adding...' : 'Add Category'}
              </button>
            </form>
          </div>

          {/* List */}
          <div className="card overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex items-center gap-2">
              <h3 className="font-heading font-semibold text-text">All Categories</h3>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">{categories.length}</span>
            </div>
            {loading ? (
              <div className="p-6 space-y-3">
                {[1,2,3].map(i => <div key={i} className="h-12 bg-border rounded-lg animate-pulse" />)}
              </div>
            ) : categories.length === 0 ? (
              <div className="p-12 text-center text-text-light">No categories yet. Add one above.</div>
            ) : (
              <div className="divide-y divide-border">
                {categories.map((cat) => (
                  <div key={cat._id} className="px-6 py-4 flex items-center gap-4">
                    {editId === cat._id ? (
                      <>
                        <div className="flex-1 flex gap-3">
                          <input
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="input flex-1 py-2 text-sm"
                          />
                          <input
                            value={editDesc}
                            onChange={(e) => setEditDesc(e.target.value)}
                            className="input flex-1 py-2 text-sm"
                            placeholder="Description"
                          />
                        </div>
                        <button onClick={() => handleUpdate(cat._id)} className="p-2 text-accent hover:bg-accent/10 rounded-lg">
                          <Check className="w-4 h-4" />
                        </button>
                        <button onClick={() => setEditId(null)} className="p-2 text-text-lighter hover:bg-border rounded-lg">
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="flex-1">
                          <p className="font-medium text-text text-sm">{cat.name}</p>
                          <p className="text-text-lighter text-xs">{cat.description || 'No description'} · /{cat.slug}</p>
                        </div>
                        <button onClick={() => { setEditId(cat._id); setEditName(cat.name); setEditDesc(cat.description || ''); }} className="p-2 text-text-lighter hover:text-primary hover:bg-primary/10 rounded-lg">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(cat._id)} className="p-2 text-text-lighter hover:text-red-500 hover:bg-red-50 rounded-lg">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default AdminCategories;
