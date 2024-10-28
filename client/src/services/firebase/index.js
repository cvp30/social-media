import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { v4 } from "uuid"
import { storage } from "./config"


export const uploadImages = async (userID, file, type = null) => {

  const storageRef = type ?
    ref(storage, `${userID}/${type}`)
    :
    ref(storage, `${userID}/${v4()}`)

  await uploadBytes(storageRef, file)

  return await getDownloadURL(storageRef)
}