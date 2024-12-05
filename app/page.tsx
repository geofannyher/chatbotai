"use client";

import { BotIcon, UserIcon } from "@/components/icons";
import { Markdown } from "@/components/markdown";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { GrSend } from "react-icons/gr";
import { useChatMessages } from "./hook/useChat";
export default function Home() {
  const { messages, input, isLoading, setInput, handleSubmit } =
    useChatMessages();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="bg-white h-[100dvh]">
      {/* Kontainer Utama */}
      <div className="container mx-auto max-w-[500px] h-full shadow-xl shadow-gray-400 bg-zinc-100 flex flex-col">
        {/* Navbar */}
        <nav className="w-full border-b-2 flex justify-between p-4 text-violet-900">
          <div className="flex gap-4 items-center">
            <img
              src="https://cdn.pixabay.com/photo/2024/05/28/16/39/female-8794201_960_720.png"
              alt="female"
              className="object-cover w-10 h-10 rounded-full"
            />
            <div className="flex flex-col">
              <p className="font-bold">Owdi</p>
              <p className="text-sm">Real Person</p>
            </div>
          </div>
        </nav>

        {/* Kontainer Chat */}
        <div className="flex-grow flex flex-col justify-between overflow-hidden">
          <div className="flex-grow overflow-y-auto px-4 pt-5 pb-14">
            {messages.length > 0 ? (
              <div className="flex flex-col gap-8 text-sm items-center">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    className={`flex flex-row gap-2 w-full ${
                      index === 0 ? "pt-10" : ""
                    } ${
                      message.role === "assistant"
                        ? "justify-start"
                        : "justify-end"
                    }`}
                    initial={{ y: 5, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                  >
                    <div
                      className={`flex ${
                        message.role === "user" ? "flex-row-reverse" : ""
                      } items-center gap-2`}
                    >
                      {/* Icon */}
                      <div className="size-[24px] flex justify-center items-center text-zinc-800">
                        {message.role === "assistant" ? (
                          <BotIcon />
                        ) : (
                          <UserIcon />
                        )}
                      </div>

                      {/* Bubble Chat */}
                      <div
                        className={`rounded-lg px-4 py-2 max-w-[80%] ${
                          message.role === "assistant"
                            ? "bg-main text-second rounded-tl-none"
                            : "bg-second text-main rounded-tr-none"
                        }`}
                      >
                        <Markdown>{message.content}</Markdown>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Loading Bubble */}
                {isLoading &&
                  messages[messages.length - 1]?.role !== "assistant" && (
                    <div className="flex flex-row gap-2 w-full">
                      <div className="size-[24px] flex justify-center items-center text-zinc-800">
                        <BotIcon />
                      </div>
                      <div className="bg-main px-4 py-2 rounded-lg rounded-tl-none text-second">
                        hmm...
                      </div>
                    </div>
                  )}

                {/* Scroll Reference */}
                <div ref={messagesEndRef} />
              </div>
            ) : (
              <motion.div className="h-[350px] px-4 w-full pt-10">
                <div className="bg-gray-200 text-center rounded-lg p-4 flex flex-col gap-4 text-violet-900 text-xs">
                  <p>
                    Percakapan ini bersifat pribadi. Tidak ada pihak manapun
                    yang mengetahui isi chat anda.
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Input Chat */}
        <div className="fixed w-full left-0 bottom-3">
          <form
            className="flex w-full flex-col gap-2 items-center"
            onSubmit={handleSubmit}
          >
            <div className="flex items-center w-full md:max-w-[450px] max-w-[calc(100dvw-32px)] bg-zinc-200 border-zinc-300 border rounded-lg p-2">
              <input
                className="bg-transparent px-3 flex-grow outline-none text-zinc-800 text-sm placeholder-zinc-700"
                placeholder="Send a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                type="submit"
                className="flex-shrink-0 w-12 h-10 flex justify-center items-center rounded-lg bg-main"
              >
                <GrSend className="text-second" size={15} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
