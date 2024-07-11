import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { v4 } from "uuid"
import { storage } from "./config"


export const uploadPostImages = async (userID, file) => {
  const storageRef = ref(storage, `${userID}/${v4()}`)
  await uploadBytes(storageRef, file)

  return await getDownloadURL(storageRef)
}