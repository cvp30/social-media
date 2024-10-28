import CustomInput from "@/components/CustomInput";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Avatar, Button, Image, Modal, ModalBody, ModalContent, ModalHeader, Textarea, useDisclosure } from "@nextui-org/react"
import { ProfileContext } from "../contexts/ProfileContext";
import ImageButtonsAction from "./ImageButtonsAction";

const UpdateUserForm = () => {

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const { photoURLRef, coverPhotoRef, handleOpenCoverPhoto, handleOpenphotoURL, updateUserFormik, handleRevertCoverPhoto, handleRevertPhotoURL, handleChangePhotoURL, handleChangeCoverPhoto } = ProfileContext()

  const isLocalImage = (image) => typeof image === 'object'

  const handleCloseModal = () => {
    updateUserFormik.resetForm()
    onClose()
  }

  const handleModalChange = () => {
    updateUserFormik.resetForm()
    onOpenChange()
  }

  const handleSubmitButton = () => {
    updateUserFormik.submitForm()
    onClose()
  }

  return (
    <>
      <Button
        variant="ghost"
        color="primary"
        size="lg"
        radius="sm"
        className='font-semibold'
        onPress={onOpen}
      >
        Edit profile
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={handleModalChange}
        hideCloseButton
        size="xl"
        scrollBehavior="inside"
        placement="top"
        classNames={{
          base: 'bg-background',
          header: 'px-3 w-full flex items-center gap-2',
          body: 'px-3'
        }}
      >
        <ModalContent>
          <>
            <ModalHeader>
              <Button
                isIconOnly
                color="danger"
                aria-label="Like"
                radius="full"
                variant="light"
                onPress={handleCloseModal}
              >
                <XMarkIcon className="size-7" />
              </Button>
              <p className="grow">Edit profile</p>

              <Button
                aria-label="save"
                color="primary"
                className='font-semibold'
                radius="sm"
                onPress={handleSubmitButton}
              >
                Save
              </Button>

            </ModalHeader>

            <ModalBody>
              <form
                onSubmit={updateUserFormik.handleSubmit}
                className="w-full flex flex-col gap-5"
              >
                <div className={`${updateUserFormik.values.coverPhoto ? '' : 'bg-default-500'} w-full aspect-[3/1] flex justify-center items-center relative mb-8`}>
                  {
                    updateUserFormik.values.coverPhoto && (
                      <Image
                        removeWrapper
                        src={isLocalImage(updateUserFormik.values.coverPhoto) ? URL.createObjectURL(updateUserFormik.values.coverPhoto) : updateUserFormik.values.coverPhoto}
                        className="w-full object-cover object-center aspect-[3/1]"
                        radius="none"
                      />
                    )
                  }
                  <ImageButtonsAction
                    image={updateUserFormik.values.coverPhoto}
                    openImageFn={handleOpenCoverPhoto}
                    revertImageFn={handleRevertCoverPhoto}
                  />
                  <input
                    type="file"
                    className='hidden'
                    ref={coverPhotoRef}
                    onChange={handleChangeCoverPhoto}
                    accept='image/*'
                  />

                  <div
                    className='w-fit h-fit absolute -bottom-10 left-0 ml-4 z-10 flex justify-center items-center'
                  >
                    <Avatar
                      isBordered
                      src={isLocalImage(updateUserFormik.values.photoURL) ? URL.createObjectURL(updateUserFormik.values.photoURL) : updateUserFormik.values.photoURL}
                      color={`${updateUserFormik.values.photoURL ? 'primary' : ''}`}
                      showFallback
                      className="w-28 h-28 "
                    />
                    <ImageButtonsAction
                      image={updateUserFormik.values.photoURL}
                      openImageFn={handleOpenphotoURL}
                      revertImageFn={handleRevertPhotoURL}
                    />
                  </div>

                  <input
                    type="file"
                    className='hidden'
                    ref={photoURLRef}
                    onChange={handleChangePhotoURL}
                    accept='image/*'
                  />
                </div>

                <CustomInput
                  type='text'
                  label="Username"
                  name='username'
                  onBlur={updateUserFormik.handleBlur}
                  value={updateUserFormik.values.username}
                  onChange={updateUserFormik.handleChange}
                  isInvalid={updateUserFormik.touched.username && Boolean(updateUserFormik.errors.username)}
                />
                <Textarea
                  variant="bordered"
                  size="lg"
                  radius="sm"
                  color="primary"
                  maxRows={3}
                  label="Bio"
                  name='bio'
                  classNames={{
                    inputWrapper: 'text-default-600 group-data-[focus=true]:text-primary group-data-[focus=true]:border-primary data-[hover=true]:border-default border-default-200',
                    input: 'text-foreground placeholder:text-default-400'
                  }}
                  onBlur={updateUserFormik.handleBlur}
                  value={updateUserFormik.values.bio}
                  onChange={updateUserFormik.handleChange}
                  isInvalid={updateUserFormik.touched.bio && Boolean(updateUserFormik.errors.bio)}
                />

                <CustomInput
                  type='text'
                  label="Linkedin"
                  name='linkedin'
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 font-bold">https://x.com/</span>
                    </div>
                  }
                  onBlur={updateUserFormik.handleBlur}
                  value={updateUserFormik.values.linkedin}
                  onChange={updateUserFormik.handleChange}
                  isInvalid={updateUserFormik.touched.linkedin && Boolean(updateUserFormik.errors.linkedin)}
                />

                <CustomInput
                  type='text'
                  label="Github"
                  name='github'
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 font-bold">https://github.com/</span>
                    </div>
                  }
                  onBlur={updateUserFormik.handleBlur}
                  value={updateUserFormik.values.github}
                  onChange={updateUserFormik.handleChange}
                  isInvalid={updateUserFormik.touched.github && Boolean(updateUserFormik.errors.github)}
                />
                <CustomInput
                  type='text'
                  label="Portfolio"
                  name='portfolio'
                  onBlur={updateUserFormik.handleBlur}
                  value={updateUserFormik.values.portfolio}
                  onChange={updateUserFormik.handleChange}
                  isInvalid={updateUserFormik.touched.portfolio && Boolean(updateUserFormik.errors.portfolio)}
                />
                <CustomInput
                  type='text'
                  label="Location"
                  name='location'
                  onBlur={updateUserFormik.handleBlur}
                  value={updateUserFormik.values.location}
                  onChange={updateUserFormik.handleChange}
                  isInvalid={updateUserFormik.touched.location && Boolean(updateUserFormik.errors.location)}
                />
              </form>
            </ModalBody>
          </>
        </ModalContent>


      </Modal>

    </>
  )
}

export default UpdateUserForm