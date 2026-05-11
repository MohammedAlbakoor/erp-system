import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { clinicInfo } from '../../data/mockData';

export default function WhatsAppButton() {
  const message = encodeURIComponent(
    `Hello, I would like to book an appointment at ${clinicInfo.name}.\n\nName:\nRequired service:\nPreferred day:\nPreferred time:\nIs this the first visit?\nNotes:`
  );

  return (
    <motion.a
      href={`https://wa.me/${clinicInfo.whatsapp}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg shadow-green-500/30 hover:bg-green-600 transition-colors"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <FaWhatsapp size={28} />
    </motion.a>
  );
}
