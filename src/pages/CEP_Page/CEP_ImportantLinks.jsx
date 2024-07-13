import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { importantLinks } from '../../data/siteData'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function CEP_ImportantLinks() {
  return (
    <div className="bg-white py-24 sm:py-32 border-t">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            
    <div>
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl ">Important Links</h2>
      <ul role="list" className=" grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 mt-16">
        {importantLinks.map((link) => (
          <li key={link.name} className="col-span-1 flex rounded-md shadow-sm">
            <div
              className={classNames(
                link.bgColor,
                'flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white',
              )}
            >
              {link.initials}
            </div>
            <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
              <div className="flex-1 truncate px-4 py-2 text-sm">
                <a href={link.href} className="font-medium text-gray-900 hover:text-gray-600">
                  {link.name}
                </a>
                <p className="text-gray-500">{link.members} Members</p>
              </div>
              <div className="flex-shrink-0 pr-2">
                <button
                  type="button"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="sr-only">Open options</span>
                  <EllipsisVerticalIcon aria-hidden="true" className="h-5 w-5" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </div>
    </div>
  )
}
