import CustomInput from "@/components/CustomInput"
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"
import { useState } from "react"

const UserSearch = () => {

  const [userInput, setUserInput] = useState('')

  const handleChangeUserInput = async (e) => setUserInput(e.target.value)

  const handleSubmitSearchUser = (e) => {
    e.preventDefault()
  }


  return (
    <form
      onSubmit={handleSubmitSearchUser}
    >
      <CustomInput
        startContent={<MagnifyingGlassIcon className="size-6" />}
        type="search"
        placeholder="Find user..."
        value={userInput}
        onChange={handleChangeUserInput}
      />
    </form>
  )
}

export default UserSearch