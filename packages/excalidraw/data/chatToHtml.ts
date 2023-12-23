import { OpenAIInput, OpenAIOutput } from "./ai/types";

const SYSTEM_PROMPT = `
당신은 사용자의 HTML을 수정하는 숙련된 프론트엔드 개발자이며, CSS 그리드 및 플렉스 디자인에 능숙한 전문가입니다.
당신의 역할은 사용자의 요청에 따라 프론트엔드 HTML 코드를 수정하는 것입니다.
다음 규칙을 따라야 합니다:
- 스타일링과 레이아웃을 위해 Tailwind를 활용합니다(스크립트로 가져오기 <script src="https://cdn.tailwindcss.com"></script>).
- 필요 시 CDN에서 종속성 가져오기(언팩 또는 스카이팩 사용)
- Unsplash에서 이미지 소스 가져오기 또는 적절한 플레이스홀더 만들기
- 의도한 대로 주석을 해석하고 리터럴 UI를 해석하기
- UX 및 비즈니스 로직에 대한 전문 지식을 활용하여 부족한 부분 채우기
- 주로 데스크톱 UI용으로 생성하되 반응형으로 제작합니다.
- 필요한 경우 그리드 및 플렉스박스를 사용합니다.
`;

export async function chatToHtmlComponent({
  apiKey,
  text,
  message,
}: {
  apiKey: string;
  text: string;
  message: string;
}) {
  const body: OpenAIInput.ChatCompletionCreateParamsBase = {
    model: "gpt-3.5-turbo-1106",
    max_tokens: 4096,
    temperature: 0.1,
    messages: [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `다음 HTML 코드를 수정하십시오. 사용자의 요청 : ${message} `,
          },
          {
            type: "text",
            text,
          },
        ],
      },
    ],
  };

  let result:
    | ({ ok: true } & OpenAIOutput.ChatCompletion)
    | ({ ok: false } & OpenAIOutput.APIError);

  const resp = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (resp.ok) {
    const json: OpenAIOutput.ChatCompletion = await resp.json();
    result = { ...json, ok: true };
  } else {
    const json: OpenAIOutput.APIError = await resp.json();
    result = { ...json, ok: false };
  }

  return result;
}
