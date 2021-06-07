import { generateWebpImage } from "../lib/generateWebpImage";

export const ResolutionSwitchingImage = async (
  srcSet: string,
  srcSetMobile: string,
  srcSetWebp?: string,
  srcSetWebpMobile?: string
) => {
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

        <img src={srcSet} alt="" />
      </picture>
    </div>
  );
};
