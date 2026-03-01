
import React, { useState, useEffect, useRef } from 'react';
import { MENU_ITEMS } from '../constants';
import MenuItem from './MenuItem';
import type { Dish } from '../types';

const Menu: React.FC = () => {
    const categories: Dish['category'][] = [
        'On The Run', 
        'Chaat House', 
        'Tandoori Starters', 
        'Chinese', 
        'Shahi Sweet Vegetable', 
        'Paneer Main Course',
        'Veg Main Course', 
        'Dal',
        'Basmati Rice', 
        'Indian Bread', 
        'Salad & Raita'
    ];

    const [activeCategory, setActiveCategory] = useState<string>(categories[0]);
    const navRef = useRef<HTMLDivElement>(null);
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        observer.current = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const categoryName = entry.target.getAttribute('data-category');
                    if (categoryName) {
                        setActiveCategory(categoryName);
                        const navButton = document.querySelector(`[data-nav-item="${categoryName}"]`);
                        if (navButton && navRef.current) {
                            navButton.scrollIntoView({
                                behavior: 'smooth',
                                block: 'nearest',
                                inline: 'center'
                            });
                        }
                    }
                }
            });
        }, {
            rootMargin: '-20% 0% -70% 0%',
            threshold: 0
        });

        categories.forEach(category => {
            const sectionId = category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
            const el = document.getElementById(sectionId);
            if (el) observer.current?.observe(el);
        });

        return () => observer.current?.disconnect();
    }, []);

    const scrollToSection = (category: string) => {
        const id = category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
        const element = document.getElementById(id);
        if (element) {
            const headerOffset = 120;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="relative py-12">
            {/* Sticky Section Navigation */}
            <nav className="sticky top-6 z-40 mb-16 max-w-5xl mx-auto">
                <div 
                    ref={navRef}
                    className="bg-white/[0.08] backdrop-blur-3xl border border-white/10 p-2 rounded-full flex items-center gap-1 overflow-x-auto no-scrollbar shadow-[0_20px_50px_rgba(0,0,0,0.4)] scroll-smooth"
                >
                    {categories.map(category => {
                        const isActive = activeCategory === category;
                        return (
                            <button
                                key={category}
                                data-nav-item={category}
                                onClick={() => scrollToSection(category)}
                                className={`relative px-5 py-2.5 rounded-full text-[10px] md:text-[11px] tracking-wider uppercase font-bold transition-all whitespace-nowrap ${
                                    isActive ? 'text-base-100 bg-white' : 'text-white/40 hover:text-white/70'
                                }`}
                            >
                                {category}
                            </button>
                        );
                    })}
                </div>
            </nav>

            <div className="space-y-32 pb-32">
                {categories.map((category, index) => {
                    const items = MENU_ITEMS.filter(item => item.category === category);
                    if (items.length === 0) return null;
                    const sectionId = category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
                    
                    return (
                        <section 
                            key={category} 
                            id={sectionId} 
                            data-category={category}
                            className="scroll-mt-36"
                        >
                            <div className="flex flex-col items-center mb-16 text-center">
                                <div className="flex items-center gap-4 mb-6 opacity-30">
                                    <div className="w-12 h-[1px] bg-white"></div>
                                    <span className="text-[10px] md:text-[12px] tracking-[0.6em] uppercase font-black italic">Section {index + 1}</span>
                                    <div className="w-12 h-[1px] bg-white"></div>
                                </div>
                                <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif italic text-white mb-6 tracking-tight">{category}</h2>
                                <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                            </div>
                            
                            {/* Responsive Grid for all devices */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
                                {items.map((dish: Dish) => (
                                    <MenuItem key={dish.id} dish={dish} />
                                ))}
                            </div>
                        </section>
                    );
                })}
            </div>
            
            <style>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
};

export default Menu;
