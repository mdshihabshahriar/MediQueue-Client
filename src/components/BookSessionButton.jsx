"use client";

import { useState } from "react";
import BookingModal from "./BookingModal";

const BookSessionButton = ({ tutor }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-800 text-purple-50 text-sm font-medium py-3 rounded-xl transition-colors"
      >
         Book a session
      </button>

      <BookingModal tutor={tutor} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default BookSessionButton;