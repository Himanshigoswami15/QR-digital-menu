
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { OrderStatus } from '../types';
import { CheckCircleIcon, CreditCardIcon, ClockIcon, KitchenDisplayIcon } from './icons/Icons';

const statusMap = {
    [OrderStatus.Pending]: { text: 'Received', description: 'Your selection is being reviewed by the chef.', index: 0 },
    [OrderStatus.Preparing]: { text: 'Preparing', description: 'Fresh ingredients are being combined with care.', index: 1 },
    [OrderStatus.Ready]: { text: 'Finishing', description: 'Your order is being plated and is ready for service.', index: 2 },
    [OrderStatus.Served]: { text: 'Enjoy', description: 'We hope you find every bite memorable.', index: 3 },
};

const OrderStatusView: React.FC = () => {
    const { state } = useAppContext();
    const [paymentMethod, setPaymentMethod] = useState<'later' | 'online' | null>(null);
    
    const order = state.orders.find(o => o.id === state.currentOrderId);

    if (!order) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-white/30 uppercase tracking-[0.2em] text-xs">
                <p>No active order found.</p>
            </div>
        );
    }

    const currentStatusIndex = statusMap[order.status].index;
    const isOrderComplete = order.status === OrderStatus.Served;

    return (
        <div className="max-w-2xl mx-auto py-10">
            <div className="text-center mb-12">
                <h2 className="text-2xl font-light tracking-[0.4em] uppercase text-white mb-2">Order Tracking</h2>
                <p className="text-[10px] tracking-[0.3em] text-white/40 uppercase">Ref No: {order.id}</p>
            </div>

            <div className="flex justify-between items-center mb-16 relative">
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -z-10"></div>
                {Object.values(OrderStatus).map((status) => {
                    const statusInfo = statusMap[status];
                    const isCompleted = statusInfo.index <= currentStatusIndex;
                    const isCurrent = statusInfo.index === currentStatusIndex;

                    return (
                        <div key={status} className="flex flex-col items-center gap-4 bg-base-100 px-2">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-700 ${isCompleted ? 'bg-white border-white' : 'bg-base-100 border-white/20'}`}>
                                {isCompleted ? (
                                    <CheckCircleIcon className="w-6 h-6 text-base-100"/>
                                ) : (
                                    <div className={`w-2 h-2 rounded-full ${isCurrent ? 'bg-white animate-pulse' : 'bg-white/10'}`}></div>
                                )}
                            </div>
                            <span className={`text-[9px] font-bold tracking-[0.2em] uppercase ${isCompleted ? 'text-white' : 'text-white/20'}`}>
                                {statusInfo.text}
                            </span>
                        </div>
                    );
                })}
            </div>
            
            <div className="bg-white/5 border border-white/10 p-10 rounded-sm text-center mb-12">
                <h3 className="text-xl font-bold tracking-[0.2em] uppercase text-white mb-3">{statusMap[order.status].text}</h3>
                <p className="text-sm font-light text-white/60 italic">"{statusMap[order.status].description}"</p>
                 {order.status === OrderStatus.Pending && (
                    <div className="mt-8 flex items-center justify-center gap-3">
                        <div className="w-8 h-[1px] bg-white/20"></div>
                        <KitchenDisplayIcon className="w-5 h-5 text-white/40" />
                        <span className="text-[9px] tracking-widest uppercase text-white/40">Verified by Kitchen</span>
                        <div className="w-8 h-[1px] bg-white/20"></div>
                    </div>
                )}
            </div>
            
            {isOrderComplete && (
                <div className="border-t border-white/10 pt-10 mt-10">
                     <h3 className="text-xl font-bold tracking-[0.3em] uppercase text-white text-center mb-8">Settlement</h3>
                     {paymentMethod ? (
                        <div className="text-center p-8 bg-white text-base-100 rounded-sm">
                           <h4 className="text-sm font-black tracking-widest uppercase mb-2">Payment Acknowledged</h4>
                           <p className="text-xs font-light italic">Thank you for dining with us at Kargil Kitchen.</p>
                        </div>
                     ) : (
                         <div className="flex flex-col md:flex-row gap-4">
                            <button onClick={() => setPaymentMethod('later')} className="flex-1 border border-white/40 text-white py-4 rounded-sm font-bold text-xs tracking-widest uppercase hover:bg-white/10 transition-colors flex items-center justify-center gap-3">
                               <ClockIcon className="w-5 h-5"/> Pay at Counter
                            </button>
                            <button onClick={() => setPaymentMethod('online')} className="flex-1 bg-white text-base-100 py-4 rounded-sm font-black text-xs tracking-widest uppercase hover:bg-white/90 transition-colors flex items-center justify-center gap-3">
                               <CreditCardIcon className="w-5 h-5"/> Online Payment
                            </button>
                         </div>
                     )}
                </div>
            )}
        </div>
    );
};

export default OrderStatusView;