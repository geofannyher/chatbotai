import { useState } from "react";

export const useChatMessages = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (input.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "user", content: input },
      ]);
      setInput("");
      setIsLoading(true);

      await fetchAIResponse(input);
    }
  };
  const fetchAIResponse = async (userMessage: string) => {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch AI response");
      }

      const data = await response.json();

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          content: data.data.content || "AI sedang ada kesalahan",
        },
      ]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: "Terjadi kesalahan, coba lagi." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // const fetchAIResponse = async (userMessage: string) => {
  //   const response = await fetch("/api/chat", {
  //     method: "POST",
  //     body: JSON.stringify({ message: userMessage }),
  //   });

  //   if (response.body && response.body instanceof ReadableStream) {
  //     const reader = response.body.getReader();
  //     const decoder = new TextDecoder();
  //     let result = "";

  //     reader
  //       .read()
  //       .then(function processText({ done, value }) {
  //         if (done) {
  //           const data = JSON.parse(result);
  //           setMessages((prevMessages) => [
  //             ...prevMessages,
  //             {
  //               role: "assistant",
  //               content: data.data.content
  //                 ? data.data.content
  //                 : "AI sedang ada kesalahan",
  //             },
  //           ]);
  //           setIsLoading(false);
  //           return;
  //         }
  //         result += decoder.decode(value, { stream: true });
  //         reader.read().then(processText);
  //       })
  //       .catch((error) => {
  //         console.error("Error reading stream:", error);
  //         setIsLoading(false);
  //       });
  //   }
  // };

  return {
    messages,
    input,
    isLoading,
    setInput,
    handleSubmit,
  };
};
