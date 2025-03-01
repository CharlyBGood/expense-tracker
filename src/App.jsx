import { GlobalProvider } from "./contexts/GlobalState";
import { Header } from "./components/Header";
import { Balance } from "./components/Balance";
import { TransactionForm } from "./components/transactions/TransactionForm";
import { TransactionList } from "./components/transactions/TransactionList";
import { IncomeExpenses } from "./components/IncomeExpenses";
import { ExpenseChart } from "./components/ExpenseChart";
import './App.css'

function App() {
  return (
    <GlobalProvider>
      <div className="bg-neutral-950 text-white flex justify-center items-center h-full">
        <div className="bg-neutral-800 p-10 rounded-md">
          <Header />
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex-1">
              <IncomeExpenses />
              <Balance />
              <TransactionForm />
            </div>
            <div className="flex-1 flex flex-col">
              <ExpenseChart />
              <TransactionList />
            </div>
          </div>
        </div>
      </div>
    </GlobalProvider>
  );
}

export default App;
