import PropTypes from 'prop-types';
import { Button, Divider, Listbox, ListboxItem, Modal, ModalBody, ModalContent, ModalHeader, ScrollShadow, Spinner, useDisclosure } from "@nextui-org/react"
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/solid';
import CustomInput from '@/components/CustomInput';
import { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { SEARCH_USERS } from '../graphql/SearchUsers';
import UserInfoCard from '@/components/UserInfoCard';
import { useCreateChat } from '../hooks/useCreateChat';

const NewMessageButton = ({ children, ...props }) => {

  const [userInput, setUserInput] = useState('')
  const [userSelected, setUserSelected] = useState(new Set([]))
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const { createChat, creatingChat } = useCreateChat()

  const [searchUsers, { data, loading }] = useLazyQuery(SEARCH_USERS, { fetchPolicy: 'network-only' })

  const handleCloseModal = () => {
    setUserInput('')
    setUserSelected([])
  }

  const handleChangeUserInput = (e) => setUserInput(e.target.value)

  const handleSubmitSearchUser = async (e) => {
    e.preventDefault()

    if (userInput.trim().length) {
      await searchUsers({
        variables: { user: userInput }
      })

    }
  }

  const handleSubmitCreateChat = async (e) => {
    e.preventDefault()

    if (Array.from(userSelected)[0]) {
      const userIds = Array.from(userSelected)[0]

      await createChat({
        variables: { user: userIds }
      })
      onClose()
    }
  }

  return (
    <>
      <Button
        onPress={onOpen}
        color="primary"
        {...props}
      >
        {children}
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        onOpenChange={onOpenChange}
        backdrop='blur'
        hideCloseButton={true}
        size='xl'
        placement='top'
      >
        <ModalContent>
          {
            (onClose) => (
              <>
                <ModalHeader className='items-center gap-3'>
                  <Button
                    color='danger'
                    isIconOnly
                    variant='light'
                    radius='full'
                    onPress={onClose}
                  >
                    <XMarkIcon className='size-7' />
                  </Button>
                  <h3>New message</h3>
                  <div className=' flex-1 flex justify-end'>
                    <Button
                      onClick={handleSubmitCreateChat}
                      size='md'
                      radius='sm'
                      color="primary"
                      className="text-base font-bold"
                      isLoading={creatingChat}
                    >
                      Create
                    </Button>
                  </div>
                </ModalHeader>

                <ModalBody className='p-0'>
                  <div className=' flex flex-col gap-2 px-6'>
                    <form onSubmit={handleSubmitSearchUser}>
                      <CustomInput
                        startContent={<MagnifyingGlassIcon />}
                        type="search"
                        placeholder="Search people..."
                        value={userInput}
                        onChange={handleChangeUserInput}
                      />
                    </form>

                    {/* <UsersChip
                      usersSelected={usersSelected}
                      setUsersSelected={setUsersSelected}
                    /> */}

                    <Divider />

                  </div>

                  <ScrollShadow
                    isEnabled={false}
                    className='w-full h-80 flex flex-col items-center gap-1'
                  >
                    {
                      loading ?
                        <Spinner />
                        : (
                          <Listbox
                            selectionMode='single'
                            selectedKeys={userSelected}
                            onSelectionChange={setUserSelected}
                            aria-label='userList'
                            itemClasses={{
                              base: 'data-[hover=true]:bg-hoverPost data-[selectable=true]:focus:bg-hoverPost',
                            }}
                          >
                            {
                              data?.searchUsers.map(user => (
                                <ListboxItem
                                  key={user.id}
                                  textValue={user.slug}
                                >
                                  <UserInfoCard
                                    slug={user.slug}
                                    username={user.username}
                                    photoURL={user.photoURL}
                                  />
                                </ListboxItem>
                              ))
                            }
                          </Listbox>

                        )
                    }

                  </ScrollShadow>
                </ModalBody>
              </>
            )
          }
        </ModalContent>
      </Modal>
    </>
  )
}

export default NewMessageButton

NewMessageButton.propTypes = {
  children: PropTypes.any,
}