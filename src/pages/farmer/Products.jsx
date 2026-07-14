import { useState } from 'react';
import { Plus, Edit, Trash2, Eye, Package, Sparkles, Leaf, TrendingUp } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { PRODUCTS } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import clsx from 'clsx';

const MY_PRODUCTS = PRODUCTS.filter(p => p.farmerId === 'f001');

export default function FarmerProducts() {
  const { showToast } = useApp();
  const [products, setProducts] = useState(MY_PRODUCTS);
  const [showAdd, setShowAdd] = useState(false);
  const [aiSuggested, setAiSuggested] = useState(false);
  const [form, setForm] = useState({
    name: '', category: 'vegetables', price: '', unit: 'kg',
    stock: '', minOrder: 1, organic: false, description: '',
  });

  const handleAIPrice = () => {
    const basePrice = Math.floor(Math.random() * 40) + 20;
    setForm(f => ({ ...f, price: basePrice }));
    setAiSuggested(true);
    showToast(`AI suggests ₹${basePrice}/kg based on current mandi prices`, 'info');
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const newProd = {
      id: `p-new-${Date.now()}`,
      ...form,
      farmerId: 'f001',
      farmer: 'Ramesh Patel',
      farmerLocation: 'Anand, Gujarat',
      images: ['https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80'],
      rating: 0,
      reviewCount: 0,
      mrp: Math.round(form.price * 1.4),
      harvestDate: new Date().toISOString().split('T')[0],
      freshnessDays: 7,
      certified: false,
      discount: 0,
    };
    setProducts(p => [newProd, ...p]);
    setShowAdd(false);
    setForm({ name: '', category: 'vegetables', price: '', unit: 'kg', stock: '', minOrder: 1, organic: false, description: '' });
    setAiSuggested(false);
    showToast('Product listed successfully!', 'success');
  };

  const handleDelete = (id) => {
    setProducts(p => p.filter(prod => prod.id !== id));
    showToast('Product removed', 'info');
  };

  return (
    <DashboardLayout type="farmer">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-kd-earth">My Products</h2>
            <p className="text-sm text-gray-500 mt-0.5">{products.length} active listings</p>
          </div>
          <button onClick={() => setShowAdd(!showAdd)} className="btn-primary">
            <Plus className="w-4 h-4" /> Add New Listing
          </button>
        </div>

        {/* Add Product Form */}
        {showAdd && (
          <div className="card p-6 border-kd-green-300 animate-slide-down">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-kd-earth">List New Product</h3>
              <button onClick={() => setShowAdd(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <form onSubmit={handleAdd} className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="input-label">Product Name *</label>
                <input
                  type="text"
                  className="input"
                  placeholder="e.g. Fresh Organic Tomatoes"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  required
                />
              </div>

              <div>
                <label className="input-label">Category</label>
                <select className="input" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                  {['vegetables', 'fruits', 'grains', 'pulses', 'spices', 'herbs'].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="input-label">Unit</label>
                <select className="input" value={form.unit} onChange={e => setForm(f => ({ ...f, unit: e.target.value }))}>
                  {['kg', 'quintal', 'piece', 'dozen', 'litre', 'gram'].map(u => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="input-label">Your Price (₹/{form.unit}) *</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    className="input flex-1"
                    placeholder="e.g. 28"
                    value={form.price}
                    onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                    required
                  />
                  <button
                    type="button"
                    onClick={handleAIPrice}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-kd-amber-100 text-kd-amber-600 text-xs font-bold hover:bg-kd-amber-200 transition-colors flex-shrink-0 border border-kd-amber-200"
                  >
                    <Sparkles className="w-3.5 h-3.5" /> AI Suggest
                  </button>
                </div>
                {aiSuggested && (
                  <p className="text-[11px] text-kd-green-700 mt-1">✓ AI price based on current mandi data</p>
                )}
              </div>

              <div>
                <label className="input-label">Available Stock ({form.unit}s) *</label>
                <input
                  type="number"
                  className="input"
                  placeholder="e.g. 500"
                  value={form.stock}
                  onChange={e => setForm(f => ({ ...f, stock: e.target.value }))}
                  required
                />
              </div>

              <div>
                <label className="input-label">Minimum Order ({form.unit}s)</label>
                <input
                  type="number"
                  className="input"
                  value={form.minOrder}
                  onChange={e => setForm(f => ({ ...f, minOrder: parseInt(e.target.value) || 1 }))}
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="organic-check"
                  checked={form.organic}
                  onChange={e => setForm(f => ({ ...f, organic: e.target.checked }))}
                  className="w-4 h-4 accent-kd-green-700"
                />
                <label htmlFor="organic-check" className="flex items-center gap-1.5 text-sm font-medium text-kd-earth cursor-pointer">
                  <Leaf className="w-4 h-4 text-kd-green-700" /> Organically Grown
                </label>
              </div>

              <div className="sm:col-span-2">
                <label className="input-label">Description</label>
                <textarea
                  className="input resize-none"
                  rows={3}
                  placeholder="Describe your produce, farming methods, quality..."
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                />
              </div>

              <div className="sm:col-span-2 flex gap-3">
                <button type="submit" className="btn-primary flex-1">
                  <Package className="w-4 h-4" /> List Product
                </button>
                <button type="button" onClick={() => setShowAdd(false)} className="btn-outline">Cancel</button>
              </div>
            </form>
          </div>
        )}

        {/* Products grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map(product => (
            <div key={product.id} className="card overflow-hidden group">
              <div className="relative aspect-video">
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute top-3 left-3 flex gap-1">
                  {product.organic && <span className="badge-organic text-[10px]"><Leaf className="w-3 h-3" /> Organic</span>}
                </div>
                <div className="absolute top-3 right-3 flex gap-1">
                  <button className="w-8 h-8 bg-white/90 rounded-lg flex items-center justify-center shadow-kd hover:bg-white transition-colors">
                    <Eye className="w-4 h-4 text-gray-500" />
                  </button>
                  <button className="w-8 h-8 bg-white/90 rounded-lg flex items-center justify-center shadow-kd hover:bg-white transition-colors">
                    <Edit className="w-4 h-4 text-kd-blue-700" />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="w-8 h-8 bg-white/90 rounded-lg flex items-center justify-center shadow-kd hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-kd-earth text-sm">{product.name}</h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-mono font-bold text-kd-green-700 text-lg">₹{product.price}/{product.unit}</span>
                  <span className={clsx('badge text-[10px]', product.stock > 100 ? 'badge-green' : 'badge-amber')}>
                    {product.stock} in stock
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                  <span>Min: {product.minOrder} {product.unit}</span>
                  <span>•</span>
                  <span>Harvested: {product.harvestDate}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <TrendingUp className="w-3 h-3 text-kd-green-700" />
                  <span className="text-xs text-kd-green-700 font-medium">{product.reviewCount} orders • {product.rating > 0 ? `${product.rating}★` : 'New listing'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
