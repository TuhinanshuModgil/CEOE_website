import React, { useState } from 'react'
import InputField from '../../components/form/InputField'

function CertificateForm() {

    let [certificateNumber, setCertificateNumber] = useState("")

    return (
        <div className=''>
            <div className="bg-white py-24 sm:py-32 mt-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <InputField fieldName='Certificate Number' fieldVlaue={certificateNumber} setField={setCertificateNumber} customMessage='IITRPR/20XX/PQIP/XXXXXX/XX' placeholder='Enter your certificate number here' />
                    <button 
                    onClick={()=>console.log(certificateNumber)}
                className="rounded-md mt-4 bg-tertary-color px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Submit
                </button>
                </div>
                
                
            </div>
        </div>
    )
}

export default CertificateForm
