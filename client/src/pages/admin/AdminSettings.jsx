import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import AdminLayout from '../../components/admin/AdminLayout';
import { getSettings, updateSettings } from '../../services/settingsService';
import toast from 'react-hot-toast';
import { Save, Loader2, Settings } from 'lucide-react';

const FIELDS = [
  { key: 'businessName', label: 'Business Name', type: 'text' },
  { key: 'tagline', label: 'Tagline', type: 'text' },
  { key: 'heroDescription', label: 'Hero Description', type: 'textarea' },
  { key: 'phone', label: 'Phone Number', type: 'text' },
  { key: 'whatsapp', label: 'WhatsApp Number (with country code, no +)', type: 'text' },
  { key: 'email', label: 'Email Address', type: 'email' },
  { key: 'address', label: 'Factory Address', type: 'textarea' },
  { key: 'workingHours', label: 'Working Hours', type: 'text' },
  { key: 'googleMapsEmbed', label: 'Google Maps Embed URL', type: 'textarea' },
  { key: 'googleMapsLink', label: 'Google Maps Link', type: 'text' },
  { key: 'facebook', label: 'Facebook URL', type: 'text' },
  { key: 'instagram', label: 'Instagram URL', type: 'text' },
  { key: 'youtube', label: 'YouTube URL', type: 'text' },
];

const AdminSettings = () => {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getSettings()
      .then((res) => setForm(res.data || {}))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateSettings(form);
      toast.success('Settings saved successfully!');
    } catch {
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <AdminLayout>
      <div className="space-y-4">
        {[1,2,3,4,5].map(i => <div key={i} className="h-12 bg-border rounded-xl animate-pulse" />)}
      </div>
    </AdminLayout>
  );

  return (
    <>
      <Helmet><title>Settings — Admin | Lohitha Murmura</title></Helmet>
      <AdminLayout>
        <form onSubmit={handleSave} className="space-y-6 max-w-3xl">
          <div className="flex items-center gap-2 mb-2">
            <Settings className="w-5 h-5 text-primary" />
            <h2 className="font-heading font-semibold text-text text-xl">Website Settings</h2>
          </div>

          <div className="card p-6 space-y-5">
            <h3 className="font-heading font-semibold text-text border-b border-border pb-3">Business Information</h3>
            {FIELDS.map((field) => (
              <div key={field.key}>
                <label className="label">{field.label}</label>
                {field.type === 'textarea' ? (
                  <textarea
                    value={form[field.key] || ''}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    rows={3}
                    className="input resize-none"
                  />
                ) : (
                  <input
                    type={field.type}
                    value={form[field.key] || ''}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    className="input"
                  />
                )}
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={saving}
            className="btn-primary py-3.5 px-8 disabled:opacity-60"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </form>
      </AdminLayout>
    </>
  );
};

export default AdminSettings;
