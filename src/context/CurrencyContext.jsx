import { createContext, useContext, useEffect, useState } from 'react';
import React from 'react';

const CurrencyContext = createContext();

export const useCurrency = () => {
    const context = useContext(CurrencyContext);
    if (!context) {
        throw new Error('useCurrency must be used within a CurrencyProvider');
    }
    return context;
};

export const CurrencyProvider = ({ children }) => {
    // Default currency from localStorage or INR
    const [currency, setCurrency] = useState(() => {
        return localStorage.getItem('app_currency') || 'INR';
    });

    // Simple fixed exchange rates (Base: INR)
    const exchangeRates = {
        INR: 1,
        USD: 0.012, // 1 INR = 0.012 USD (approx 1/83)
        EUR: 0.011, // 1 INR = 0.011 EUR (approx 1/90)
    };

    const symbols = {
        INR: '₹',
        USD: '$',
        EUR: '€',
    };

    useEffect(() => {
        localStorage.setItem('app_currency', currency);
    }, [currency]);

    // Format price based on current currency
    const formatPrice = (priceInINR) => {
        if (!priceInINR && priceInINR !== 0) return '';

        const rate = exchangeRates[currency];
        const converted = priceInINR * rate;
        const symbol = symbols[currency];

        // Format rules: USD/EUR use 2 decimals, INR usually whole numbers or 2
        const formatted = currency === 'INR'
            ? Math.round(converted).toLocaleString('en-IN')
            : converted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        return `${symbol}${formatted}`;
    };

    // Just get the symbol
    const getSymbol = () => symbols[currency];

    // Just get the converted number
    const convertPrice = (priceInINR) => {
        return priceInINR * exchangeRates[currency];
    };

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, getSymbol, convertPrice }}>
            {children}
        </CurrencyContext.Provider>
    );
};
