export default function CEP_Content({title, description=""}) {

    const descriptionArray = description.split("/#")
    console.log("description: ", description)
    console.log("descriptionArray: ", descriptionArray)
    return (
      <div className="bg-white py-24 sm:py-32 mt-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <p className="text-base font-semibold leading-7 text-tertary-color">IIT Ropar</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{title?? ""}</h1>
            <div className="mt-10  max-w-xl gap-8 text-base leading-7 text-gray-700 lg:max-w-none  ">
              <div>
               {descriptionArray.map(((paragraph, index)=> {
                return (<p key={index} className="mt-4">{paragraph}</p>)
               }))}
              </div>
            </div>
            <div className="mt-10 flex gap-8">
              <a
                href="#"
                className="rounded-md bg-tertary-color px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-tertary-color-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                FAQs
              </a>

              <a
                href="#"
                className="rounded-md bg-tertary-color px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-tertary-color-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
  