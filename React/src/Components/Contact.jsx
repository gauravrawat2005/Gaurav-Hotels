// import { useState } from "react";
// import {
//   IoLocationOutline,
//   IoCallOutline,
//   IoMailOutline,
//   IoTimeOutline,
//   IoSend,
// } from "react-icons/io5";

// export default function Contact() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//   });

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (
//       !form.name ||
//       !form.email ||
//       !form.subject ||
//       !form.message
//     ) {
//       alert("Please fill all fields.");
//       return;
//     }

//     alert("Message Sent Successfully!");

//     setForm({
//       name: "",
//       email: "",
//       subject: "",
//       message: "",
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">

//       {/* Hero */}
//       <section className="bg-[#0B1B2B] text-white py-20">
//         <div className="max-w-7xl mx-auto px-5 text-center">
//           <h1 className="text-4xl md:text-5xl font-bold mb-4">
//             Contact Us
//           </h1>

//           <p className="text-gray-300 max-w-2xl mx-auto">
//             We'd love to hear from you. Whether you have a question about
//             bookings, rooms, pricing or anything else, our team is ready to
//             answer all your questions.
//           </p>
//         </div>
//       </section>

//       {/* Contact Section */}
//       <section className="max-w-7xl mx-auto px-5 py-16 grid lg:grid-cols-2 gap-10">

//         {/* Left */}
//         <div>

//           <h2 className="text-3xl font-bold text-[#0B1B2B] mb-8">
//             Get In Touch
//           </h2>

//           <div className="space-y-6">

//             <div className="flex gap-4">
//               <div className="bg-[#C9973F] text-white p-4 rounded-full h-fit">
//                 <IoLocationOutline size={24} />
//               </div>

//               <div>
//                 <h3 className="font-semibold text-lg">Address</h3>
//                 <p className="text-gray-600">
//                   123 Luxury Avenue,
//                   <br />
//                   New Delhi, India
//                 </p>
//               </div>
//             </div>

//             <div className="flex gap-4">
//               <div className="bg-[#C9973F] text-white p-4 rounded-full h-fit">
//                 <IoCallOutline size={24} />
//               </div>

//               <div>
//                 <h3 className="font-semibold text-lg">Phone</h3>
//                 <p className="text-gray-600">
//                   +91 9876543210
//                 </p>
//               </div>
//             </div>

//             <div className="flex gap-4">
//               <div className="bg-[#C9973F] text-white p-4 rounded-full h-fit">
//                 <IoMailOutline size={24} />
//               </div>

//               <div>
//                 <h3 className="font-semibold text-lg">Email</h3>
//                 <p className="text-gray-600">
//                   support@dsphotels.com
//                 </p>
//               </div>
//             </div>

//             <div className="flex gap-4">
//               <div className="bg-[#C9973F] text-white p-4 rounded-full h-fit">
//                 <IoTimeOutline size={24} />
//               </div>

//               <div>
//                 <h3 className="font-semibold text-lg">
//                   Working Hours
//                 </h3>

//                 <p className="text-gray-600">
//                   Monday - Sunday
//                   <br />
//                   24 × 7 Customer Support
//                 </p>
//               </div>
//             </div>

//           </div>
//         </div>

//         {/* Right */}
//         <div className="bg-white rounded-xl shadow-lg p-8">

//           <h2 className="text-2xl font-bold text-[#0B1B2B] mb-6">
//             Send Message
//           </h2>

//           <form
//             onSubmit={handleSubmit}
//             className="space-y-5"
//           >

//             <input
//               type="text"
//               name="name"
//               placeholder="Your Name"
//               value={form.name}
//               onChange={handleChange}
//               className="w-full border rounded-lg p-3 outline-none focus:border-[#C9973F]"
//             />

//             <input
//               type="email"
//               name="email"
//               placeholder="Email Address"
//               value={form.email}
//               onChange={handleChange}
//               className="w-full border rounded-lg p-3 outline-none focus:border-[#C9973F]"
//             />

//             <input
//               type="text"
//               name="subject"
//               placeholder="Subject"
//               value={form.subject}
//               onChange={handleChange}
//               className="w-full border rounded-lg p-3 outline-none focus:border-[#C9973F]"
//             />

//             <textarea
//               rows="6"
//               name="message"
//               placeholder="Write your message..."
//               value={form.message}
//               onChange={handleChange}
//               className="w-full border rounded-lg p-3 outline-none resize-none focus:border-[#C9973F]"
//             />

//             <button
//               type="submit"
//               className="bg-[#C9973F] hover:bg-[#b78935] text-white px-8 py-3 rounded-lg flex items-center gap-2 transition"
//             >
//               <IoSend />
//               Send Message
//             </button>

//           </form>

//         </div>
//       </section>

//       {/* Google Map */}
//       <section className="pb-20 px-5">

//         <div className="max-w-7xl mx-auto rounded-xl overflow-hidden shadow-lg">

//           <iframe
//             title="Google Map"
//             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83923001922!2d77.06889759383648!3d28.52755440993801!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce2ff5e1f0b01%3A0x53f0c9e5a5f2d4b6!2sNew%20Delhi!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
//             width="100%"
//             height="450"
//             loading="lazy"
//             allowFullScreen=""
//             className="border-0"
//           />
//         </div>

//       </section>

//     </div>
//   );
// }

import { useState } from "react";
import Navbar from "../components/Navbar";
import {
  IoLocationOutline,
  IoCallOutline,
  IoMailOutline,
  IoTimeOutline,
  IoSend,
} from "react-icons/io5";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.subject ||
      !form.message
    ) {
      alert("Please fill all fields.");
      return;
    }

    alert("Message Sent Successfully!");

    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <>
      {/* Navbar */}
      <Navbar />

      <div className="min-h-screen bg-gray-50">

        {/* Hero Section */}
        <section className="bg-[#0B1B2B] text-white pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-5 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Contact Us
            </h1>

            <p className="text-gray-300 max-w-2xl mx-auto">
              We'd love to hear from you. Whether you have a question about
              bookings, rooms, pricing or anything else, our team is ready to
              answer all your questions.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="max-w-7xl mx-auto px-5 py-16 grid lg:grid-cols-2 gap-12">

          {/* Left Side */}
          <div>
            <h2 className="text-3xl font-bold text-[#0B1B2B] mb-8">
              Get In Touch
            </h2>

            <div className="space-y-8">

              <div className="flex gap-5">
                <div className="bg-[#C9973F] text-white p-4 rounded-full h-fit">
                  <IoLocationOutline size={24} />
                </div>

                <div>
                  <h3 className="font-semibold text-lg">Address</h3>
                  <p className="text-gray-600">
                    123 Luxury Avenue
                    <br />
                    New Delhi, India
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="bg-[#C9973F] text-white p-4 rounded-full h-fit">
                  <IoCallOutline size={24} />
                </div>

                <div>
                  <h3 className="font-semibold text-lg">Phone</h3>
                  <p className="text-gray-600">
                    +91 9876543210
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="bg-[#C9973F] text-white p-4 rounded-full h-fit">
                  <IoMailOutline size={24} />
                </div>

                <div>
                  <h3 className="font-semibold text-lg">Email</h3>
                  <p className="text-gray-600">
                    support@dsphotels.com
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="bg-[#C9973F] text-white p-4 rounded-full h-fit">
                  <IoTimeOutline size={24} />
                </div>

                <div>
                  <h3 className="font-semibold text-lg">
                    Working Hours
                  </h3>

                  <p className="text-gray-600">
                    Monday - Sunday
                    <br />
                    24 × 7 Customer Support
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Side */}
          <div className="bg-white rounded-2xl shadow-xl p-8">

            <h2 className="text-2xl font-bold text-[#0B1B2B] mb-6">
              Send Us A Message
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-[#C9973F]"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-[#C9973F]"
              />

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={form.subject}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-[#C9973F]"
              />

              <textarea
                rows="6"
                name="message"
                placeholder="Write your message..."
                value={form.message}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 resize-none outline-none focus:border-[#C9973F]"
              />

              <button
                type="submit"
                className="flex items-center gap-2 bg-[#C9973F] hover:bg-[#b78935] text-white px-8 py-3 rounded-lg transition-all duration-300"
              >
                <IoSend size={18} />
                Send Message
              </button>

            </form>

          </div>
        </section>

      
      </div>
    </>
  );
}