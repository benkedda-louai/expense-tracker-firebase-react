import './expense_tracker.css'
import {useAddTransaction} from '../../hooks/useAddTransaction'
import {useGetTransactions} from '../../hooks/useGetTransactions'
import {useGetUserInfo} from '../../hooks/useGetUserInfo'
import {useState} from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../../config/firebase-config'
import { useNavigate } from 'react-router-dom'
export const Expense_tracker = () => {
  const { AddTransaction } = useAddTransaction();
  const { transactions, transactionTotals } = useGetTransactions();
  const { name, profilePhoto } = useGetUserInfo();
  const navigate = useNavigate();
  const [description,setDescription]=useState("");
  const [transactionAmount,setTransactionAmount]=useState(0);
  const [transactionType, setTransactionType] = useState("expense");
  
  const { balance, income, expense } = transactionTotals;
  const onSubmit = async (e) => {
    e.preventDefault();
    AddTransaction({
      description: description,
      transactionAmount: transactionAmount,
      transactionType,
    });
    setDescription("");
    setTransactionAmount("")
  }
  const UserSignOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div className="m-0 md:mx-auto w-[80%] p-5">
        <div className="">
          <h1 className="text-3xl font-extralight mb-5">
            {name} expense_tracker
          </h1>
          <div className="">
            <h3>your balance</h3>
            {balance >= 0 ? (
              <h2 style={{ color: balance >= 0 ? "green" : "red" }}>
                $ {balance}
              </h2>
            ) : (
              <h2 style={{ color: balance >= 0 ? "green" : "red" }}>
                -$ {balance * -1}
              </h2>
            )}
            <div className="">
              <div className="">
                <h4>Income</h4>
                <p>$ {income}</p>
              </div>
              <div className="">
                <h4>Expenses</h4>
                <p>$ {expense}</p>
              </div>
            </div>
            <form
              className="flex flex-col md:flex-row justify-start items-center gap-10 my-5"
              onSubmit={onSubmit}
            >
              <input
                type="text"
                className="outline-none border border-solid border-blue-500 rounded-md p-1"
                placeholder="Description"
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type="number"
                className="outline-none border border-solid border-blue-500 rounded-md p-1"
                placeholder="Amount"
                value={transactionAmount}
                required
                onChange={(e) => setTransactionAmount(e.target.value)}
              />
              <div>
                <input
                  type="radio"
                  id="expense"
                  value={"expense"}
                  required
                  checked={transactionType === "expense"}
                  onChange={(e) => setTransactionType(e.target.value)}
                />
                <label htmlFor="expense" className="ml-1">
                  expense
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="income"
                  value={"income"}
                  required
                  checked={transactionType === "income"}
                  onChange={(e) => setTransactionType(e.target.value)}
                />
                <label htmlFor="income" className="ml-1">
                  income
                </label>
              </div>
              <button
                type="submit"
                className="border border-blue-700 border-solid p-1 rounded-md bg-blue-700 text-white block mx-5"
              >
                Add Transaction
              </button>
            </form>
          </div>
        </div>
      </div>
      {profilePhoto && (
        <div className="absolute top-6 right-1 md:right-52 text-center flex flex-row-reverse md:flex-col gap-5 justify-center items-center">
          <img src={profilePhoto} alt="" className="rounded-full w-10 h-10" />
          <button
            type="button"
            className="border border-solid p-2 bg-blue-700 text-white rounded-md"
            onClick={UserSignOut}
          >
            SignOut
          </button>
        </div>
      )}
      <div className="text-left p-5 border w-[80%] mx-auto rounded-md bg-black text-white ">
        <h3 className="p-1 text-3xl">Transactions :</h3>
        <ul>
          {transactions.map((transaction) => {
            const { description, transactionAmount, transactionType } =
              transaction;
            return (
              <li key={transaction} className="p-5 list-disc">
                <h4 className="mb-3">{description}</h4>
                <p>
                  ${transactionAmount} •{" "}
                  <label
                    style={{
                      color: transactionType === "expense" ? "red" : "green",
                    }}
                  >
                    {transactionType}
                  </label>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );


  }