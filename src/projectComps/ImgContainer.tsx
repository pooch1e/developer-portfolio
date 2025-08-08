export function ImgContainer({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="w-full h-full ml-1">
      <img
        src={imageUrl}
        alt="screenshot of nc news website"
        className="rounded-t-lg object-contain p-4"
      />
    </div>
  );
}
