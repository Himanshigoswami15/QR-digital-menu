
import React, { useState, useEffect } from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import Header from './components/Header';
import Menu from './components/Menu';
import CartView from './components/CartView';
import { InformationCircleIcon, XIcon, ShoppingCartIcon } from './components/icons/Icons';

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

const CornerCart: React.FC<{ setView: (v: 'menu' | 'cart') => void, currentView: string }> = ({ setView, currentView }) => {
    const { state } = useAppContext();
    const cartItemCount = state.cart.reduce((total, item) => total + item.quantity, 0);

    if (currentView === 'cart') return null;

    return (
        <button 
            onClick={() => setView('cart')}
            className="fixed bottom-6 right-6 z-[100] flex items-center justify-center bg-white text-base-100 p-4 rounded-full shadow-[0_15px_50px_rgba(0,0,0,0.6)] hover:scale-110 transition-all duration-300 group active:scale-95"
            title="View Cart"
        >
            <ShoppingCartIcon className="w-6 h-6" />
            {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-base-100 text-[10px] font-black rounded-full h-5 w-5 flex items-center justify-center border-2 border-base-100">
                    {cartItemCount}
                </span>
            )}
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap ml-0 group-hover:ml-3 text-[10px] uppercase font-bold tracking-widest">
                Review Order
            </span>
        </button>
    );
};

const AppContainer: React.FC = () => {
    const { state, dispatch } = useAppContext();
    const [view, setView] = useState<'menu' | 'cart'>('menu');

    useEffect(() => {
        dispatch({ type: 'SET_TABLE', payload: 12 });
    }, [dispatch]);

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
                 <div className="text-white text-[10px] tracking-[0.5em] uppercase font-light animate-pulse font-sans">Initializing Kargil Kitchen...</div>
             </div>
        );
    }

    const renderContent = () => {
        switch(view) {
            case 'menu': return <Menu />;
            case 'cart': return <CartView onBackToMenu={() => setView('menu')} />;
            default: return <Menu />;
        }
    }

    return (
        <div className="min-h-screen bg-base-100 font-sans selection:bg-white selection:text-emerald-900 pb-20">
            <Notification />
            {view === 'menu' && <Header />}
            <CornerCart setView={setView} currentView={view} />
            
            <main className={`p-4 max-w-7xl mx-auto transition-all duration-700 ease-in-out ${view === 'menu' ? 'pt-12' : 'pt-24'}`}>
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
