"use client";

import useCommonState from "@/app/src/hooks/useCommonState";

export default function ContactForm() {
  const { common, setCommon } = useCommonState();
  const handleSubmit = (e) => {
    e.preventDefault();
    setCommon({
      ...common,
      toast: true,
      toastMessage: "Message Sent successfully !",
    });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full md:w-1/2 min-h-screen py-[50px]"
    >
      <div className="flex justify-center items-center mb-2 flex-col">
        <button className="btn">Contact Us</button>
        <p className="text-xs mb-2 mt-2 text-gray-300">
          Join now and be the first to discover our exclusive designs, special
          deals, and new arrivals!
        </p>
      </div>
      <div className="form-control">
        <label htmlFor="name">Name</label>
        <input type="text" placeholder="Name" name="name" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16px"
          height="16px"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="svg lucide lucide-receipt-text"
        >
          <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
          <path d="M14 8H8" />
          <path d="M16 12H8" />
          <path d="M13 16H8" />
        </svg>
      </div>
      <div className="form-control">
        <label htmlFor="name">Email</label>
        <input type="text" placeholder="Email" name="email" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16px"
          height="16px"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="svg lucide lucide-mail"
        >
          <rect width={20} height={16} x={2} y={4} rx={2} />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      </div>
      <div className="form-control">
        <label htmlFor="name">Subject</label>
        <input type="text" placeholder="Subject" name="subject" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16px"
          height="16px"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="svg lucide lucide-book-user"
        >
          <path d="M15 13a3 3 0 1 0-6 0" />
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
          <circle cx={12} cy={8} r={2} />
        </svg>
      </div>
      <div className="form-control">
        <label htmlFor="name">Message</label>
        <textarea type="text" placeholder="Message" rows={4} name="message" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={16}
          height={16}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="svg lucide lucide-message-square"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </div>

      <button className="btn mt-4">Submit</button>
    </form>
  );
}
