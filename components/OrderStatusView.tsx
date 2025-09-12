
import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { OrderStatus } from '../types';
import { CheckCircleIcon, CreditCardIcon, ClockIcon } from './icons/Icons';

const statusMap = {
    [OrderStatus.Pending]: { text: 'Order Sent', description: 'Your order has been sent to the kitchen.', index: 0 },
    [OrderStatus.Preparing]: { text: 'Preparing', description: 'The kitchen is preparing your delicious meal.', index: 1 },
    [OrderStatus.Ready]: { text: 'Ready', description: 'Your order is ready and on its way!', index: 2 },
    [OrderStatus.Served]: { text: 'Served', description: 'Enjoy your meal!', index: 3 },
};

const OrderStatusView: React.FC = () => {
    const { state, dispatch } = useAppContext();
    const [paymentMethod, setPaymentMethod] = useState<'later' | 'online' | null>(null);
    const order = state.order;

    useEffect(() => {
        if (order && order.status !== OrderStatus.Served) {
            const statuses = [OrderStatus.Preparing, OrderStatus.Ready, OrderStatus.Served];
            let currentIndex = statuses.indexOf(order.status);
            
            const interval = setInterval(() => {
                currentIndex++;
                if (currentIndex < statuses.length) {
                    dispatch({ type: 'UPDATE_ORDER_STATUS', payload: statuses[currentIndex] });
                } else {
                    clearInterval(interval);
                }
            }, 7000); // 7 seconds per status change for simulation

            return () => clearInterval(interval);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [order?.status, dispatch]);

    if (!order) {
        return <div className="text-center text-gray-400">No active order found.</div>;
    }

    const currentStatusIndex = statusMap[order.status].index;
    const isOrderComplete = order.status === OrderStatus.Served;

    return (
        <div className="bg-base-200 p-6 rounded-xl shadow-2xl">
            <h2 className="text-3xl font-extrabold text-white text-center mb-2">Your Order Status</h2>
            <p className="text-center text-gray-400 mb-8">Order ID: {order.id}</p>

            <div className="flex justify-between items-start mb-10 px-4">
                {Object.values(OrderStatus).map((status) => {
                    const statusInfo = statusMap[status];
                    const isCompleted = statusInfo.index <= currentStatusIndex;
                    const isCurrent = statusInfo.index === currentStatusIndex;

                    return (
                        <React.Fragment key={status}>
                            <div className="flex flex-col items-center text-center w-24">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 ${isCompleted ? 'bg-accent border-accent' : 'bg-base-300 border-gray-600'} transition-all duration-500`}>
                                    {isCompleted ? <CheckCircleIcon className="w-8 h-8 text-white"/> : <div className={`w-4 h-4 rounded-full ${isCurrent ? 'bg-primary animate-pulse' : 'bg-gray-500'}`}></div> }
                                </div>
                                <p className={`mt-2 font-bold ${isCompleted ? 'text-white' : 'text-gray-500'}`}>{statusInfo.text}</p>
                            </div>
                            {statusInfo.index < 3 && <div className={`flex-1 h-1 mt-6 ${statusInfo.index < currentStatusIndex ? 'bg-accent' : 'bg-gray-600'}`}></div>}
                        </React.Fragment>
                    );
                })}
            </div>
            
            <div className="bg-base-300 p-6 rounded-lg text-center mb-8">
                <h3 className="text-2xl font-bold text-primary">{statusMap[order.status].text}</h3>
                <p className="text-gray-300 mt-1">{statusMap[order.status].description}</p>
            </div>
            
            {isOrderComplete && (
                <div className="border-t border-base-300 pt-6 mt-6">
                     <h3 className="text-2xl font-bold text-white text-center mb-4">Payment</h3>
                     {paymentMethod ? (
                        <div className="text-center bg-base-300 p-6 rounded-lg">
                           <h4 className="text-xl font-bold text-success">Thank You!</h4>
                           {paymentMethod === 'later' && <p>Please pay at the counter when you're ready to leave.</p>}
                           {paymentMethod === 'online' && <p>Your payment has been processed. We appreciate your business!</p>}
                        </div>
                     ) : (
                         <div className="flex flex-col md:flex-row gap-4">
                            <button onClick={() => setPaymentMethod('later')} className="flex-1 bg-secondary text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-800 transition-colors flex items-center justify-center gap-2">
                               <ClockIcon className="w-6 h-6"/> Pay Later
                            </button>
                            <button onClick={() => setPaymentMethod('online')} className="flex-1 bg-primary text-white py-3 rounded-lg font-bold text-lg hover:bg-primary-focus transition-colors flex items-center justify-center gap-2">
                               <CreditCardIcon className="w-6 h-6"/> Pay Online Now
                            </button>
                         </div>
                     )}
                </div>
            )}
        </div>
    );
};

export default OrderStatusView;
