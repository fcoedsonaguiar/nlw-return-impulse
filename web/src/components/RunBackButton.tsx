import { Popover } from '@headlessui/react'
import { ArrowLeft } from 'phosphor-react'

export function RunBackButton() {
    return (
        <Popover.Button
            className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
            title="Voltar ao feedback">
            <ArrowLeft weight="bold" className="h-4 w-4" />
        </Popover.Button>
    )
}