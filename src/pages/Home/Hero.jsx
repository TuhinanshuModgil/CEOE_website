export default function Hero() {
    return (
      <div className="relative bg-white">
        <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-24 lg:px-8">
          <div className="px-6 pb-24 pt-10 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-56 lg:pt-32 xl:col-span-6">
            <div className="mx-auto max-w-2xl lg:mx-0">
              
              <div className="hidden sm:mt-32 sm:flex lg:mt-16">
                
              </div>
              <h1 className="mt-24 text-4xl font-bold tracking-tight text-gray-900 sm:mt-10 sm:text-6xl">
                Contuning Education and Outreach Activity, IIT Ropar
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                
                With the rapid advancements in science and technology and frequent paradigm shifts in policy, governance, and management, continuing education for working professionals is essential for development. The Continuing Education Programme (CEP) office at IIT Ropar has been established to address the knowledge upgrading and upskilling needs of professionals in the S&T industry, academia, and governance.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <a
                  href="#"
                  className="rounded-md bg-tertary-color px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Get started
                </a>
                <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
          <div className="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
            <img
              className="aspect-[3/2] w-full bg-gray-50 object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
              src="/maincampusimage.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    )
  }
  