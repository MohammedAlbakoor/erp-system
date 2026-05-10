'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { adminApi } from '@/lib/showroomApi';

const settingFields = [
  { key: 'showroom_name', label: 'Showroom Name' },
  { key: 'whatsapp_number', label: 'WhatsApp Number' },
  { key: 'phone', label: 'Phone Number' },
  { key: 'email', label: 'Email' },
  { key: 'address', label: 'Address' },
  { key: 'working_hours', label: 'Working Hours' },
  { key: 'about_text', label: 'About Text', textarea: true },
  { key: 'vision', label: 'Vision', textarea: true },
  { key: 'mission', label: 'Mission', textarea: true },
  { key: 'values', label: 'Values', textarea: true },
  { key: 'facebook_url', label: 'Facebook URL' },
  { key: 'instagram_url', label: 'Instagram URL' },
  { key: 'twitter_url', label: 'Twitter URL' },
  { key: 'google_maps_url', label: 'Google Maps URL' },
  { key: 'currency', label: 'Currency' },
  { key: 'meta_title', label: 'SEO Title' },
  { key: 'meta_description', label: 'SEO Description', textarea: true },
];

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    adminApi.getSettings()
      .then((data: Record<string, string>) => setSettings(data || {}))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await adminApi.updateSettings(settings);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch { alert('Failed to save settings'); }
    finally { setSaving(false); }
  };

  if (loading) {
    return <div className="flex justify-center py-12"><div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-white">Showroom Settings</h1>
        <button onClick={handleSave} disabled={saving} className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold px-6 py-3 rounded-xl transition-all disabled:opacity-50">
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Settings'}
        </button>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-6">
        {settingFields.map(field => (
          <div key={field.key}>
            <label className="text-gray-400 text-sm font-medium block mb-2">{field.label}</label>
            {field.textarea ? (
              <textarea value={settings[field.key] || ''} onChange={e => setSettings({ ...settings, [field.key]: e.target.value })} rows={3} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-amber-500 resize-none" />
            ) : (
              <input type="text" value={settings[field.key] || ''} onChange={e => setSettings({ ...settings, [field.key]: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-amber-500" />
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
