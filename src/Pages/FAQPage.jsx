import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    question: "How do I join a contest?",
    answer:
      "Go to the contest page, click the register/pay button, complete payment, and you'll be able to submit your task.",
  },
  {
    question: "How is the winner selected?",
    answer:
      "The contest creator reviews all submissions and selects the winner. The result is displayed on the contest page.",
  },
  {
    question: "Can I join multiple contests?",
    answer:
      "Yes, you can join as many contests as you want as long as the deadline has not passed.",
  },
  {
    question: "What payment methods are supported?",
    answer:
      "We support secure online payments (Stripe). All transactions are encrypted and safe.",
  },
  {
    question: "Can I create contests as a normal user?",
    answer:
      "To create contests, your role must be 'creator'. You can request role update from the admin panel.",
  },
  {
    question: "What if I miss the contest deadline?",
    answer:
      "You won’t be able to submit your task after the deadline. Please join and submit early.",
  },
];

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="min-h-screen py-16 px-6 
      bg-gradient-to-br from-yellow-300 via-yellow-200 to-yellow-400 
      relative overflow-hidden">

      {/* Decorative gradient circles */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-500 opacity-20 rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-400 opacity-20 rounded-full blur-2xl"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-6">
          Frequently Asked Questions
        </h2>

        <p className="text-center text-gray-700 mb-12 md:text-lg">
          Have questions? We have answers. Learn how ContestHub works!
        </p>

        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg 
              transition-all duration-300 hover:shadow-xl border border-white"
            >
              <button
                className="w-full flex items-center justify-between text-left"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-semibold text-gray-900">
                  {faq.question}
                </span>

                <FaChevronDown
                  className={`transition-transform duration-300 text-gray-700 
                  ${openIndex === index ? "rotate-180" : ""}`}
                />
              </button>

              {openIndex === index && (
                <p className="mt-3 text-gray-700 leading-relaxed">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQPage;
