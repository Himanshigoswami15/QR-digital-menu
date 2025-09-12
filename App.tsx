
import React, { useState, useEffect } from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import Header from './components/Header';
import Menu from './components/Menu';
import CartView from './components/CartView';
import OrderStatusView from './components/OrderStatusView';
import { InformationCircleIcon, XIcon } from './components/icons/Icons';

const Notification: React.FC = () => {
    const { state, dispatch } = useAppContext();

    if (!state.notification) {
        return null;
    }

    return (
        <div className="fixed top-20 right-4 w-full max-w-sm z-[100]">
            <div className="bg-secondary text-white p-4 rounded-lg shadow-2xl flex items-start gap-3 animate-fade-in-down">
                <InformationCircleIcon className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <p className="flex-grow">{state.notification}</p>
                <button
                    onClick={() => dispatch({ type: 'HIDE_NOTIFICATION' })}
                    className="p-1 rounded-full hover:bg-white/20 transition-colors"
                    aria-label="Close notification"
                >
                    <XIcon className="w-5 h-5" />
                </button>
            </div>
            <style>{`
                @keyframes fade-in-down {
                    0% {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-down {
                    animation: fade-in-down 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    );
};


const AppContainer: React.FC = () => {
    const { state, dispatch } = useAppContext();
    const [view, setView] = useState<'menu' | 'cart' | 'status'>('menu');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        try {
            const params = new URLSearchParams(window.location.search);
            const tableId = params.get('table');
            if (tableId && !isNaN(parseInt(tableId))) {
                dispatch({ type: 'SET_TABLE', payload: parseInt(tableId) });
            } else {
                setError('Invalid or missing table number. Please scan a valid QR code from your table.');
            }
        } catch (e) {
            setError('Could not read table information. Please ensure you are using a valid link.');
        }
    }, [dispatch]);

    useEffect(() => {
        if (state.order) {
            setView('status');
        }
    }, [state.order]);
    
    useEffect(() => {
        if (state.notification) {
            const timer = setTimeout(() => {
                dispatch({ type: 'HIDE_NOTIFICATION' });
            }, 5000); // Auto-hide after 5 seconds
            return () => clearTimeout(timer);
        }
    }, [state.notification, dispatch]);

    if (error) {
        return (
            <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
                <div className="bg-base-200 p-8 rounded-lg shadow-2xl max-w-md text-center">
                    <h1 className="text-2xl font-bold text-error mb-4">Oops!</h1>
                    <p className="text-lg text-gray-300">{error}</p>
                </div>
            </div>
        );
    }
    
    if (state.tableNumber === null) {
        return (
             <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
                 <div className="text-white text-xl">Loading table information...</div>
             </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-100 font-sans">
            <Notification />
            <Header onCartClick={() => setView('cart')} onMenuClick={() => setView('menu')} />
            <main className="p-4 pt-20 max-w-4xl mx-auto">
                {view === 'menu' && <Menu />}
                {view === 'cart' && <CartView onBackToMenu={() => setView('menu')} />}
                {view === 'status' && <OrderStatusView />}
            </main>
        </div>
    );
};

const App: React.FC = () => {
    return (
        <AppProvider>
            <AppContainer />
        </AppProvider>
    );
}

export default App;
