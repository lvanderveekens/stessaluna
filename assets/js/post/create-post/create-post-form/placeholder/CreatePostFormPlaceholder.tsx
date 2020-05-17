import React, { FC } from "react"
import ContentLoader from "react-content-loader"
import styles from "./CreatePostFormPlaceholder.scss?module"

const CreatePostFormPlaceholder: FC = () => {
  return (
    <ContentLoader className={styles.newPostFormPlaceholder} viewBox="0 0 500 100" speed={1}>
      <rect x={0} y={0} rx={5} width={500} height={15} />
      <rect x={0} y={20} rx={5} width={500} height={15} />
      <rect x={0} y={40} rx={5} width={210} height={15} />
      <rect x={0} y={70} rx={5} width={70} height={30} />
      <rect x={100} y={70} rx={5} width={70} height={30} />
      <rect x={410} y={70} rx={5} width={100} height={30} />
    </ContentLoader>
  )
}

export default CreatePostFormPlaceholder
