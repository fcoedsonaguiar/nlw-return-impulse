import { ToggleWidget } from './WidgetForm/ToggleWidget'
import { Popover } from '@headlessui/react'
import { ChatTeardropDots } from "phosphor-react"

export function Widget() {
  return (
    <Popover className="absolute right-3 bottom-3 md:right-5 md:bottom-5 flex flex-col items-end">
      <Popover.Panel>
        <ToggleWidget />
      </Popover.Panel>

      <Popover.Button className="bg-violet-500 rounded-full px-3 h-12 text-white flex items-center group">
        <ChatTeardropDots className="w-6 h-6" />

        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear">
          <span className="pl-2"></span>
          Feedback
        </span>
      </Popover.Button>
    </Popover>
  )
}