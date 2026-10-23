/**
 * ImageContainer — 4:3 cropped frame for a project screenshot.
 */
export function ImageContainer({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="aspect-[4/3] overflow-hidden rounded-lg">
      <img
        src={imageUrl}
        alt="Project screenshot"
        className="w-full h-full object-cover"
      />
    </div>
  );
}
