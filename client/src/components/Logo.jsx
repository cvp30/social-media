import { Image } from "@nextui-org/react"
import LogoImg from "@/assets/logo_img.png"

const Logo = () => {
  return (

    <Image
      src={LogoImg}
      radius="none"
      className="h-10"
      classNames={{
        wrapper: 'mx-7 bg-cover'
      }}
    />

  )
}

export default Logo