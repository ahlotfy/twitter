// Next Js and libraries
import React from "react";
// Style
import { SkeletonContent, Box } from "./LoadingTweetStyle";
import { Skeleton } from "antd";
// Components
import FakeInteraction from "./FakeInteraction";

const LoadingTweet = ({ count }: any) => {
  return (
    <>
      {count === "multiable" ? (
        <>
          <SkeletonContent>
            <Box>
              <Skeleton avatar paragraph={{ rows: 3 }} active />
              <FakeInteraction />
            </Box>
          </SkeletonContent>
          <SkeletonContent>
            <Box>
              <Skeleton avatar paragraph={{ rows: 3 }} active />
              <FakeInteraction />
            </Box>
          </SkeletonContent>
          <SkeletonContent>
            <Box>
              <Skeleton avatar paragraph={{ rows: 3 }} active />
              <FakeInteraction />
            </Box>
          </SkeletonContent>
          <SkeletonContent>
            <Box>
              <Skeleton avatar paragraph={{ rows: 3 }} active />
              <FakeInteraction />
            </Box>
          </SkeletonContent>
        </>
      ) : (
        <SkeletonContent className="last">
          <Box>
            <Skeleton avatar paragraph={{ rows: 3 }} active />
            <FakeInteraction />
          </Box>
        </SkeletonContent>
      )}
    </>
  );
};

export default LoadingTweet;
