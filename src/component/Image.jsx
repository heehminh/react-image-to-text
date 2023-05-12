import React, { useState } from "react";

const Image = () => {
  const [image, setImage] = useState(null);

  async function getImageFromClipboard() {
    await navigator.clipboard.readText();

    const clipboardItems = await navigator.clipboard.read();
    for (const item of clipboardItems) {
      for (const type of item.types) {
        if (type.startsWith("image/")) {
          const blob = await item.getType(type);
          // 이미지 데이터가 null이 아닌 경우만 반환
          if (blob) {
            const img = document.createElement("img");
            img.src = URL.createObjectURL(blob);
            return img;
          }
        }
      }
    }
    // 이미지 데이터가 없는 경우, 에러 발생
    throw new Error("No image data found in clipboard.");
  }

  const handlePaste = () => {
    getImageFromClipboard()
      .then((img) => {
        setImage(img);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <button onClick={handlePaste}>Paste Image</button>
      {image && <img src={image.src} alt="Pasted from clipboard" />}
    </div>
  );
};

export default Image;
