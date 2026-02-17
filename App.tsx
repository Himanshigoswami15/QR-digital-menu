
import React, { useState, useEffect } from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import Header from './components/Header';
import Menu from './components/Menu';
import CartView from './components/CartView';
import OrderStatusView from './components/OrderStatusView';
import KitchenDashboard from './components/KitchenDashboard';
import { InformationCircleIcon, XIcon } from './components/icons/Icons';

const Notification: React.FC = () => {
    const { state, dispatch } = useAppContext();

    if (!state.notification) {
        return null;
    }

    return (
        <div className="fixed top-32 right-4 w-full max-w-sm z-[100]">
            <div className="bg-secondary text-white p-4 rounded-sm border border-white/10 shadow-2xl flex items-start gap-3 animate-fade-in-down">
                <InformationCircleIcon className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <p className="flex-grow text-xs font-medium tracking-wide leading-relaxed">{state.notification}</p>
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
    const [view, setView] = useState<'menu' | 'cart' | 'status' | 'kitchen'>('menu');

    useEffect(() => {
        dispatch({ type: 'SET_TABLE', payload: 12 });
    }, [dispatch]);

    useEffect(() => {
        if (state.currentOrderId && view !== 'kitchen' && view !== 'cart') {
            setView('status');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.currentOrderId]);
    
    useEffect(() => {
        if (state.notification) {
            const timer = setTimeout(() => {
                dispatch({ type: 'HIDE_NOTIFICATION' });
            }, 5000); 
            return () => clearTimeout(timer);
        }
    }, [state.notification, dispatch]);
    
    if (state.tableNumber === null) {
        return (
             <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
                 <div className="text-white text-[10px] tracking-[0.5em] uppercase font-light animate-pulse">Initializing Kitchen...</div>
             </div>
        );
    }

    const renderContent = () => {
        switch(view) {
            case 'menu': return <Menu />;
            case 'cart': return <CartView onBackToMenu={() => setView('menu')} />;
            case 'status': return <OrderStatusView />;
            case 'kitchen': return <KitchenDashboard />;
            default: return <Menu />;
        }
    }

    return (
        <div className="min-h-screen bg-base-100 font-sans selection:bg-white selection:text-emerald-900">
            <Notification />
            <Header 
              onCartClick={() => setView('cart')} 
              onMenuClick={() => setView('menu')}
              onKitchenClick={() => setView('kitchen')}
            />
            {/* Increased padding-top for the taller branding header */}
            <main className="p-4 pt-36 md:pt-48 max-w-7xl mx-auto">
                {renderContent()}
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