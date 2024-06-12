import slugify from "slugify"


export const generateSlug = async (initialSlug, User) => {
  let newSlug = slugify(
    initialSlug.replace(/[^\w\s]/gi, ''),
    { lower: true, }
  )

  let counter = 1

  while (await User.findOne({ slug: newSlug })) {
    newSlug = `${newSlug}${counter}`
    counter++
  }

  return newSlug
}