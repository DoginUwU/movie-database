interface ImageLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

const imageLoader = ({ src, width }: ImageLoaderProps) => {
  return `https://image.tmdb.org/t/p/w500${src}`;
};

const imageCastLoader = ({ src, width }: ImageLoaderProps) => {
  if (src === "/") return "/assets/no_image.jpg";
  return `https://image.tmdb.org/t/p/w185${src}`;
};

export { imageLoader, imageCastLoader };
