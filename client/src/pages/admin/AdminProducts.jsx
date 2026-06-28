import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import AdminLayout from '../../components/admin/AdminLayout';
import { getAllProductsAdmin, deleteProduct } from '../../services/productService';
import { getCategories } from '../../services/categoryService';
import ProductForm from '../../components/admin/ProductForm';
import toast from 'react-hot-toast';
import { Plus, Pencil, Trash2, Package, Star, Eye, EyeOff, Search } from 'lucide-react';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [search, setSearch] = useState('');

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [pRes, cRes] = await Promise.all([getAllProductsAdmin(), getCategories()]);
      setProducts(pRes.data || []);
      setCategories(cRes.data || []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchAll(); }, []);

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete "${name}"? This will also remove its images from Cloudinary.`)) return;
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success('Product deleted');
    } catch { toast.error('Failed to delete'); }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditProduct(null);
    fetchAll();
    toast.success(editProduct ? 'Product updated!' : 'Product created!');
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Helmet><title>Products — Admin | Lohitha Murmura</title></Helmet>
      <AdminLayout>
        {showForm ? (
          <ProductForm
            product={editProduct}
            categories={categories}
            onSuccess={handleFormSuccess}
            onCancel={() => { setShowForm(false); setEditProduct(null); }}
          />
        ) : (
          <div className="space-y-5">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                <h2 className="font-heading font-semibold text-text text-xl">Products</h2>
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">{products.length}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-lighter" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search..."
                    className="input pl-9 py-2 text-sm w-52"
                  />
                </div>
                <button onClick={() => { setEditProduct(null); setShowForm(true); }} className="btn-primary py-2 text-sm">
                  <Plus className="w-4 h-4" /> Add Product
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="card overflow-hidden">
              {loading ? (
                <div className="p-6 space-y-3">
                  {[1,2,3,4].map(i => <div key={i} className="h-16 bg-border rounded-lg animate-pulse" />)}
                </div>
              ) : filtered.length === 0 ? (
                <div className="p-12 text-center text-text-light">
                  <Package className="w-12 h-12 mx-auto mb-3 text-border" />
                  <p>No products found.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-background border-b border-border">
                      <tr>
                        {['Product', 'Category', 'Quantities', 'Featured', 'Active', 'Actions'].map(h => (
                          <th key={h} className="text-left px-5 py-3.5 font-heading font-semibold text-text-light text-xs uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filtered.map((p) => (
                        <tr key={p._id} className="hover:bg-background/60 transition-colors">
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg overflow-hidden bg-background shrink-0">
                                <img
                                  src={p.images?.[0]?.url || 'https://placehold.co/40x40/FFF8E7/B9770E?text=M'}
                                  alt={p.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <p className="font-medium text-text">{p.name}</p>
                                <p className="text-text-lighter text-xs">/{p.slug}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-4 text-text-light">{p.category?.name || '—'}</td>
                          <td className="px-5 py-4 text-text-light">{p.availableQuantities?.join(', ') || '—'}</td>
                          <td className="px-5 py-4">
                            <span className={`badge ${p.featured ? 'badge-yellow' : 'bg-border text-text-lighter border-border'}`}>
                              {p.featured ? '★ Yes' : 'No'}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <span className={`badge ${p.isActive ? 'badge-green' : 'bg-red-50 text-red-400 border-red-100'}`}>
                              {p.isActive ? 'Active' : 'Hidden'}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => { setEditProduct(p); setShowForm(true); }}
                                className="p-2 rounded-lg text-text-lighter hover:text-primary hover:bg-primary/10 transition-colors"
                              >
                                <Pencil className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(p._id, p.name)}
                                className="p-2 rounded-lg text-text-lighter hover:text-red-500 hover:bg-red-50 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </AdminLayout>
    </>
  );
};

export default AdminProducts;
