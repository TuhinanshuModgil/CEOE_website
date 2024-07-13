export default function InputField({fieldName = "Field Name", fieldVlaue="", setField, customMessage="", placeholder="" }) {

    function handleInputVlaue(e){
        setField(e.target.value)
    }

    return (
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
          {fieldName}
        </label>
        <div className="mt-2">
          <input
            id="text"
            name="text"
            type="text"
            value={fieldVlaue}
            placeholder={placeholder}
            aria-describedby="email-description"
            onInput={handleInputVlaue}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <p id="email-description" className="mt-2 text-sm text-gray-500">
         {customMessage}
        </p>
      </div>
    )
  }