import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import AdminLayout from '../../components/admin/AdminLayout';
import { getInquiries, updateInquiryStatus, deleteInquiry } from '../../services/inquiryService';
import toast from 'react-hot-toast';
import { Trash2, MessageSquare, RefreshCw, ChevronDown } from 'lucide-react';

const STATUS_COLORS = {
  new: 'bg-accent/10 text-accent border-accent/30',
  contacted: 'bg-primary/10 text-primary border-primary/30',
  closed: 'bg-border text-text-lighter border-border',
};

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  const fetch = () => {
    setLoading(true);
    const params = filter ? { status: filter } : {};
    getInquiries(params)
      .then((res) => setInquiries(res.data?.inquiries || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetch(); }, [filter]);

  const handleStatus = async (id, status) => {
    try {
      await updateInquiryStatus(id, status);
      setInquiries((prev) => prev.map((i) => i._id === id ? { ...i, status } : i));
      toast.success('Status updated');
    } catch { toast.error('Failed to update'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this inquiry?')) return;
    try {
      await deleteInquiry(id);
      setInquiries((prev) => prev.filter((i) => i._id !== id));
      toast.success('Inquiry deleted');
    } catch { toast.error('Failed to delete'); }
  };

  return (
    <>
      <Helmet><title>Inquiries — Admin | Lohitha Murmura</title></Helmet>
      <AdminLayout>
        <div className="space-y-5">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              <h2 className="font-heading font-semibold text-text text-xl">Inquiries</h2>
              <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded-full">{inquiries.length}</span>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="input w-auto py-2 text-sm"
              >
                <option value="">All Status</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="closed">Closed</option>
              </select>
              <button onClick={fetch} className="p-2 rounded-lg border border-border hover:border-primary text-text-light hover:text-primary">
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[1,2,3,4].map(i => <div key={i} className="h-20 bg-border rounded-xl animate-pulse" />)}
            </div>
          ) : inquiries.length === 0 ? (
            <div className="card p-12 text-center text-text-light">
              <MessageSquare className="w-12 h-12 mx-auto mb-3 text-border" />
              <p>No inquiries found.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {inquiries.map((inq) => (
                <div key={inq._id} className="card p-5 flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <p className="font-heading font-semibold text-text">{inq.name || 'Walk-in Customer'}</p>
                        {inq.phone && <p className="text-text-light text-sm">{inq.phone}</p>}
                      </div>
                      <span className={`badge border ${STATUS_COLORS[inq.status] || STATUS_COLORS.new} capitalize shrink-0`}>
                        {inq.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {inq.products?.map((p, i) => (
                        <span key={i} className="text-xs bg-background border border-border rounded-full px-3 py-1 text-text">
                          {p.productName} × {p.quantity} bags
                        </span>
                      ))}
                    </div>
                    <p className="text-text-lighter text-xs mt-2">
                      {new Date(inq.createdAt).toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className="flex sm:flex-col gap-2 shrink-0">
                    <select
                      value={inq.status}
                      onChange={(e) => handleStatus(inq._id, e.target.value)}
                      className="input py-1.5 text-xs w-full sm:w-32"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="closed">Closed</option>
                    </select>
                    <button
                      onClick={() => handleDelete(inq._id)}
                      className="p-2 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors self-start"
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

export default AdminInquiries;
