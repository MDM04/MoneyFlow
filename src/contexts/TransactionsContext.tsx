import { createContext, useEffect, useState, type ReactNode, } from "react";

interface TrasactionsProps {
    id: number;
    description: string;
    type: 'income' | 'outcome';
    price: number;
    category: string;
    createdAt: string;
}

interface TransactionsContextType {
    transactions: TrasactionsProps[]
}

interface TransactionsProviderProps {
    children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionsContextType)

export function TransactionProvider({ children }: TransactionsProviderProps) {

    const [transactions, setTransactions] = useState<TrasactionsProps[]>([])
        async function loadTranactions() {
            const response = await fetch('http://localhost:3000/transactions')
            const data = await response.json()
    
            setTransactions(data)
        }
    
        useEffect(() => {
            loadTranactions()
        }, [])
    
    return (
        <TransactionsContext.Provider value={{ transactions }}>
            {children}
        </TransactionsContext.Provider>
    )
}