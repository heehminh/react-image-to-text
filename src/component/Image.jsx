import React, { useState } from "react";
import styled from "styled-components";
import { createWorker } from "tesseract.js";

function Image() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("현재 클립보드에 저장된 이미지가 없습니다");

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
              } = await worker.recognize(img, {
                preserve_interword_spaces: "1",
              });
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
      <Button onClick={getImageFromClipboard}>
        클립보드에서 이미지 불러오기
      </Button>
      <Result>
        {image && <Img src={image.src} alt="pasted from clipboard" />}
        {text && (
          <div>
            <Text>{text}</Text>
          </div>
        )}
      </Result>
    </Wrapper>
  );
}

export default Image;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0px;
  min-height: 1000px;
  align-items: center;
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
  margin-top: 10px;
`;

const Button = styled.button`
  color: black;
  background-color: white;
  font-size: 32px;
  font-weight: 500;
  width: 500px;
  height: 100px;
  border-radius: 20px;
  cursor: pointer;
`;
