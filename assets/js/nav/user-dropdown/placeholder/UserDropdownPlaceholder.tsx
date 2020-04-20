import React, { FC } from 'react';
import ContentLoader from 'react-content-loader';
import styles from './UserDropdownPlaceholder.scss?module';

const UserDropdownPlaceholder: FC = () => {

  return (
    <ContentLoader className={styles.contentLoader} viewBox="0 0 100 30" speed={1}>
      <circle cx={15} cy={15} r={15} />
      <rect x={40} y={7} rx={1} width={55} height={5} />
      <rect x={40} y={18} rx={1} width={55} height={5} />
    </ContentLoader>
  )
}

export default UserDropdownPlaceholder;