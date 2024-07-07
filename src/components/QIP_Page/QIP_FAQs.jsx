import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'

const faqs = [
  {
    question: "What is CREED?",
    answer:
      "The Center of Research for Energy Efficiency and Decarbonisation (CREED) is a pioneering research center established in 2023 at the Indian Institute of Technology, Ropar. It focuses on advancing energy efficiency and decarbonisation through interdisciplinary research and collaborations.",
  },{
    question: "Who are the key members of the CREED team?",
    answer:
      "Our team comprises ten faculty members, including professors, associate professors, and assistant professors from diverse disciplines, all dedicated to sustainable energy research.",
  }
  ,{
    question: "What is the mission of CREED?",
    answer:
      "CREED aims to be a leader in energy research and decarbonisation, fostering collaborations and driving impactful initiatives to promote sustainable energy practices.",
  }
  ,{
    question: "Who are some of CREED's key partners?",
    answer:
      "We have initiated partnerships with the Energy Consortium Centre at IIT Ropar and established strategic collaborations with the Punjab Energy Development Agency (PEDA). These partnerships enhance our collaborative efforts in energy research and innovation.",
  }
  ,{
    question: "How does CREED collaborate with industry partners?",
    answer:
      "CREED collaborates with various industry partners through paid energy audits, joint research projects, and strategic initiatives aimed at reducing carbon footprints and enhancing energy efficiency.",
  }
  // More questions...
]

export default function QIP_FAQs() {
  return (
    <div className="bg-white border-t">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">Frequently asked questions</h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {faqs.map((faq) => (
              <Disclosure as="div" key={Math.random()} className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <DisclosureButton className="flex w-full items-start justify-between text-left text-gray-900">
                        <span className="text-base font-semibold leading-7">{faq.question}</span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <MinusSmallIcon className="h-6 w-6" aria-hidden="true" />
                          ) : (
                            <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
                          )}
                        </span>
                      </DisclosureButton>
                    </dt>
                    <DisclosurePanel as="dd" className="mt-2 pr-12">
                      <p className="text-base leading-7 text-gray-600">{faq.answer}</p>
                    </DisclosurePanel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
