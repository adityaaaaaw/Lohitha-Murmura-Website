import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import AdminLayout from '../../components/admin/AdminLayout';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { Upload, Trash2, Image, Loader2, Plus } from 'lucide-react';

const AdminFactoryPhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [caption, setCaption] = useState('');

  const fetch = () => {
    setLoading(true);
    api.get('/factory-photos')
      .then((res) => setPhotos(res.data || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetch(); }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('image', file);
      fd.append('caption', caption);
      const res = await api.post('/factory-photos', fd);
      setPhotos((prev) => [res.data, ...prev]);
      setCaption('');
      toast.success('Photo uploaded');
    } catch { toast.error('Upload failed'); }
    finally { setUploading(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this photo?')) return;
    try {
      await api.delete(`/factory-photos/${id}`);
      setPhotos((prev) => prev.filter((p) => p._id !== id));
      toast.success('Photo deleted');
    } catch { toast.error('Delete failed'); }
  };

  return (
    <>
      <Helmet><title>Factory Photos — Admin | Lohitha Murmura</title></Helmet>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Image className="w-5 h-5 text-primary" />
            <h2 className="font-heading font-semibold text-text text-xl">Factory Photos</h2>
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">{photos.length}</span>
          </div>

          {/* Upload */}
          <div className="card p-6 space-y-4">
            <h3 className="font-heading font-semibold text-text border-b border-border pb-3">Upload New Photo</h3>
            <div>
              <label className="label">Caption (optional)</label>
              <input value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="e.g. Production floor" className="input mb-3" />
            </div>
            <label className={`flex flex-col items-center justify-center border-2 border-dashed border-border rounded-xl p-8 cursor-pointer hover:border-primary hover:bg-primary/5 transition-all ${uploading ? 'opacity-60 cursor-not-allowed' : ''}`}>
              {uploading ? <Loader2 className="w-8 h-8 text-primary animate-spin mb-2" /> : <Upload className="w-8 h-8 text-text-lighter mb-2" />}
              <span className="text-text-light text-sm">{uploading ? 'Uploading...' : 'Click to upload photo'}</span>
              <span className="text-text-lighter text-xs mt-1">JPG, PNG, WebP</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
            </label>
          </div>

          {/* Gallery */}
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1,2,3,4,5,6].map(i => <div key={i} className="aspect-square bg-border rounded-xl animate-pulse" />)}
            </div>
          ) : photos.length === 0 ? (
            <div className="card p-12 text-center text-text-light">
              <Image className="w-12 h-12 mx-auto mb-3 text-border" />
              <p>No factory photos yet. Upload some above.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {photos.map((photo) => (
                <div key={photo._id} className="group relative aspect-square rounded-xl overflow-hidden bg-background border border-border">
                  <img src={photo.image?.url} alt={photo.image?.alt} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-end justify-between p-3">
                    {photo.caption && (
                      <span className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity line-clamp-2">
                        {photo.caption}
                      </span>
                    )}
                    <button
                      onClick={() => handleDelete(photo._id)}
                      className="ml-auto w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </AdminLayout>
    </>
  );
};

export default AdminFactoryPhotos;
