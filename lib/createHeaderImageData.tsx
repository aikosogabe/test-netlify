import { generateWebpImage } from "./generateWebpImage";

export type HeaderImageData = {
  srcSet: string;
  srcSetMobile: string;
  srcSetWebp: string;
  srcSetWebpMobile: string;
};

export const createHeaderImageData = async (
  src: string,
  mobileSrc: string
): Promise<HeaderImageData> => {
  const srcSet = src;
  const srcSetMobile = mobileSrc;
  const srcSetWebp = await generateWebpImage(srcSet);
  const srcSetWebpMobile = await generateWebpImage(srcSetMobile);
  return {
    srcSet,
    srcSetMobile,
    srcSetWebp,
    srcSetWebpMobile,
  };
};
