
import * as React from "react"
import { ChevronDown, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface Option {
  value: string
  label: string
  icon?: React.ComponentType<{ className?: string }>
}

interface CustomSelectProps {
  options: Option[]
  value: string
  onValueChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function CustomSelect({ options, value, onValueChange, placeholder, className }: CustomSelectProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const selectedOption = options.find(option => option.value === value)

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 text-sm bg-white/80 backdrop-blur-sm border border-purple-200/60 rounded-lg hover:bg-white hover:border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all duration-200"
      >
        <div className="flex items-center space-x-2">
          {selectedOption?.icon && (
            <selectedOption.icon className="w-4 h-4 text-purple-600" />
          )}
          <span className={cn(
            "font-medium",
            selectedOption ? "text-gray-900" : "text-gray-500"
          )}>
            {selectedOption?.label || placeholder}
          </span>
        </div>
        <ChevronDown className={cn(
          "w-4 h-4 text-gray-400 transition-transform duration-200",
          isOpen && "rotate-180"
        )} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 right-0 mt-1 z-20 bg-white/95 backdrop-blur-xl border border-purple-200/60 rounded-lg shadow-xl shadow-purple-500/10 overflow-hidden">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onValueChange(option.value)
                  setIsOpen(false)
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 text-sm hover:bg-purple-50/80 transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg"
              >
                <div className="flex items-center space-x-2">
                  {option.icon && (
                    <option.icon className="w-4 h-4 text-purple-600" />
                  )}
                  <span className="font-medium text-gray-900">{option.label}</span>
                </div>
                {value === option.value && (
                  <Check className="w-4 h-4 text-purple-600" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
