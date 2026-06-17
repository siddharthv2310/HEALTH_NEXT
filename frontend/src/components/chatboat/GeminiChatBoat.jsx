import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { Sparkles, Trash2 } from "lucide-react";
import axios from "axios";
import AppointmentList from "./Appointmentlist";
import DoctorsList from "./DoctorsList";
import AboutDoctor from "./AboutDoctor";
import { toast } from "react-toastify";
import { useAppointments } from "../../context/AppointmentContext";




const GeminiChatBoat = () => {

    const backendUrl=import.meta.env.VITE_BACKEND_URL;
    const { getUserAppointments } = useAppointments();

    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    //   console.log("Chat Open:", isOpen);
    const defaultMessage = {
        id: 1,
        role: "assistant",
        content: "Hello! I'm HealthNest AI. How can I help you today?"
    };

    const [messages, setMessages] = useState([defaultMessage]);
    const bottomRef = useRef(null);
    const [loading, setLoading] = useState(false);
    //const [pendingBooking, setPendingBooking] = useState(null);

    const sendMessage = async () => {
        const messageText = input.trim().toLowerCase();


        if (!messageText) return;


        const userMessage = {
            id: Date.now(),
            role: "user",
            content: messageText,
        };

        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);

        setInput("");

        try {
            setLoading(true);

            const { data } = await axios.post(
                backendUrl + "/api/ai/chat",
                {
                    messages: updatedMessages
                },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );

            if (data.success) {

                const aiMessage = {
                    id: Date.now() + 1,
                    role: "assistant",
                    content: data.aiResponse.reply,
                    doctors: data.aiResponse.doctors || [],
                    doctor: data.aiResponse.doctor || null,
                    appointments: data.aiResponse.appointments || [],
                    suggestedAction: data.aiResponse.suggestedAction || null
                };
                setMessages(prev => [...prev, aiMessage]);
            }

        } catch (error) {
            console.log(error);

            const aiMessage = {
                id: Date.now() + 1,
                role: "assistant",
                content: "Something went wrong. Please try again.",
            };

            setMessages((prev) => [...prev, aiMessage]);
        }
        finally {
            setLoading(false);
        }
    };

    const handleCancel = async (appointmentId) => {

        try {

            const { data } = await axios.post( backendUrl  + "/api/ai/confirm-cancel", { appointmentId }, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });

            if (data.success) {

                toast.success(data.aiResponse.reply);

                setMessages(prev =>
                    prev.map(message => ({
                        ...message,
                        appointments: message.appointments?.map(app =>
                            app.id === appointmentId
                                ? {
                                    ...app,
                                    cancelled: true
                                }
                                : app
                        )
                    }))
                );
                
                await getUserAppointments( backendUrl, localStorage.getItem("token") );

            }

        } catch (error) {

            console.log(error);

        }
    };

    const bookSuggestedSlot = async (
        action
    ) => {

        try {

            const { data } =
                await axios.post(
                    backendUrl + "/api/ai/confirm-booking",
                    {
                        pendingBooking: action
                    },
                    {
                        headers: {
                            Authorization:
                                `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );

            const aiMessage = {
                id: Date.now(),
                role: "assistant",
                content:
                    data.aiResponse.reply
            };

            setMessages(prev => [
                ...prev,
                aiMessage
            ]);

        } catch (error) {

            console.log(error);
        }
    };

    const clearChat = () => {
        const confirmed = window.confirm(
            "Are you sure you want to clear the chat history?"
        );

        if (!confirmed) return;

        localStorage.removeItem("healthnest-chat");

        setMessages([
            {
                id: 1,
                role: "assistant",
                content: "Hello! I'm HealthNest AI. How can I help you today?"
            }
        ]);
    };

    const selectDoctor = async (doctorId) => {

        const userMessage = {
            id: Date.now(),
            role: "user",
            content: `doctor_id:${doctorId}`
        };

        const updatedMessages = [...messages, userMessage];

        setMessages(updatedMessages);

        try {

            const { data } = await axios.post(
                backendUrl+"/api/ai/chat",
                {
                    messages: updatedMessages
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            const aiMessage = {
                id: Date.now() + 1,
                role: "assistant",
                content: data.aiResponse.reply,
                doctor: data.aiResponse.doctor || null
            };
            setMessages(prev => [...prev, aiMessage]);

        } catch (err) {
            console.log(err);
        }
    };


    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };

        window.addEventListener("keydown", handleEscape);

        return () => {
            window.removeEventListener("keydown", handleEscape);
        };
    }, []);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages]);

    useEffect(() => {
        if (isOpen) {
            requestAnimationFrame(() => {
                bottomRef.current?.scrollIntoView({
                    behavior: "auto",
                });
            });
        }
    }, [isOpen]);

    useEffect(() => {
        const savedMessages = localStorage.getItem("healthnest-chat");

        if (savedMessages) {
            const parsed = JSON.parse(savedMessages);

            if (parsed.length > 0) {
                setMessages(parsed);
            }
        }
    }, []);

    useEffect(() => {
        if (messages.length > 0) {
            localStorage.setItem(
                "healthnest-chat",
                JSON.stringify(messages)
            );
        }
    }, [messages]);


    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-slate-900/10  z-40 transition-all duration-300"
                />
            )}

            {/* Chat Window */}
            {isOpen && (
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="fixed bottom-28 right-8 z-50 w-[380px] h-[550px] bg-white rounded-3xl border border-gray-200 shadow-[0_20px_60px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col transition-all duration-300 origin-bottom-right"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 px-5 py-4 text-white">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-lg">
                                        🩺
                                    </div>

                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border border-white" />
                                </div>

                                <div>
                                    <h2 className="font-semibold">HealthNest AI</h2>
                                    <p className="text-xs text-blue-100">
                                        Personal Health Assistant
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">

                                <button
                                    onClick={clearChat}
                                    title="Clear Chat"
                                    className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition"
                                >
                                    <Trash2 size={16} />
                                </button>

                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-8 h-8 rounded-full hover:bg-white/20 transition"
                                >
                                    ✕
                                </button>

                            </div>
                        </div>
                    </div>

                    {/* Body */}
                    {/* Messages Area */}
                    <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"
                                    }`}
                            >
                                <div
                                    className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${message.role === "user"
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-100 text-gray-800"
                                        }`}
                                >

                                    <div>{message.content}</div>

                                    {
                                        message.suggestedAction?.type === "book_slot" && (

                                            <button
                                                onClick={() =>
                                                    bookSuggestedSlot(
                                                        message.suggestedAction
                                                    )
                                                }
                                                className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg"
                                            >
                                                Book {message.suggestedAction.slotTime}
                                            </button>

                                        )
                                    }

                                    <DoctorsList doctors={message.doctors} />

                                    <AboutDoctor doctor={message.doctor} />

                                    <AppointmentList appointments={message.appointments} handleCancel={handleCancel} />



                                </div>
                            </div>
                        ))}

                        {
                            loading && (
                                <div className="flex justify-start">
                                    <div className="bg-gray-100 px-4 py-3 rounded-2xl">
                                        <div className="flex gap-1">
                                            <span className="animate-bounce">•</span>
                                            <span className="animate-bounce delay-100">•</span>
                                            <span className="animate-bounce delay-200">•</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                        <div ref={bottomRef}></div>
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t border-gray-200 bg-white">
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={input}
                                // disabled={loading}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        sendMessage();
                                    }
                                }}
                                placeholder="Ask HealthNest AI..."
                                className="flex-1 px-4 py-3 rounded-xl border border-gray-300 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            />

                            <button
                                onClick={sendMessage}
                                disabled={loading}
                                className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white flex items-center justify-center hover:scale-105 transition">
                                ➤
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Floating AI Button */}
            {!isOpen && (
                <div className="fixed bottom-12 right-8 z-50 animate-float">
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 blur-md opacity-60 animate-glow" />

                    <button
                        onClick={() => setIsOpen((prev) => !prev)}
                        className="relative overflow-hidden flex items-center gap-2 px-6 py-4 rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white font-semibold shadow-2xl hover:scale-110 transition-all duration-300 group"
                    >
                        <span className="absolute top-0 -left-full h-full w-[50%] bg-white/20 skew-x-12 group-hover:left-[150%] transition-all duration-700" />

                        <Sparkles size={20} className="animate-pulse" />

                        <span>Health AI</span>

                        <span className="text-[10px] bg-white text-blue-600 px-2 py-1 rounded-full font-bold">
                            NEW
                        </span>
                    </button>
                </div>
            )};
        </>
    );
};

export default GeminiChatBoat;