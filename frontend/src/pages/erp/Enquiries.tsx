import { useEffect, useMemo, useState } from 'react';
import { Mail, Phone, RefreshCw, Search } from 'lucide-react';
import { DataTable, type Column, Pagination } from '../../components/erp/DataTable';
import { PageHeader } from '../../components/erp/PageHeader';
import { enquiryApi, type EnquiryRecord } from '../../services';

type EnquiryRow = Omit<EnquiryRecord, 'id'> & { id: string };

const formatSubmittedAt = (value: string) => new Intl.DateTimeFormat('en-IN', {
  dateStyle: 'medium', timeStyle: 'short',
}).format(new Date(value));

export default function Enquiries() {
  const [rows, setRows] = useState<EnquiryRow[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const loadEnquiries = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await enquiryApi.listAll();
      setRows(data.map((enquiry) => ({ ...enquiry, id: enquiry.id.toString() })));
      setPage(1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load enquiries.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void loadEnquiries(); }, []);

  const filtered = useMemo(() => rows.filter((enquiry) =>
    [enquiry.name, enquiry.email, enquiry.phone, enquiry.interestedIn, enquiry.message]
      .filter(Boolean).join(' ').toLowerCase().includes(query.toLowerCase()),
  ), [rows, query]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  const columns: Column<EnquiryRow>[] = [
    { key: 'name', label: 'Enquirer', render: (enquiry) => <div><div className="font-semibold text-ink-900 dark:text-white">{enquiry.name}</div><a className="mt-1 flex items-center gap-1 text-xs text-brand-600 hover:underline" href={`mailto:${enquiry.email}`}><Mail className="h-3 w-3" />{enquiry.email}</a></div> },
    { key: 'phone', label: 'Phone', render: (enquiry) => <a className="flex items-center gap-1 hover:text-brand-600" href={`tel:${enquiry.phone}`}><Phone className="h-3.5 w-3.5" />{enquiry.phone}</a> },
    { key: 'interestedIn', label: 'Interested in', render: (enquiry) => enquiry.interestedIn || '—' },
    { key: 'message', label: 'Message', className: 'max-w-xs whitespace-normal!', render: (enquiry) => <p className="max-w-xs whitespace-normal leading-relaxed">{enquiry.message}</p> },
    { key: 'submittedAt', label: 'Submitted', render: (enquiry) => formatSubmittedAt(enquiry.submittedAt) },
  ];

  return <div>
    <PageHeader title="Enquiries" subtitle={loading ? 'Loading enquiries...' : `${filtered.length} submitted enquiries`} action={<button onClick={() => void loadEnquiries()} className="btn-secondary"><RefreshCw className="h-4 w-4" /> Refresh</button>} />
    <div className="relative mb-4 w-full sm:w-80"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" /><input value={query} onChange={(e) => { setQuery(e.target.value); setPage(1); }} className="input py-2 pl-9" placeholder="Search enquiries..." /></div>
    {error && <div className="card mb-4 p-4 text-rose-600">{error}</div>}
    <DataTable columns={columns} rows={paged} loading={loading} empty="No enquiries have been submitted yet." />
    <Pagination page={page} total={totalPages} onChange={setPage} />
  </div>;
}
