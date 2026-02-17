
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Order, OrderStatus } from '../types';

const statusStyles = {
    [OrderStatus.Pending]: 'bg-white/10 text-white border-white/40',
    [OrderStatus.Preparing]: 'bg-white/20 text-white border-white/60',
    [OrderStatus.Ready]: 'bg-white text-base-100 border-white',
    [OrderStatus.Served]: 'opacity-30 border-white/10',
};

const nextStatus = {
    [OrderStatus.Pending]: OrderStatus.Preparing,
    [OrderStatus.Preparing]: OrderStatus.Ready,
    [OrderStatus.Ready]: OrderStatus.Served,
};

const OrderCard: React.FC<{ order: Order }> = ({ order }) => {
    const { dispatch } = useAppContext();

    const handleNextStatus = () => {
        const next = nextStatus[order.status];
        if (next) {
            dispatch({ type: 'UPDATE_ORDER_STATUS_BY_ID', payload: { orderId: order.id, status: next } });
        }
    };

    return (
        <div className={`bg-white/5 border rounded-sm p-6 flex flex-col h-full transition-all duration-500 ${statusStyles[order.status]}`}>
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-2xl font-black tracking-tighter">TABLE {order.tableNumber}</h3>
                    <p className="text-[9px] tracking-widest uppercase opacity-60 font-mono">{order.id}</p>
                </div>
                <div className="text-[10px] font-black tracking-widest uppercase px-2 py-1 border border-current">
                    {order.status}
                </div>
            </div>
            
            <div className="h-[1px] bg-current opacity-20 mb-4"></div>
            
            <div className="space-y-3 flex-grow">
                {order.items.map(item => (
                    <div key={item.dish.id} className="flex justify-between items-start">
                        <div className="flex-grow">
                            <p className="text-sm font-bold uppercase tracking-widest">{item.quantity}x {item.dish.name}</p>
                            {item.instructions && (
                                <p className="text-[10px] italic mt-1 font-light bg-current/10 px-2 py-1">“{item.instructions}”</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="h-[1px] bg-current opacity-20 mt-6 mb-4"></div>
            
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-end">
                    <span className="text-[9px] tracking-widest uppercase opacity-60">Total Value</span>
                    <span className="text-lg font-black tracking-widest">${order.total.toFixed(2)}</span>
                </div>
                {order.status !== OrderStatus.Served && (
                    <button 
                        onClick={handleNextStatus}
                        className={`w-full py-3 rounded-sm font-black text-xs tracking-[0.2em] uppercase border transition-all ${
                            order.status === OrderStatus.Ready 
                            ? 'bg-base-100 text-white border-base-100 hover:bg-transparent hover:text-base-100' 
                            : 'bg-white text-base-100 border-white hover:bg-transparent hover:text-white'
                        }`}
                    >
                        Advance to {nextStatus[order.status]}
                    </button>
                )}
            </div>
        </div>
    );
};

const KitchenDashboard: React.FC = () => {
    const { state } = useAppContext();

    const activeOrders = state.orders.filter(o => o.status !== OrderStatus.Served);
    const completedOrders = state.orders.filter(o => o.status === OrderStatus.Served);

    return (
        <div className="pb-20">
            <div className="flex items-end justify-between mb-12">
                <h2 className="text-4xl font-light tracking-[0.3em] uppercase text-white">Kitchen Dashboard</h2>
                <div className="text-[10px] tracking-widest text-white/40 uppercase">System Active</div>
            </div>
            
            {state.orders.length === 0 ? (
                <div className="text-center py-40 border border-dashed border-white/20">
                    <p className="text-xs tracking-[0.4em] uppercase text-white/30">Awaiting Guest Orders...</p>
                </div>
            ) : (
                <div className="space-y-16">
                    <div>
                        <div className="flex items-center gap-4 mb-8">
                            <h3 className="text-xs font-black tracking-[0.4em] uppercase text-white">Active Services ({activeOrders.length})</h3>
                            <div className="h-[1px] flex-grow bg-white/20"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {activeOrders.sort((a,b) => a.timestamp.getTime() - b.timestamp.getTime()).map(order => (
                                <OrderCard key={order.id} order={order} />
                            ))}
                        </div>
                    </div>
                    
                    {completedOrders.length > 0 && (
                        <div>
                            <div className="flex items-center gap-4 mb-8">
                                <h3 className="text-xs font-black tracking-[0.4em] uppercase text-white/30">Completed Services ({completedOrders.length})</h3>
                                <div className="h-[1px] flex-grow bg-white/5"></div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {completedOrders.sort((a,b) => b.timestamp.getTime() - a.timestamp.getTime()).map(order => (
                                    <OrderCard key={order.id} order={order} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default KitchenDashboard;