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
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage, token }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch AI response");
      }
      const data = await response.json();
      const aiContent =
        data?.data?.content ||
        "Maaf sepertinya aku sedang tidak bisa menjawab karena ada kesalahan";
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          content: aiContent,
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

  const fetchToken = async () => {
    try {
        const response = await fetch("/api/token", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        localStorage.setItem("token", data.data);
        if (!response.ok) {
          throw new Error("Failed to fetch AI response");
        }
      } catch (error) {
        console.error("Error fetching AI response:", error);
    }
  };

  return {
    fetchToken,
    messages,
    input,
    isLoading,
    setInput,
    handleSubmit,
  };
};
