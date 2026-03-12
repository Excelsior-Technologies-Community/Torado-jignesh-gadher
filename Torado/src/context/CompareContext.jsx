import { createContext, useContext, useEffect, useState } from "react";
import React from "react";  

const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
    const [compareItems, setCompareItems] = useState(() => {
        const savedCompare = localStorage.getItem("compare");
        return savedCompare ? JSON.parse(savedCompare) : [];
    });

    useEffect(() => {
        localStorage.setItem("compare", JSON.stringify(compareItems));
    }, [compareItems]);

    const addToCompare = (product) => {
        setCompareItems((prev) => {
            const isExist = prev.find((item) => item.id === product.id);
            if (isExist) return prev;
            // Limit to 4 products for comparison
            if (prev.length >= 4) {
                alert("You can only compare up to 4 products.");
                return prev;
            }
            return [...prev, product];
        });
    };

    const removeFromCompare = (productId) => {
        setCompareItems((prev) => prev.filter((item) => item.id !== productId));
    };

    const isInCompare = (productId) => {
        return compareItems.some((item) => item.id === productId);
    };

    return (
        <CompareContext.Provider value={{ compareItems, addToCompare, removeFromCompare, isInCompare }}>
            {children}
        </CompareContext.Provider>
    );
};

export const useCompare = () => {
    const context = useContext(CompareContext);
    if (!context) {
        throw new Error("useCompare must be used within a CompareProvider");
    }
    return context;
};
