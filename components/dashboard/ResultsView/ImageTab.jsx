export default function ImageTab({ imageUrl }) {
    return (
      <div className="flex justify-center">
        <img
          src={imageUrl}
          alt="Chart"
          className="max-w-full max-h-[70vh] object-contain"
        />
      </div>
    );
  }