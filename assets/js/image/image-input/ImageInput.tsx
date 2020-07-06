import React, {ChangeEvent, FC, useState} from "react"
import {nextId} from "../../util/id-generator"
import Image from "../image.interface";
import axios from "../../http/client"

interface Props {
  onChange: (image: Image) => void
}

const ImageInput: FC<Props> = ({onChange}, ref) => {
  const [inputId] = useState<string>(() => `input${nextId()}`)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const image = event.currentTarget.files[0]
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
      id={inputId}
      name="image"
      type="file"
      className="form-control d-none"
      onChange={handleChange}
      accept=".jpg,.png"
    />
  )
}

export default React.forwardRef(ImageInput)
