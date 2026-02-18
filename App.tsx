
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
        <div className="fixed top-4 right-4 left-4 md:left-auto md:w-96 z-[100]">
            <div className="bg-secondary text-white p-4 rounded-xl border border-white/10 shadow-2xl flex items-start gap-3 animate-fade-in-down">
                <InformationCircleIcon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="flex-grow text-[11px] font-medium tracking-wide leading-relaxed">{state.notification}</p>
                <button
                    onClick={() => dispatch({ type: 'HIDE_NOTIFICATION' })}
                    className="p-1 rounded-full hover:bg-white/20 transition-colors"
                    aria-label="Close notification"
                >
                    <XIcon className="w-4 h-4" />
                </button>
            </div>
            <style>{`
                @keyframes fade-in-down {
                    0% {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-down {
                    animation: fade-in-down 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
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
            className="fixed bottom-6 right-6 z-[100] flex items-center justify-center bg-white text-base-100 h-16 w-16 rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.6)] active:scale-90 hover:scale-105 transition-all duration-300"
            title="View Cart"
        >
            <ShoppingCartIcon className="w-7 h-7" />
            {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-black rounded-full h-6 w-6 flex items-center justify-center border-2 border-base-100 animate-bounce">
                    {cartItemCount}
                </span>
            )}
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
            }, 4000); 
            return () => clearTimeout(timer);
        }
    }, [state.notification, dispatch]);
    
    if (state.tableNumber === null) {
        return (
             <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
                 <div className="text-white text-[12px] tracking-[0.5em] uppercase font-light animate-pulse font-sans">Initializing Kargil Kitchen...</div>
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
        <div className="min-h-screen bg-base-100 relative selection:bg-white selection:text-base-100">
            <Notification />
            {view === 'menu' && <Header />}
            <CornerCart setView={setView} currentView={view} />
            
            <main className={`transition-all duration-700 ease-in-out ${view === 'menu' ? 'pt-0' : 'pt-24'}`}>
                <div className="container mx-auto px-4 md:px-8 max-w-7xl">
                    {renderContent()}
                </div>
            </main>
            
            <footer className="py-20 flex flex-col items-center justify-center opacity-20 gap-4 pointer-events-none">
                <div className="w-12 h-[1px] bg-white"></div>
                <p className="text-[10px] tracking-[0.6em] uppercase font-bold">Kargil Kitchen</p>
                <p className="text-[8px] tracking-[0.3em] uppercase">Est. 2024</p>
            </footer>
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
