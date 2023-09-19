import { useEffect, useState } from "react"
import { query,collection, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase-config";
import {useGetUserInfo} from './useGetUserInfo' 
export const useGetTransactions = () => {
    let unsubscribe;
    const [transactions, setTransactions] = useState([]);
    const [transactionTotals, setTransactionTotals] = useState({
        balance: 0.0,
        income: 0.0,
        expense: 0.0,
    });
    const transactionCollectionRef = collection(db, "transactions");
    const {userId} = useGetUserInfo();
    const getTransactions = async () => {
        try {
            const queryTransactions = query(
                transactionCollectionRef,
                where("userId", "==", userId),
                orderBy("createdAt")
            );
            unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
                let docs = [];
                let totalIncome = 0;
                let totalExpense = 0;
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    const id = doc.id;

                    docs.push({ ...data, id });
                    if (data.transactionType === "expense") {
                        totalExpense += Number(data.transactionAmount);
                    } else {
                        totalIncome += Number(data.transactionAmount);
                    }
                })
                setTransactions(docs);
                let balance = totalIncome - totalExpense;
                setTransactionTotals({
                    balance,
                    expense: totalExpense,
                    income: totalIncome,
                })
            });
        } catch (error) {
            console.error(error)
        }
        return  () => unsubscribe();
    };
    useEffect(() => {
        getTransactions();
    }, []);
    return { transactions, transactionTotals }
}