import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaTeeth } from 'react-icons/fa';
import { patients, dentalChartData, toothStatuses } from '../../data/mockData';

const upperTeeth = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
const lowerTeeth = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];

const statusColors = {
  Healthy: '#22c55e',
  Decay: '#ef4444',
  Filling: '#3b82f6',
  'Root Canal': '#f59e0b',
  Crown: '#8b5cf6',
  Missing: '#94a3b8',
  Implant: '#06b6d4',
  Extracted: '#6b7280',
  Fracture: '#f97316',
  Infection: '#dc2626',
  'Needs Follow-up': '#eab308',
};

function ToothIcon({ number, status, selected, onClick }) {
  const color = statusColors[status] || '#22c55e';
  const isUpper = number <= 28;

  return (
    <motion.button
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative flex flex-col items-center gap-1 p-1.5 rounded-xl transition-all ${selected ? 'bg-primary/20 ring-2 ring-primary' : 'hover:bg-slate-100 dark:hover:bg-slate-700'}`}
    >
      {!isUpper && <span className="text-xs text-slate-500 font-mono">{number}</span>}
      <svg width="28" height="32" viewBox="0 0 28 32" className={isUpper ? '' : 'rotate-180'}>
        <path
          d="M14 2C8 2 3 6 3 12C3 18 6 22 8 26C9 28 11 30 14 30C17 30 19 28 20 26C22 22 25 18 25 12C25 6 20 2 14 2Z"
          fill={color}
          stroke={selected ? '#0ea5e9' : '#cbd5e1'}
          strokeWidth="1.5"
          opacity={status === 'Missing' || status === 'Extracted' ? 0.3 : 1}
        />
        {(status === 'Missing' || status === 'Extracted') && (
          <line x1="6" y1="6" x2="22" y2="26" stroke="#94a3b8" strokeWidth="2" />
        )}
        {status === 'Implant' && (
          <rect x="11" y="16" width="6" height="12" fill="#06b6d4" rx="1" />
        )}
      </svg>
      {isUpper && <span className="text-xs text-slate-500 font-mono">{number}</span>}
    </motion.button>
  );
}

export default function DentalChart() {
  const { patientId } = useParams();
  const patient = patients.find((p) => p.id === parseInt(patientId));
  const [selectedTooth, setSelectedTooth] = useState(null);
  const [chartData, setChartData] = useState(dentalChartData[patientId] || []);

  if (!patient) {
    return <div className="flex items-center justify-center h-64"><p className="text-slate-500">Patient not found</p></div>;
  }

  const getToothData = (number) => chartData.find((t) => t.toothNumber === number);
  const selectedData = selectedTooth ? getToothData(selectedTooth) : null;

  const handleStatusChange = (newStatus) => {
    if (!selectedTooth) return;
    const existing = chartData.find((t) => t.toothNumber === selectedTooth);
    if (existing) {
      setChartData(chartData.map((t) => t.toothNumber === selectedTooth ? { ...t, status: newStatus } : t));
    } else {
      setChartData([...chartData, { toothNumber: selectedTooth, status: newStatus, treatment: '', notes: '' }]);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center gap-3">
        <Link to={`/admin/patients/${patientId}`} className="p-2 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/10"><FaArrowLeft /></Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2"><FaTeeth className="text-primary" /> Dental Chart</h1>
          <p className="text-sm text-slate-500">{patient.fullName} &middot; {patient.fileNumber}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="text-center mb-4">
            <span className="text-sm font-medium text-slate-500">Upper Jaw (Maxilla)</span>
          </div>
          <div className="flex justify-center flex-wrap gap-0.5 mb-4 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-2xl">
            {upperTeeth.map((num) => {
              const data = getToothData(num);
              return <ToothIcon key={num} number={num} status={data?.status || 'Healthy'} selected={selectedTooth === num} onClick={() => setSelectedTooth(num)} />;
            })}
          </div>

          <div className="border-t-2 border-dashed border-slate-300 dark:border-slate-600 my-4" />

          <div className="flex justify-center flex-wrap gap-0.5 mb-4 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-2xl">
            {lowerTeeth.map((num) => {
              const data = getToothData(num);
              return <ToothIcon key={num} number={num} status={data?.status || 'Healthy'} selected={selectedTooth === num} onClick={() => setSelectedTooth(num)} />;
            })}
          </div>
          <div className="text-center">
            <span className="text-sm font-medium text-slate-500">Lower Jaw (Mandible)</span>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mt-6 pt-4 border-t border-slate-100 dark:border-slate-700">
            {Object.entries(statusColors).map(([status, color]) => (
              <div key={status} className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color, opacity: status === 'Missing' || status === 'Extracted' ? 0.4 : 1 }} />
                <span className="text-xs text-slate-500">{status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
            <h3 className="font-bold text-slate-800 dark:text-white mb-4">
              {selectedTooth ? `Tooth #${selectedTooth}` : 'Select a Tooth'}
            </h3>
            {selectedTooth ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Status</label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {toothStatuses.map((status) => (
                      <button
                        key={status}
                        onClick={() => handleStatusChange(status)}
                        className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                          (selectedData?.status || 'Healthy') === status
                            ? 'text-white shadow-sm'
                            : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                        }`}
                        style={(selectedData?.status || 'Healthy') === status ? { backgroundColor: statusColors[status] } : {}}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
                {selectedData && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Treatment</label>
                      <p className="text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-700/50 p-3 rounded-xl">{selectedData.treatment || 'No treatment recorded'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Notes</label>
                      <p className="text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-700/50 p-3 rounded-xl">{selectedData.notes || 'No notes'}</p>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <p className="text-sm text-slate-500">Click on a tooth in the chart to view or update its information.</p>
            )}
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
            <h3 className="font-bold text-slate-800 dark:text-white mb-4">Chart Summary</h3>
            <div className="space-y-2">
              {chartData.filter((t) => t.status !== 'Healthy').map((t) => (
                <div key={t.toothNumber} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                  <span className="text-sm font-mono text-slate-700 dark:text-slate-300">#{t.toothNumber}</span>
                  <span className="text-xs font-medium px-2 py-0.5 rounded" style={{ backgroundColor: statusColors[t.status] + '20', color: statusColors[t.status] }}>
                    {t.status}
                  </span>
                </div>
              ))}
              {chartData.filter((t) => t.status !== 'Healthy').length === 0 && (
                <p className="text-sm text-slate-500">All teeth healthy</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
