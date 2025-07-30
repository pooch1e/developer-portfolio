export function ImgContainer({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="w-full bg-gray-100 h-full">
      <img
        src={imageUrl}
        alt="screenshot of nc news website"
        className="w-100 h-100 object-resize"
      />
    </div>
  );
}
