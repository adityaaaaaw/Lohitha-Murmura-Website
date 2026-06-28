import { useState, useEffect } from 'react';
import { createProduct, updateProduct, deleteProductImage } from '../../services/productService';
import toast from 'react-hot-toast';
import { ArrowLeft, Plus, X, Loader2, Upload, Star } from 'lucide-react';

const DEFAULT_QUANTITIES = [50, 100, 150, 200];
const DEFAULT_BADGES = ['Factory Fresh', 'Bulk Only'];

const ProductForm = ({ product, categories, onSuccess, onCancel }) => {
  const isEdit = !!product;
  const [form, setForm] = useState({
    name: product?.name || '',
    description: product?.description || '',
    category: product?.category?._id || '',
    packaging: product?.packaging || '25kg bags',
    featured: product?.featured || false,
    isActive: product?.isActive ?? true,
    availableQuantities: product?.availableQuantities || DEFAULT_QUANTITIES,
    badges: product?.badges || DEFAULT_BADGES,
  });
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState(product?.images || []);
  const [loading, setLoading] = useState(false);
  const [badgeInput, setBadgeInput] = useState('');
  const [qtyInput, setQtyInput] = useState('');

  const set = (key, val) => setForm((p) => ({ ...p, [key]: val }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.description || !form.category) {
      return toast.error('Please fill all required fields');
    }
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (Array.isArray(v)) fd.append(k, JSON.stringify(v));
        else fd.append(k, v);
      });
      images.forEach((img) => fd.append('images', img));

      if (isEdit) {
        await updateProduct(product._id, fd);
      } else {
        await createProduct(fd);
      }
      onSuccess();
    } catch (err) {
      toast.error(err.message || 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveExisting = async (public_id) => {
    if (!confirm('Delete this image?')) return;
    try {
      await deleteProductImage(product._id, public_id);
      setExistingImages((prev) => prev.filter((img) => img.public_id !== public_id));
      toast.success('Image deleted');
    } catch { toast.error('Failed to delete image'); }
  };

  const addBadge = () => {
    if (badgeInput.trim()) {
      set('badges', [...form.badges, badgeInput.trim()]);
      setBadgeInput('');
    }
  };

  const addQty = () => {
    const n = parseInt(qtyInput);
    if (n > 0 && !form.availableQuantities.includes(n)) {
      set('availableQuantities', [...form.availableQuantities, n].sort((a,b)=>a-b));
      setQtyInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-3 mb-2">
        <button type="button" onClick={onCancel} className="p-2 rounded-lg border border-border hover:border-primary text-text-light hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h2 className="font-heading font-semibold text-text text-xl">
          {isEdit ? 'Edit Product' : 'Add New Product'}
        </h2>
      </div>

      {/* Basic Info */}
      <div className="card p-6 space-y-4">
        <h3 className="font-heading font-semibold text-text border-b border-border pb-3">Basic Information</h3>
        <div>
          <label className="label">Product Name *</label>
          <input type="text" value={form.name} onChange={(e) => set('name', e.target.value)} className="input" placeholder="e.g. Plain Murmura" required />
        </div>
        <div>
          <label className="label">Description *</label>
          <textarea value={form.description} onChange={(e) => set('description', e.target.value)} rows={4} className="input resize-none" placeholder="Describe the product..." required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Category *</label>
            <select value={form.category} onChange={(e) => set('category', e.target.value)} className="input" required>
              <option value="">Select category</option>
              {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Packaging</label>
            <input type="text" value={form.packaging} onChange={(e) => set('packaging', e.target.value)} className="input" placeholder="25kg bags" />
          </div>
        </div>
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.featured} onChange={(e) => set('featured', e.target.checked)} className="w-4 h-4 accent-primary" />
            <span className="text-sm font-medium text-text flex items-center gap-1"><Star className="w-3.5 h-3.5 text-secondary" /> Featured on homepage</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.isActive} onChange={(e) => set('isActive', e.target.checked)} className="w-4 h-4 accent-primary" />
            <span className="text-sm font-medium text-text">Active (visible on site)</span>
          </label>
        </div>
      </div>

      {/* Quantities */}
      <div className="card p-6 space-y-4">
        <h3 className="font-heading font-semibold text-text border-b border-border pb-3">Available Bulk Quantities</h3>
        <div className="flex flex-wrap gap-2">
          {form.availableQuantities.map((q) => (
            <span key={q} className="flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-1 text-sm font-semibold">
              {q} Bags
              <button type="button" onClick={() => set('availableQuantities', form.availableQuantities.filter(x => x !== q))}>
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input type="number" value={qtyInput} onChange={(e) => setQtyInput(e.target.value)} placeholder="Add quantity" className="input max-w-xs py-2 text-sm" min="1" />
          <button type="button" onClick={addQty} className="btn-secondary py-2 text-sm">
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
      </div>

      {/* Badges */}
      <div className="card p-6 space-y-4">
        <h3 className="font-heading font-semibold text-text border-b border-border pb-3">Product Badges</h3>
        <div className="flex flex-wrap gap-2">
          {form.badges.map((b, i) => (
            <span key={i} className="flex items-center gap-1.5 badge-green">
              {b}
              <button type="button" onClick={() => set('badges', form.badges.filter((_, idx) => idx !== i))}>
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input value={badgeInput} onChange={(e) => setBadgeInput(e.target.value)} placeholder="Add badge (e.g. Best Seller)" className="input max-w-xs py-2 text-sm" />
          <button type="button" onClick={addBadge} className="btn-secondary py-2 text-sm">
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
      </div>

      {/* Images */}
      <div className="card p-6 space-y-4">
        <h3 className="font-heading font-semibold text-text border-b border-border pb-3">Product Images</h3>

        {/* Existing images */}
        {existingImages.length > 0 && (
          <div>
            <p className="text-xs text-text-light mb-2 font-semibold uppercase tracking-wider">Current Images</p>
            <div className="flex flex-wrap gap-3">
              {existingImages.map((img, i) => (
                <div key={i} className="relative group w-20 h-20 rounded-lg overflow-hidden border border-border">
                  <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveExisting(img.public_id)}
                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* New upload */}
        <div>
          <p className="text-xs text-text-light mb-2 font-semibold uppercase tracking-wider">Upload New Images</p>
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-xl p-8 cursor-pointer hover:border-primary hover:bg-primary/5 transition-all">
            <Upload className="w-8 h-8 text-text-lighter mb-2" />
            <span className="text-text-light text-sm">Click to upload images</span>
            <span className="text-text-lighter text-xs mt-1">JPG, PNG, WebP — Max 10 files</span>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => setImages(Array.from(e.target.files))}
            />
          </label>
          {images.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {images.map((img, i) => (
                <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{img.name}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Submit */}
      <div className="flex gap-3">
        <button type="submit" disabled={loading} className="btn-primary py-3.5 px-8 disabled:opacity-60">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
          {loading ? 'Saving...' : isEdit ? 'Update Product' : 'Create Product'}
        </button>
        <button type="button" onClick={onCancel} className="btn-secondary py-3.5 px-6">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
