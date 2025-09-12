
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

    useEffect(() => {
        // Set a default table number since QR code scanning is removed.
        // This allows the app to load without needing a URL parameter.
        dispatch({ type: 'SET_TABLE', payload: 12 });
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
    
    if (state.tableNumber === null) {
        return (
             <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
                 <div className="text-white text-xl">Loading...</div>
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
