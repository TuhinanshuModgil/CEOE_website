import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import {
  ArrowPathIcon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
} from '@heroicons/react/24/outline'
import { Navigate, NavLink } from 'react-router-dom'



export default function Dropdown({options, dropdownTitle=""}) {
  return (
    <Popover className="relative">
      <PopoverButton className="inline-flex items-center gap-x-1 text-base font-semibold leading-6 text-gray-700">
        <span>{dropdownTitle}</span>
        <ChevronDownIcon aria-hidden="true" className="size-5" />
      </PopoverButton>

      <PopoverPanel
        transition
        className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className=" max-w-md flex-auto overflow-hidden rounded-lg bg-white text-sm/6 shadow-lg ring-1 ring-gray-900/5">
          <div className="p-2">
            {options.map((item) => (
              <div key={item.name} className="group relative flex gap-x-2 rounded-lg p-2 hover:bg-gray-50">
                {/* <div className="mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                  <item.icon aria-hidden="true" className="size-6 text-gray-600 group-hover:text-indigo-600" />
                </div> */}
                  <NavLink to={item.href} className="font-semibold text-gray-900 w-full" title={item.description}>
                  {item.name}
                  </NavLink>
                
                  {/* <p className="mt-1 text-gray-600">{item.description}</p> */}
              </div>
            ))}
          </div>
          {/* <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
            {callsToAction.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100"
              >
                <item.icon aria-hidden="true" className="size-5 flex-none text-gray-400" />
                {item.name}
              </a>
            ))}
          </div> */}
        </div>
      </PopoverPanel>
    </Popover>
  )
}
