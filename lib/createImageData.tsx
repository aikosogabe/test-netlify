import { generateWebpImage } from "./generateWebpImage";

export type ImageData = {
  srcSet: string;
  srcSetMobile: string;
  srcSetWebp: string;
  srcSetWebpMobile: string;
};

export const createImageData = async (
  src: string,
  mobileSrc: string
): Promise<ImageData> => {
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
