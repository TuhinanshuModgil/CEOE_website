import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ImportantLinks({importantLinks}) {
  return (
    <div className="">
        <div className="mx-auto max-w-7xl">
            
    <div>
      <ul role="list" className=" grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 mt-16">
        {importantLinks.map((link) => (
         <li key={link.linkName} className="col-span-1 flex flex-col justify-between rounded-md shadow-sm text-gray-800 p-3 border">
         <div>
           <h3 className='text-gray-900 font-semibold text-lg'>
             {link.linkName}
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
