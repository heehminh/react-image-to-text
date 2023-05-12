import React, { useState } from "react";
import styled from "styled-components";
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
    <Wrapper>
      <button onClick={getImageFromClipboard}>
        Paste Image from Clipboard
      </button>
      <Result>
        {image && <Img src={image.src} alt="pasted from clipboard" />}
        {text && <Text>{text}</Text>}
      </Result>
    </Wrapper>
  );
}

export default Image;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Result = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  padding: 20px 50px;
`;

const Img = styled.img`
  width: 50%;
`;

const Text = styled.div`
  font-size: 24px;
  color: black;
  font-weight: 500;
`;
