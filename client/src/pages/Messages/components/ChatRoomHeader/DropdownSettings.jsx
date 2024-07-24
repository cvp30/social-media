import { EllipsisVerticalIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid"
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"


const DropdownSettings = () => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          isIconOnly
          color="primary"
          variant="light"
          radius="full"
        >
          <EllipsisVerticalIcon className="size-7" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        itemClasses={{
          title: 'text-base'
        }}
        variant="flat"
        color="primary"
        aria-label="Chat Settings Options"
      >
        <DropdownItem
          key="edit"
          title="Edit chat"
          startContent={<PencilSquareIcon className="size-6" />}
        />
        <DropdownItem
          key="delete"
          color="danger"
          title="Delete chat"
          startContent={<TrashIcon className="size-6" />}
        />
      </DropdownMenu>
    </Dropdown>

  )
}

export default DropdownSettings