export async function uploadHtmlToCodeSandbox(html: string) {
  // 샌드박스에 포함될 파일들을 준비합니다.
  const files = {
    "index.html": {
      content: html,
    },
  };

  // POST 요청으로 샌드박스 생성
  const response = await fetch(
    "https://codesandbox.io/api/v1/sandboxes/define?json=1",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ files }),
    },
  );
  const data = await response.json();

  // 샌드박스 ID를 사용하여 iframe URL을 생성
  const sandboxId = data.sandbox_id;
  return `https://codesandbox.io/embed/${sandboxId}`;
}

export async function uploadReactCodeToCodeSandbox(CodesandboxFiles: JSON) {
  // 샌드박스에 포함될 파일들을 준비합니다.

  const indexHtml = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <script src="https://cdn.tailwindcss.com"></script>
      <title>React App</title>
    </head>
    <body>
      <div id="root"></div>
    </body>
  </html>  
  `;

  const dependencies = {
    react: "18.2.0",
    "react-dom": "18.2.0",
    "react-scripts": "5.0.1",
  };

  const files = {
    "public/index.html": {
      content: indexHtml,
    },
    ...CodesandboxFiles,
    "package.json": {
      content: {
        dependencies,
      },
    },
  };

  // POST 요청으로 샌드박스 생성
  const response = await fetch(
    "https://codesandbox.io/api/v1/sandboxes/define?json=1",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ files }),
    },
  );
  const data = await response.json();

  // 샌드박스 ID를 사용하여 iframe URL을 생성
  const sandboxId = data.sandbox_id;
  return `https://codesandbox.io/embed/${sandboxId}`;
}
