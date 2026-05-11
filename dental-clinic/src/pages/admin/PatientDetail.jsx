import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaCalendar, FaHeartbeat, FaTeeth, FaFileInvoiceDollar, FaClipboardList, FaArrowLeft } from 'react-icons/fa';
import { patients, appointments, treatmentPlans, invoices, services } from '../../data/mockData';

export default function PatientDetail() {
  const { id } = useParams();
  const patient = patients.find((p) => p.id === parseInt(id));

  if (!patient) {
    return <div className="flex items-center justify-center h-64"><p className="text-slate-500">Patient not found</p></div>;
  }

  const patientAppts = appointments.filter((a) => a.patientId === patient.id);
  const patientPlans = treatmentPlans.filter((p) => p.patientId === patient.id);
  const patientInvoices = invoices.filter((i) => i.patientId === patient.id);


  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/admin/patients" className="p-2 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/10 transition-colors"><FaArrowLeft /></Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">{patient.fullName}</h1>
          <p className="text-sm text-slate-500">{patient.fileNumber} &middot; {patient.status}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center text-white text-2xl font-bold">{patient.fullName.charAt(0)}</div>
              <div>
                <h2 className="text-lg font-bold text-slate-800 dark:text-white">{patient.fullName}</h2>
                <p className="text-sm text-slate-500">{patient.profession} &middot; {patient.gender}, {patient.age}y</p>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              {[
                { icon: FaPhone, value: patient.phone },
                { icon: FaEnvelope, value: patient.email },
                { icon: FaMapMarkerAlt, value: `${patient.address}, ${patient.city}` },
                { icon: FaCalendar, value: `DOB: ${patient.birthDate}` },
              ].map(({ icon: Icon, value }) => (
                <div key={value} className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                  <Icon className="text-primary shrink-0" size={14} /> {value}
                </div>
              ))}
              <p className="text-slate-500 text-xs mt-2">Referral: {patient.referralSource} &middot; Since {patient.createdAt}</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
            <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2"><FaHeartbeat className="text-danger" /> Medical Info</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-slate-500">Chronic Diseases</span><span className="text-slate-800 dark:text-white font-medium">{patient.medicalInfo.chronicDiseases || 'None'}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Allergies</span><span className="text-slate-800 dark:text-white font-medium">{patient.medicalInfo.allergies || 'None'}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Medications</span><span className="text-slate-800 dark:text-white font-medium">{patient.medicalInfo.currentMedications || 'None'}</span></div>
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 dark:border-slate-700">
                {[
                  { label: 'Diabetes', value: patient.medicalInfo.diabetes },
                  { label: 'Blood Pressure', value: patient.medicalInfo.highBloodPressure },
                  { label: 'Heart Disease', value: patient.medicalInfo.heartDisease },
                  { label: 'Bleeding Issues', value: patient.medicalInfo.bleedingProblems },
                ].map(({ label, value }) => (
                  <div key={label} className={`px-2 py-1 rounded-lg text-xs ${value ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'}`}>
                    {label}: {value ? 'Yes' : 'No'}
                  </div>
                ))}
              </div>
              {patient.medicalInfo.medicalNotes && <p className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-2 rounded-lg mt-2">{patient.medicalInfo.medicalNotes}</p>}
            </div>
          </div>

          <Link to={`/admin/dental-chart/${patient.id}`} className="block bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3"><FaTeeth className="text-primary text-xl" /><span className="font-semibold text-slate-800 dark:text-white">View Dental Chart</span></div>
          </Link>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
            <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2"><FaCalendar className="text-primary" /> Appointments ({patientAppts.length})</h3>
            <div className="space-y-2">
              {patientAppts.map((appt) => {
                const service = services.find((s) => s.id === appt.serviceId);
                const statusColors = { Completed: 'bg-green-100 text-green-700', Confirmed: 'bg-blue-100 text-blue-700', New: 'bg-purple-100 text-purple-700', Emergency: 'bg-red-100 text-red-700' };
                return (
                  <div key={appt.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                    <div>
                      <p className="text-sm font-medium text-slate-800 dark:text-white">{service?.name}</p>
                      <p className="text-xs text-slate-500">{appt.date} at {appt.startTime}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${statusColors[appt.status] || 'bg-slate-100 text-slate-600'}`}>{appt.status}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
            <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2"><FaClipboardList className="text-primary" /> Treatment Plans ({patientPlans.length})</h3>
            {patientPlans.map((plan) => (
              <div key={plan.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 mb-3 last:mb-0">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-slate-800 dark:text-white text-sm">{plan.title}</h4>
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${plan.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : plan.status === 'Proposed' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-600'}`}>{plan.status}</span>
                </div>
                <p className="text-xs text-slate-500 mb-2">{plan.diagnosis}</p>
                <div className="flex items-center gap-4 text-xs">
                  <span className="text-slate-500">Total: <span className="font-medium text-slate-800 dark:text-white">${plan.totalCost}</span></span>
                  <span className="text-green-600">Paid: ${plan.paidAmount}</span>
                  <span className="text-red-500">Remaining: ${plan.totalCost - plan.discount - plan.paidAmount}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
            <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2"><FaFileInvoiceDollar className="text-primary" /> Invoices ({patientInvoices.length})</h3>
            <div className="space-y-2">
              {patientInvoices.map((inv) => {
                const statusColors = { Paid: 'bg-green-100 text-green-700', 'Partially Paid': 'bg-amber-100 text-amber-700', Unpaid: 'bg-red-100 text-red-700' };
                return (
                  <div key={inv.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                    <div>
                      <p className="text-sm font-medium text-slate-800 dark:text-white font-mono">{inv.invoiceNumber}</p>
                      <p className="text-xs text-slate-500">{inv.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-800 dark:text-white">${inv.total}</p>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusColors[inv.status] || ''}`}>{inv.status}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
