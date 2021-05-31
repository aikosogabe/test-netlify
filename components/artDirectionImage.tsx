import { generateWebpImage } from "../lib/generateWebpImage";

export const artDirectionImage = async (
  src: string,
  mobileSrc: string,
  altText?: string
) => {
  const srcSet = src;
  const srcSetMobile = mobileSrc;
  const srcSetWebp = await generateWebpImage(srcSet);
  const srcSetWebpMobile = await generateWebpImage(srcSetMobile);
  return (
    <div>
      <picture>
        {srcSetWebp && (
          <source
            srcSet={srcSetWebp}
            type="image/webp"
            media="(min-width: 769px)"
          />
        )}
        {srcSetWebpMobile && (
          <source
            srcSet={srcSetWebpMobile}
            type="image/webp"
            media="(max-width: 768px)"
          />
        )}

        <source srcSet={srcSet} media="(min-width: 769px)" />
        {srcSetMobile && (
          <source srcSet={srcSetMobile} media="(max-width: 768px)" />
        )}

        <img src={srcSet} alt={altText ? altText : ""} />
      </picture>
    </div>
  );
};
