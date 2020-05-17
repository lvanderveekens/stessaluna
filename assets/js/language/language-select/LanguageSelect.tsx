import React, { FC } from "react"
import ISO6391 from "iso-639-1"

interface Props {
  className?: string
  name: string
  placeholder?: string
  value?: string
  onChange: (value?: string) => void
  valueType?: "short" | "long"
}

const LanguageSelect: FC<Props> = ({
  className,
  name,
  placeholder = "Select language",
  value,
  onChange,
  valueType = "short",
}) => {
  return (
    <select className={className} id={name} value={value} onChange={(e) => onChange(e.currentTarget.value)}>
      <option value="" disabled selected>
        {placeholder}
      </option>
      {ISO6391.getLanguages(ISO6391.getAllCodes())
        .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
        .map(({ code, name }) => (
          <option key={code} value={valueType === "short" ? code : name}>
            {name}
          </option>
        ))}
    </select>
  )
}

export default LanguageSelect
