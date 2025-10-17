export function ImageContainer({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="aspect-[4/3] overflow-hidden rounded-lg  dark:border-gray-600 transition-colors">
      <img
        src={imageUrl}
        alt="Project screenshot"
        className="w-full h-full object-cover"
      />
    </div>
  );
}
