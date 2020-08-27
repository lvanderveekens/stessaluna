import React, {ChangeEvent, ForwardRefRenderFunction} from "react"
import Image from "../image.interface";
import axios from "../../http/client"

interface Props {
  className?: string
  id?: string
  onChange: (image: Image) => void
}

const ImageInput: ForwardRefRenderFunction<HTMLInputElement, Props> = ({className, id, onChange}, ref: React.Ref<HTMLInputElement>) => {

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const image = event.currentTarget.files[0]
    console.log('HANDLE CHANGE')
    console.log(image)
    if (image) {
      const formData = new FormData();
      formData.append('image', image);

      axios.post('/api/images', formData)
        .then((res) => onChange(res.data))
        .catch((e) => console.log(e))
    }
  }

  return (
    <input
      ref={ref}
      id={id}
      name="image"
      type="file"
      className={`${className} form-control d-none`}
      onChange={handleChange}
      accept=".jpg,.png"
    />
  )
}

export default React.forwardRef(ImageInput)
