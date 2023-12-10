export namespace OpenAIInput {
  type ChatCompletionContentPart =
    | ChatCompletionContentPartText
    | ChatCompletionContentPartImage;

  interface ChatCompletionContentPartImage {
    image_url: ChatCompletionContentPartImage.ImageURL;

    /**
     * The type of the content part.
     */
    type: "image_url";
  }

  namespace ChatCompletionContentPartImage {
    export interface ImageURL {
      /**
       * Either a URL of the image or the base64 encoded image data.
       */
      url: string;

      /**
       * Specifies the detail level of the image.
       */
      detail?: "auto" | "low" | "high";
    }
  }

  interface ChatCompletionContentPartText {
    /**
     * The text content.
     */
    text: string;

    /**
     * The type of the content part.
     */
    type: "text";
  }

  interface ChatCompletionUserMessageParam {
    /**
     * The contents of the user message.
     */
    content: string | Array<ChatCompletionContentPart> | null;

    /**
     * The role of the messages author, in this case `user`.
     */
    role: "user";
  }

  interface ChatCompletionSystemMessageParam {
    /**
     * The contents of the system message.
     */
    content: string | null;

    /**
     * The role of the messages author, in this case `system`.
     */
    role: "system";
  }

  export interface ChatCompletionCreateParamsBase {
    /**
     * A list of messages comprising the conversation so far.
     * [Example Python code](https://cookbook.openai.com/examples/how_to_format_inputs_to_chatgpt_models).
     */
    messages: Array<
      ChatCompletionUserMessageParam | ChatCompletionSystemMessageParam
    >;

    /**
     * ID of the model to use. See the
     * [model endpoint compatibility](https://platform.openai.com/docs/models/model-endpoint-compatibility)
     * table for details on which models work with the Chat API.
     */
    model:
      | (string & {})
      | "gpt-4-1106-preview"
      | "gpt-4-vision-preview"
      | "gpt-4"
      | "gpt-4-0314"
      | "gpt-4-0613"
      | "gpt-4-32k"
      | "gpt-4-32k-0314"
      | "gpt-4-32k-0613"
      | "gpt-3.5-turbo"
      | "gpt-3.5-turbo-16k"
      | "gpt-3.5-turbo-0301"
      | "gpt-3.5-turbo-0613"
      | "gpt-3.5-turbo-1106"
      | "gpt-3.5-turbo-16k-0613";

    response_format?: { type: "json_object" };

    /**
     * Number between -2.0 and 2.0. Positive values penalize new tokens based on their
     * existing frequency in the text so far, decreasing the model's likelihood to
     * repeat the same line verbatim.
     *
     * [See more information about frequency and presence penalties.](https://platform.openai.com/docs/guides/gpt/parameter-details)
     */
    frequency_penalty?: number | null;

    /**
     * Modify the likelihood of specified tokens appearing in the completion.
     *
     * Accepts a JSON object that maps tokens (specified by their token ID in the
     * tokenizer) to an associated bias value from -100 to 100. Mathematically, the
     * bias is added to the logits generated by the model prior to sampling. The exact
     * effect will vary per model, but values between -1 and 1 should decrease or
     * increase likelihood of selection; values like -100 or 100 should result in a ban
     * or exclusive selection of the relevant token.
     */
    logit_bias?: Record<string, number> | null;

    /**
     * The maximum number of [tokens](/tokenizer) to generate in the chat completion.
     *
     * The total length of input tokens and generated tokens is limited by the model's
     * context length.
     * [Example Python code](https://cookbook.openai.com/examples/how_to_count_tokens_with_tiktoken)
     * for counting tokens.
     */
    max_tokens?: number | null;

    /**
     * How many chat completion choices to generate for each input message.
     */
    n?: number | null;

    /**
     * Number between -2.0 and 2.0. Positive values penalize new tokens based on
     * whether they appear in the text so far, increasing the model's likelihood to
     * talk about new topics.
     *
     * [See more information about frequency and presence penalties.](https://platform.openai.com/docs/guides/gpt/parameter-details)
     */
    presence_penalty?: number | null;

    /**
     * This feature is in Beta. If specified, our system will make a best effort to
     * sample deterministically, such that repeated requests with the same `seed` and
     * parameters should return the same result. Determinism is not guaranteed, and you
     * should refer to the `system_fingerprint` response parameter to monitor changes
     * in the backend.
     */
    seed?: number | null;

    /**
     * Up to 4 sequences where the API will stop generating further tokens.
     */
    stop?: string | null | Array<string>;

    /**
     * If set, partial message deltas will be sent, like in ChatGPT. Tokens will be
     * sent as data-only
     * [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format)
     * as they become available, with the stream terminated by a `data: [DONE]`
     * message.
     * [Example Python code](https://cookbook.openai.com/examples/how_to_stream_completions).
     */
    stream?: boolean | null;

    /**
     * What sampling temperature to use, between 0 and 2. Higher values like 0.8 will
     * make the output more random, while lower values like 0.2 will make it more
     * focused and deterministic.
     *
     * We generally recommend altering this or `top_p` but not both.
     */
    temperature?: number | null;

    /**
     * An alternative to sampling with temperature, called nucleus sampling, where the
     * model considers the results of the tokens with top_p probability mass. So 0.1
     * means only the tokens comprising the top 10% probability mass are considered.
     *
     * We generally recommend altering this or `temperature` but not both.
     */
    top_p?: number | null;

    /**
     * A unique identifier representing your end-user, which can help OpenAI to monitor
     * and detect abuse.
     * [Learn more](https://platform.openai.com/docs/guides/safety-best-practices/end-user-ids).
     */
    user?: string;
  }
}

export namespace OpenAIOutput {
  export interface ChatCompletion {
    /**
     * A unique identifier for the chat completion.
     */
    id: string;

    /**
     * A list of chat completion choices. Can be more than one if `n` is greater
     * than 1.
     */
    choices: Array<Choice>;

    /**
     * The Unix timestamp (in seconds) of when the chat completion was created.
     */
    created: number;

    /**
     * The model used for the chat completion.
     */
    model: string;

    /**
     * The object type, which is always `chat.completion`.
     */
    object: "chat.completion";

    /**
     * This fingerprint represents the backend configuration that the model runs with.
     *
     * Can be used in conjunction with the `seed` request parameter to understand when
     * backend changes have been made that might impact determinism.
     */
    system_fingerprint?: string;

    /**
     * Usage statistics for the completion request.
     */
    usage?: CompletionUsage;
  }
  export interface Choice {
    /**
     * The reason the model stopped generating tokens. This will be `stop` if the model
     * hit a natural stop point or a provided stop sequence, `length` if the maximum
     * number of tokens specified in the request was reached, `content_filter` if
     * content was omitted due to a flag from our content filters, `tool_calls` if the
     * model called a tool, or `function_call` (deprecated) if the model called a
     * function.
     */
    finish_reason:
      | "stop"
      | "length"
      | "tool_calls"
      | "content_filter"
      | "function_call";

    /**
     * The index of the choice in the list of choices.
     */
    index: number;

    /**
     * A chat completion message generated by the model.
     */
    message: ChatCompletionMessage;
  }

  interface ChatCompletionMessage {
    /**
     * The contents of the message.
     */
    content: string | null;

    /**
     * The role of the author of this message.
     */
    role: "assistant";
  }

  /**
   * Usage statistics for the completion request.
   */
  interface CompletionUsage {
    /**
     * Number of tokens in the generated completion.
     */
    completion_tokens: number;

    /**
     * Number of tokens in the prompt.
     */
    prompt_tokens: number;

    /**
     * Total number of tokens used in the request (prompt + completion).
     */
    total_tokens: number;
  }

  export interface APIError {
    readonly status: 400 | 401 | 403 | 404 | 409 | 422 | 429 | 500 | undefined;
    readonly headers: Headers | undefined;
    readonly error: { message: string } | undefined;

    readonly code: string | null | undefined;
    readonly param: string | null | undefined;
    readonly type: string | undefined;
  }
}
