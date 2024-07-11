import * as Yup from "yup"

export const postSchema = Yup.object().shape({
  images: Yup.array().of(Yup.string()),
  content: Yup.string().when('images', {
    is: (arrayImg) => arrayImg.length === 0,
    then: () => Yup.string().trim().required('Este campo es obligatorio cuando el segundo campo está vacío')
  }),
});