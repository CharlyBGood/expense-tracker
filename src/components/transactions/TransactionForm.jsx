"use client"

import { useState } from "react"
import { useGlobalState } from "../../contexts/GlobalState"

export function TransactionForm() {
  const { addTransaction } = useGlobalState()

  const [description, setDescription] = useState("")
  const [amount, setAmount] = useState("")
  const [isIncome, setIsIncome] = useState(false)
  const [isExpense, setIsExpense] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()

    let finalAmount = Number.parseFloat(amount)
    if (isExpense) {
      finalAmount = -Math.abs(finalAmount)
    } else if (isIncome) {
      finalAmount = Math.abs(finalAmount)
    }

    addTransaction({
      id: window.crypto.randomUUID(),
      description,
      amount: finalAmount,
    })

    setDescription("")
    setAmount("")
    setIsIncome(false)
    setIsExpense(false)
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="flex items-center justify-between mb-4 gap-2">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="ingreso"
              className="w-5 h-5 cursor-pointer accent-green-500"
              id="Ingreso"
              checked={isIncome}
              onChange={(e) => {
                setIsIncome(e.target.checked)
                if (e.target.checked) setIsExpense(false)
              }}
            />
            <label htmlFor="Ingreso" className="text-lg cursor-pointer">
              Ingreso
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              className="w-5 h-5 cursor-pointer accent-red-500"
              name="egreso"
              id="Egreso"
              checked={isExpense}
              onChange={(e) => {
                setIsExpense(e.target.checked)
                if (e.target.checked) setIsIncome(false)
              }}
            />
            <label htmlFor="Egreso" className="text-lg cursor-pointer">
              Egreso
            </label>
          </div>
        </div>
        <input
          id="amount"
          className="bg-zinc-600 text-white px-4 py-3 rounded-lg block mb-3 w-full text-lg"
          type="number"
          step="0.01"
          placeholder="Monto: ej: 0.00"
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
        />
        <input
          id="description"
          type="text"
          placeholder="Descripción"
          onChange={(e) => setDescription(e.target.value)}
          className="bg-zinc-600 text-white px-4 py-3 rounded-lg block mb-4 w-full text-lg"
          value={description}
        />
        <button
          className="bg-indigo-700 hover:bg-indigo-600 text-white px-4 py-3 rounded-lg block w-full text-lg font-medium transition-colors"
          disabled={!description || !amount || (!isIncome && !isExpense)}
        >
          Agregar
        </button>
      </form>
    </div>
  )
}

