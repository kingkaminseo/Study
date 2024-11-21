```
import React, { useState } from "react";

function Asf() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  function getimagefile(event: any) {
    let image = event.target.files[0];
    if (image) {
      setFile(image);
      setPreview(URL.createObjectURL(image));
    }
  }

  async function go() {
    if (!file) {
      return;
    }
    let formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch(`api-url`, {
        method: "POST",
        body: formData,
      });

      let result = await response.json;
      if (response.ok) {
        alert("확인");
        console.log(result);
      } else {
        alert("실패");
      }
    } catch (error) {
      console.log("asf");
    }
  }

  return (
    <div className="App">
      <input type="file" onChange={getimagefile} />
      {preview && <img src={preview} alt="1" style={{ width: "300px" }} />}
      <button onClick={go}>이미지 제출</button>
    </div>
  );
}

export default Asf;
```
