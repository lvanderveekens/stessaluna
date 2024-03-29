import React, { FC } from "react";
import ContentLoader from "react-content-loader";
import styles from "./FeedPlaceholder.scss?module";

const FeedPlaceholder: FC = () => {
  return (
    <div className={styles.feedPlaceholder}>
      {Array.from({ length: 10 }, (_, i) => (
        <div key={i}>
          <ContentLoader className={styles.contentLoader} viewBox="0 0 500 300" speed={1}>
            <circle cx={30} cy={30} r={30} />
            <rect x={80} y={15 - 15 / 2} rx={5} width={420} height={15} />
            <rect x={80} y={45 - 15 / 2} rx={5} width={200} height={15} />
            <rect x={0} y={80} rx={5} width={500} height={220} />
          </ContentLoader>
        </div>
      ))}
    </div>
  );
};

export default FeedPlaceholder;
