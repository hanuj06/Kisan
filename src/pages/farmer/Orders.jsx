import { useState } from 'react';
import { Phone, MapPin, Package, CheckCircle, Truck, Clock, X } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { FARMER_ORDERS } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import clsx from 'clsx';

const STATUS_STEPS = ['pending', 'confirmed', 'packed', 'shipped', 'delivered'];

const STATUS_COLORS = {
  pending:   'status-pending',
  confirmed: 'status-confirmed',
  packed:    'status-packed',
  shipped:   'status-shipped',
  delivered: 'status-delivered',
  cancelled: 'status-cancelled',
};

export default function FarmerOrders() {
  const { showToast } = useApp();
  const [orders, setOrders] = useState(FARMER_ORDERS);
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter);

  const updateStatus = (id, newStatus) => {
    setOrders(o => o.map(order => order.id === id ? { ...order, status: newStatus } : order));
    showToast(`Order ${id} marked as ${newStatus}`, 'success');
    setSelected(null);
  };

  return (
    <DashboardLayout type="farmer">
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-xl font-bold text-kd-earth">Orders</h2>
            <p className="text-sm text-gray-500">{orders.length} total orders</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {['all', 'pending', 'confirmed', 'shipped', 'delivered'].map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={clsx('px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-colors',
                  filter === s ? 'bg-kd-green-700 text-white' : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-200')}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filtered.map(order => (
            <div key={order.id} className="card p-5">
              <div className="flex items-start gap-4 flex-wrap">
                {/* Buyer info */}
                <img src={order.buyer.avatar} alt={order.buyer.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <div>
                      <p className="font-bold text-kd-earth">{order.buyer.name}</p>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="badge-blue text-[10px]">{order.buyer.type}</span>
                        <span className="text-xs text-gray-400">{order.id}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-mono font-bold text-kd-earth text-lg">₹{order.total.toLocaleString()}</p>
                      <span className={STATUS_COLORS[order.status]}>{order.status}</span>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {order.items.map((item, i) => (
                      <span key={i} className="text-xs bg-kd-paper px-2 py-1 rounded-lg text-gray-600">
                        {item.qty}{item.unit} {item.product}
                      </span>
                    ))}
                  </div>

                  {/* Info row */}
                  <div className="flex items-center gap-4 mt-3 text-xs text-gray-500 flex-wrap">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Ordered: {order.date}</span>
                    <span className="flex items-center gap-1"><Truck className="w-3 h-3" /> Deliver by: {order.deliveryDate}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {order.address.split(',').slice(-2).join(',').trim()}</span>
                    <span className="flex items-center gap-1">💳 {order.payment}</span>
                  </div>
                </div>
              </div>

              {/* Progress tracker */}
              <div className="mt-4 flex items-center gap-1 overflow-x-auto pb-1">
                {STATUS_STEPS.map((step, i) => {
                  const currentIdx = STATUS_STEPS.indexOf(order.status);
                  const done = i <= currentIdx;
                  return (
                    <div key={step} className="flex items-center gap-1 flex-shrink-0">
                      <div className={clsx('w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all',
                        done ? 'bg-kd-green-700 text-white' : 'bg-gray-100 text-gray-400')}>
                        {done ? <CheckCircle className="w-3.5 h-3.5" /> : i + 1}
                      </div>
                      <span className={clsx('text-[10px] font-medium capitalize hidden sm:block', done ? 'text-kd-green-700' : 'text-gray-400')}>
                        {step}
                      </span>
                      {i < STATUS_STEPS.length - 1 && (
                        <div className={clsx('h-px w-4 flex-shrink-0 mx-0.5', done && i < currentIdx ? 'bg-kd-green-700' : 'bg-gray-200')} />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-4 flex-wrap">
                {order.status === 'pending' && (
                  <>
                    <button onClick={() => updateStatus(order.id, 'confirmed')} className="btn-primary btn-sm">
                      <CheckCircle className="w-3.5 h-3.5" /> Accept Order
                    </button>
                    <button onClick={() => updateStatus(order.id, 'cancelled')} className="btn-danger btn-sm">
                      <X className="w-3.5 h-3.5" /> Decline
                    </button>
                  </>
                )}
                {order.status === 'confirmed' && (
                  <button onClick={() => updateStatus(order.id, 'packed')} className="btn-primary btn-sm">
                    <Package className="w-3.5 h-3.5" /> Mark as Packed
                  </button>
                )}
                {order.status === 'packed' && (
                  <button onClick={() => updateStatus(order.id, 'shipped')} className="btn-primary btn-sm">
                    <Truck className="w-3.5 h-3.5" /> Mark as Shipped
                  </button>
                )}
                <a href={`tel:${order.buyer.phone}`} className="btn-outline btn-sm">
                  <Phone className="w-3.5 h-3.5" /> Call Buyer
                </a>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <Package className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No {filter !== 'all' ? filter : ''} orders yet</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
