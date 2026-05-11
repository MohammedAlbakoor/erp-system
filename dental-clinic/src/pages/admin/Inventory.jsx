import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiSearch, FiAlertTriangle } from 'react-icons/fi';
import { FaBoxes } from 'react-icons/fa';
import { inventoryItems, suppliers } from '../../data/mockData';

export default function Inventory() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = ['All', ...new Set(inventoryItems.map((i) => i.category))];
  const filtered = inventoryItems.filter((item) => {
    const matchSearch = !search || item.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = categoryFilter === 'All' || item.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  const lowStockItems = inventoryItems.filter((i) => i.quantity <= i.minQuantity);
  const expiringItems = inventoryItems.filter((i) => {
    const expiry = new Date(i.expiryDate);
    const threeMonths = new Date();
    threeMonths.setMonth(threeMonths.getMonth() + 3);
    return expiry <= threeMonths;
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Medical Inventory</h1>
          <p className="text-sm text-slate-500">{inventoryItems.length} items</p>
        </div>
        <button className="px-5 py-2.5 rounded-xl bg-primary text-white font-medium text-sm hover:bg-primary-dark shadow-lg shadow-primary/20 flex items-center gap-2">
          <FiPlus /> Add Item
        </button>
      </div>

      {(lowStockItems.length > 0 || expiringItems.length > 0) && (
        <div className="grid sm:grid-cols-2 gap-4">
          {lowStockItems.length > 0 && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2"><FiAlertTriangle className="text-red-500" /><span className="font-semibold text-red-700 dark:text-red-400 text-sm">Low Stock Alert</span></div>
              {lowStockItems.map((item) => (
                <p key={item.id} className="text-sm text-red-600 dark:text-red-300">{item.name}: {item.quantity} {item.unit} (min: {item.minQuantity})</p>
              ))}
            </div>
          )}
          {expiringItems.length > 0 && (
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2"><FiAlertTriangle className="text-amber-500" /><span className="font-semibold text-amber-700 dark:text-amber-400 text-sm">Expiry Alert</span></div>
              {expiringItems.map((item) => (
                <p key={item.id} className="text-sm text-amber-600 dark:text-amber-300">{item.name}: expires {item.expiryDate}</p>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
        <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex flex-wrap gap-3">
          <div className="flex-1 min-w-[200px] flex items-center bg-slate-100 dark:bg-slate-700 rounded-xl px-4 py-2.5">
            <FiSearch className="text-slate-400 mr-2" />
            <input type="text" placeholder="Search items..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent border-none outline-none text-sm text-slate-700 dark:text-slate-200 w-full" />
          </div>
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm text-slate-700 dark:text-slate-200 outline-none">
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-700/50">
                {['Item', 'Category', 'Quantity', 'Min Qty', 'Unit', 'Expiry', 'Supplier', 'Price', 'Status'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {filtered.map((item) => {
                const supplier = suppliers.find((s) => s.id === item.supplierId);
                const isLow = item.quantity <= item.minQuantity;
                return (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <FaBoxes className="text-primary" />
                        <span className="text-sm font-medium text-slate-800 dark:text-white">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3"><span className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-xs text-slate-600 dark:text-slate-300">{item.category}</span></td>
                    <td className={`px-4 py-3 text-sm font-semibold ${isLow ? 'text-red-500' : 'text-slate-800 dark:text-white'}`}>{item.quantity}</td>
                    <td className="px-4 py-3 text-sm text-slate-500">{item.minQuantity}</td>
                    <td className="px-4 py-3 text-sm text-slate-500">{item.unit}</td>
                    <td className="px-4 py-3 text-sm text-slate-500">{item.expiryDate}</td>
                    <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{supplier?.name}</td>
                    <td className="px-4 py-3 text-sm font-medium text-slate-800 dark:text-white">${item.purchasePrice}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${isLow ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'}`}>
                        {isLow ? 'Low Stock' : 'In Stock'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
