export function ImgContainer({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="w-full border-1 border-blue-300 rounded-t-lg h-full ml-1">
      <img
        src={imageUrl}
        alt="screenshot of nc news website"
        className="w-400 h-100 object-contain p-4"
      />
    </div>
  );
}
