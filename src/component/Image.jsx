import React, { useState } from "react";
import { createWorker } from "tesseract.js";

function Image() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");

  async function getImageFromClipboard() {
    await navigator.clipboard.readText();
    const clipboardItems = await navigator.clipboard.read();
    for (const item of clipboardItems) {
      for (const type of item.types) {
        if (type.startsWith("image/")) {
          const blob = await item.getType(type);
          if (blob) {
            const img = document.createElement("img");
            img.src = URL.createObjectURL(blob);
            setImage(img);

            const worker = await createWorker({
              logger: (m) => console.log(m),
            });

            (async () => {
              await worker.loadLanguage("kor+eng");
              await worker.initialize("kor+eng");
              const {
                data: { text },
              } = await worker.recognize(img);
              console.log(text);
              setText(text);
              await worker.terminate();
            })();
          }
        }
      }
    }
  }

  return (
    <div>
      <button onClick={getImageFromClipboard}>
        Paste Image from Clipboard
      </button>
      {image && <img src={image.src} alt="pasted from clipboard" />}
      {text && <p>{text}</p>}
    </div>
  );
}

export default Image;
