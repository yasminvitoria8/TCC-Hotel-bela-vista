import { useEffect } from "react";
import { ChatWidget } from "./components/chatbot/ChatWidget";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { RoomsSection } from "./components/sections/RoomsSection";
import { ExperienceSection } from "./components/sections/ExperienceSection";
import { LocationSection } from "./components/sections/LocationSection";
import { initializeReservations } from "./services/reservationService";

export default function App() {
  useEffect(() => {
    initializeReservations();
  }, []);

  function openChat() {
    window.dispatchEvent(new CustomEvent("open-hotel-chat"));
  }

  return (
    <div className="min-h-screen bg-white text-ink">
      <Header onReserve={openChat} />
      <main>
        <Hero onReserve={openChat} />
        <About />
        <RoomsSection onReserve={openChat} />
        <ExperienceSection />
        <LocationSection />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}