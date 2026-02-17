
import React, { useState, useEffect } from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import Header from './components/Header';
import Menu from './components/Menu';
import CartView from './components/CartView';
import OrderStatusView from './components/OrderStatusView';
import KitchenDashboard from './components/KitchenDashboard';
import { InformationCircleIcon, XIcon, ShoppingCartIcon, ChefHatIcon, UtensilsIcon } from './components/icons/Icons';

const Notification: React.FC = () => {
    const { state, dispatch } = useAppContext();

    if (!state.notification) {
        return null;
    }

    return (
        <div className="fixed top-8 right-4 w-full max-w-sm z-[100]">
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

const FloatingNav: React.FC<{ setView: (v: any) => void, currentView: string }> = ({ setView, currentView }) => {
    const { state } = useAppContext();
    const cartItemCount = state.cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex items-center bg-base-100/80 backdrop-blur-xl border border-white/10 px-2 py-2 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.5)] scale-110 md:scale-125 transition-transform duration-500 hover:scale-[1.15] md:hover:scale-[1.3]">
            <button 
                onClick={() => { setView('menu'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`p-3 rounded-full transition-all ${currentView === 'menu' ? 'bg-white text-base-100 shadow-xl' : 'text-white/50 hover:text-white'}`}
                title="View Menu"
            >
                <UtensilsIcon className="w-5 h-5" />
            </button>
            
            <div className="h-6 w-[1px] bg-white/10 mx-1"></div>

            <button 
                onClick={() => setView('cart')}
                className={`p-3 rounded-full transition-all relative ${currentView === 'cart' ? 'bg-white text-base-100 shadow-xl' : 'text-white/50 hover:text-white'}`}
                title="Review Cart"
            >
                <ShoppingCartIcon className="w-5 h-5" />
                {cartItemCount > 0 && (
                    <span className="absolute top-1 right-1 bg-white text-base-100 text-[8px] font-black rounded-full h-4 w-4 flex items-center justify-center border border-base-100">
                        {cartItemCount}
                    </span>
                )}
            </button>

            <div className="h-6 w-[1px] bg-white/10 mx-1"></div>

            <button 
                onClick={() => setView('kitchen')}
                className={`p-3 rounded-full transition-all ${currentView === 'kitchen' ? 'bg-white text-base-100 shadow-xl' : 'text-white/50 hover:text-white'}`}
                title="Kitchen View"
            >
                <ChefHatIcon className="w-5 h-5" />
            </button>
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
                 <div className="text-white text-[10px] tracking-[0.5em] uppercase font-light animate-pulse">Initializing Excellence...</div>
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
        <div className="min-h-screen bg-base-100 font-sans selection:bg-white selection:text-emerald-900 pb-32">
            <Notification />
            <Header />
            <FloatingNav setView={setView} currentView={view} />
            
            {/* Minimal padding since the header is no longer fixed */}
            <main className="p-4 pt-12 max-w-7xl mx-auto transition-all duration-700 ease-in-out">
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
