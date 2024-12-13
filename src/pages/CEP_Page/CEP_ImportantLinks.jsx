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
          <li key={link.linkTitle} className="col-span-1 flex flex-col justify-between rounded-md shadow-sm text-gray-800 p-3 border">
          <div>
            <h3 className='text-gray-900 font-semibold text-lg'>
              {link.linkTitle}
            </h3>
            <p className='text-sm hyphens-auto'>{link.linkDescription}</p>
          </div>
            <a href={link.href} className='font-semibold mt-2 text-blue-500 underline'>Open link</a>
      </li>
        ))}
      </ul>
    </div>
    </div>
    </div>
  )
}
