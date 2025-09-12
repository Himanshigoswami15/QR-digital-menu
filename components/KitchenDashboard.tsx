import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Order, OrderStatus } from '../types';

const statusStyles = {
    [OrderStatus.Pending]: 'bg-yellow-500/20 text-yellow-300 border-yellow-500',
    [OrderStatus.Preparing]: 'bg-blue-500/20 text-blue-300 border-blue-500',
    [OrderStatus.Ready]: 'bg-green-500/20 text-green-300 border-green-500',
    [OrderStatus.Served]: 'bg-gray-500/20 text-gray-400 border-gray-500',
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
        <div className="bg-base-200 rounded-lg shadow-lg p-4 flex flex-col h-full">
            <div className="flex justify-between items-start mb-3">
                <div>
                    <h3 className="text-2xl font-bold text-white">Table {order.tableNumber}</h3>
                    <p className="text-xs text-gray-400">{order.id}</p>
                </div>
                <div className={`px-3 py-1 text-sm font-bold rounded-full border ${statusStyles[order.status]}`}>
                    {order.status}
                </div>
            </div>
            <div className="border-t border-base-300 my-3"></div>
            <div className="space-y-2 flex-grow">
                {order.items.map(item => (
                    <div key={item.dish.id} className="flex justify-between items-start">
                        <div>
                            <p className="font-semibold text-white">{item.quantity}x {item.dish.name}</p>
                            {item.instructions && (
                                <p className="text-xs text-amber-300 mt-1 italic pl-4">"{item.instructions}"</p>
                            )}
                        </div>
                        <p className="text-gray-300 font-mono">${(item.dish.price * item.quantity).toFixed(2)}</p>
                    </div>
                ))}
            </div>
            <div className="border-t border-base-300 my-3"></div>
            <div className="flex justify-between items-center">
                 <p className="text-lg font-bold text-white">Total: <span className="text-accent">${order.total.toFixed(2)}</span></p>
                {order.status !== OrderStatus.Served && (
                    <button 
                        onClick={handleNextStatus}
                        className="bg-primary text-primary-content font-bold py-2 px-4 rounded-lg hover:bg-primary-focus transition-colors"
                    >
                        Mark as {nextStatus[order.status]}
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
        <div>
            <h2 className="text-4xl font-extrabold text-white mb-6">Kitchen Dashboard</h2>
            {state.orders.length === 0 ? (
                <div className="text-center py-20 bg-base-200 rounded-lg">
                    <p className="text-xl text-gray-400">No orders yet. Waiting for new orders...</p>
                </div>
            ) : (
                <>
                    <h3 className="text-2xl font-bold text-primary mb-4">Active Orders ({activeOrders.length})</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {activeOrders.sort((a,b) => a.timestamp.getTime() - b.timestamp.getTime()).map(order => (
                            <OrderCard key={order.id} order={order} />
                        ))}
                    </div>
                     {completedOrders.length > 0 && (
                        <>
                         <h3 className="text-2xl font-bold text-gray-500 mt-12 mb-4">Completed Orders ({completedOrders.length})</h3>
                         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {completedOrders.sort((a,b) => b.timestamp.getTime() - a.timestamp.getTime()).map(order => (
                                <OrderCard key={order.id} order={order} />
                            ))}
                        </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default KitchenDashboard;