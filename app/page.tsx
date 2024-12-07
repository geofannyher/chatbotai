"use client";

import { BotIcon, UserIcon } from "@/components/icons";
import { Markdown } from "@/components/markdown";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { GrSend } from "react-icons/gr";
import { useChatMessages } from "./hook/useChat";
export default function Home() {
  const { messages, input, isLoading, setInput, handleSubmit, fetchToken } =
    useChatMessages();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    fetchToken();
  }, []);
  const imgurl =
    "https://res.cloudinary.com/dcd1jeldi/image/upload/v1733550876/WhatsApp_Image_2024-12-06_at_11.18.19_PM_fqemyd.jpg";
  return (
    <div className="bg-white h-[100dvh]">
      <div className="container mx-auto max-w-[500px] h-full shadow-xl shadow-gray-400 bg-zinc-100 flex flex-col">
        <nav className="w-full border-b-2 flex justify-between p-4 text-violet-900">
          <div className="flex gap-4 items-center">
            <div className="relative">
              <img
                src={imgurl}
                alt="female"
                className="shadow-lg object-cover w-10 h-10 rounded-full"
              />
              <div className="absolute top-0 right-0">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <p className="font-bold">Azril</p>
              <p className="text-sm">Anak Magang Ekraf</p>
            </div>
          </div>
        </nav>

        <div className="flex-grow flex flex-col justify-between overflow-hidden">
          <div className="flex-grow overflow-y-auto px-4 pt-5 mb-20">
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
                      <div className="flex justify-center items-center text-zinc-800">
                        {message.role === "assistant" ? (
                          <img
                            src={imgurl}
                            alt="assistant"
                            className="object-cover w-7 h-7 rounded-full"
                          />
                        ) : (
                          <UserIcon />
                        )}
                      </div>

                      <div
                        className={`relative rounded-lg px-4 py-2 max-w-[80%] ${
                          message.role === "assistant"
                            ? "bg-main text-second"
                            : "bg-second text-main"
                        }`}
                      >
                        <Markdown>{message.content}</Markdown>

                        <div
                          className={`absolute w-0 h-0 border-l-8 border-r-8 ${
                            message.role === "assistant"
                              ? "border-t-8 border-t-main border-r-[#f4f4f5] border-l-[#f4f4f5] top-full transform -translate-x-1/2"
                              : "border-t-8 border-t-second right-5 border-r-[#f4f4f5] border-l-[#f4f4f5] top-full transform translate-x-1/2"
                          }`}
                        ></div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {isLoading &&
                  messages[messages.length - 1]?.role !== "assistant" && (
                    <div className="flex flex-row gap-2 w-full">
                      <img
                        src={imgurl}
                        alt="assistant"
                        className="object-cover w-7 h-7 rounded-full"
                      />

                      <div className="relative bg-main px-4 py-2 rounded-lg text-second">
                        <div className="flex justify-center items-center gap-1 mt-2">
                          <div className="ball"></div>
                          <div className="ball"></div>
                          <div className="ball"></div>
                        </div>

                        <div className="absolute w-0 h-0 border-l-8 border-r-8 border-t-8 border-t-main border-r-[#f4f4f5] border-l-[#f4f4f5] top-full transform -translate-x-1/2"></div>
                      </div>
                    </div>
                  )}

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
