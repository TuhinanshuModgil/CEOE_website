import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'

const faqs = [
  {
    question: " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro, nesciunt dolore dignissimos quo enim saepe aut sed odio alias maxime? ",
    answer:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quod sint ut repellat molestiae modi quasi voluptatibus alias? Possimus quibusdam molestiae minus recusandae quis excepturi at laboriosam facilis, animi ullam reprehenderit quaerat assumenda earum nulla dolorem, itaque aliquid, eos maxime. ",
  },{
    question: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro, nesciunt dolore dignissimos quo enim saepe aut sed odio alias maxime?",
    answer:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, eaque consectetur, vero totam fugiat neque dolores illum sit fuga repellendus sint beatae similique doloribus qui accusamus. Esse architecto ipsam facere sit amet, quaerat laboriosam autem ea reprehenderit mollitia, vel dolorem! ",
  }
  ,{
    question: " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores architecto nihil maiores! Culpa suscipit possimus mollitia, quos officia asperiores quae! ",
    answer:
      " Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet, in? Eveniet, animi. Dignissimos beatae totam neque odit! Neque, voluptatem? Consequuntur fuga, facere ad dolorem exercitationem nihil earum, consequatur veniam quis in facilis amet tenetur quam officia obcaecati fugit animi! Excepturi! ",
  }
  ,{
    question: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur eos nemo libero dolores dicta provident, aperiam nulla quaerat quos natus! ",
    answer:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam odit cupiditate, ex, aperiam architecto eum accusantium doloribus consequatur repellat officia enim dolores quos sit optio, consequuntur dolore ipsum. Fuga aperiam aliquam a adipisci, cumque possimus iste doloribus eveniet recusandae cum. ",
  }
  
  // More questions...
]

export default function Exec_Training_FAQs() {
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
