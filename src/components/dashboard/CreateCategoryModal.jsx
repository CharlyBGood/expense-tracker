"use client"

import { useState, useRef, useEffect } from "react"

const colorOptions = [
  "#6366F1", // Indigo
  "#EC4899", // Pink
  "#8B5CF6", // Purple
  "#EF4444", // Red
  "#F59E0B", // Amber
  "#10B981", // Emerald
  "#3B82F6", // Blue
  "#14B8A6", // Teal
]

export function CreateCategoryModal({ isOpen, onClose, onCreate }) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [targetAmount, setTargetAmount] = useState("")
  const [color, setColor] = useState(colorOptions[0])
  const modalRef = useRef(null)
  const nameInputRef = useRef(null)

  useEffect(() => {
    if (isOpen && nameInputRef.current) {
      nameInputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose()
      }
    }

    function handleEscapeKey(event) {
      if (event.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("keydown", handleEscapeKey)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscapeKey)
    }
  }, [isOpen, onClose])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!name.trim()) return

    onCreate({
      name: name.trim(),
      description: description.trim(),
      targetAmount: targetAmount ? Number.parseFloat(targetAmount) : null,
      color,
    })

    // Reset form
    setName("")
    setDescription("")
    setTargetAmount("")
    setColor(colorOptions[0])
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        className="bg-neutral-800 rounded-lg shadow-lg max-w-md w-full p-6 animate-in fade-in zoom-in duration-200"
      >
        <h3 className="text-xl font-bold mb-4">Crear Nuevo Objetivo</h3>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="category-name" className="block text-sm font-medium mb-1">
                Nombre *
              </label>
              <input
                ref={nameInputRef}
                id="category-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 bg-neutral-700 rounded-md"
                required
                placeholder="Ej: Vacaciones, Ahorro para casa..."
              />
            </div>

            <div>
              <label htmlFor="category-description" className="block text-sm font-medium mb-1">
                Descripción
              </label>
              <textarea
                id="category-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 bg-neutral-700 rounded-md resize-none"
                rows={3}
                placeholder="Describe tu objetivo financiero..."
              />
            </div>

            <div>
              <label htmlFor="category-target" className="block text-sm font-medium mb-1">
                Monto Objetivo
              </label>
              <input
                id="category-target"
                type="number"
                step="0.01"
                min="0"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                className="w-full p-3 bg-neutral-700 rounded-md"
                placeholder="Ej: 1000.00"
              />
              <p className="text-xs text-neutral-400 mt-1">Deja en blanco si no tienes un monto específico</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Color</label>
              <div className="flex flex-wrap gap-2">
                {colorOptions.map((colorOption) => (
                  <button
                    key={colorOption}
                    type="button"
                    className={`w-8 h-8 rounded-full ${color === colorOption ? "ring-2 ring-white ring-offset-2 ring-offset-neutral-800" : ""}`}
                    style={{ backgroundColor: colorOption }}
                    onClick={() => setColor(colorOption)}
                    aria-label={`Select color ${colorOption}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-md transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-app bg-indigo-600 hover:bg-indigo-700 text-app"
              disabled={!name.trim()}
            >
              Crear Objetivo
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

