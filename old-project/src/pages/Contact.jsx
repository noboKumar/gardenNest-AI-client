import React, { useState } from "react";
import { FaFacebook, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <main className="min-h-screen text-base-content py-10 px-4 md:px-10">
      <section className="max-w-3xl mx-auto">
        <div className="flex flex-col items-center mb-10">
          <h1 className="text-3xl font-bold text-primary mb-2">Contact Us</h1>
          <p className="text-center max-w-md text-base-content/80">
            Have a question, suggestion, or need help? We’d love to hear from
            you! Fill out the form below and our team will get back to you as
            soon as possible.
          </p>
        </div>

        <div className="bg-base-200 rounded-lg shadow p-6">
          {submitted ? (
            <div className="text-center py-8">
              <h2 className="text-2xl font-semibold text-primary">
                Thank You!
              </h2>
              <p className="mt-2">
                Your message has been sent. We’ll get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-medium mb-1" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="input input-bordered w-full"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block font-medium mb-1" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="input input-bordered w-full"
                  placeholder="you@email.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block font-medium mb-1" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  className="textarea textarea-bordered w-full min-h-[100px]"
                  placeholder="How can we help you?"
                  value={form.message}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-primary w-full text-white">
                Send Message
              </button>
            </form>
          )}
        </div>

        {/* Optional: Contact info or social links */}
        <div className="mt-10 text-center text-base-content/70">
          <p>
            Or email us directly at{" "}
            <a
              href="mailto:info@gardennest.com"
              className="text-primary font-semibold hover:underline"
            >
              info@gardennest.com
            </a>
          </p>
          <nav className="flex items-center justify-center text-3xl py-10 gap-2">
            <a
              className="link link-hover"
              href="https://www.facebook.com/"
              target="_blank"
            >
              <span className="flex items-center gap-2">
                <FaFacebook></FaFacebook>
              </span>
            </a>
            <a className="link link-hover" href="http://x.com/" target="_blank">
              <span className="flex items-center gap-2">
                <FaTwitter></FaTwitter>
              </span>
            </a>
            <a
              className="link link-hover"
              href="https://www.instagram.com/"
              target="_blank"
            >
              <span className="flex items-center gap-2">
                <FaInstagram></FaInstagram>
              </span>
            </a>
            <a
              className="link link-hover"
              href="https://github.com/"
              target="_blank"
            >
              <span className="flex items-center gap-2">
                <FaGithub></FaGithub>
              </span>
            </a>
          </nav>
        </div>
      </section>
    </main>
  );
};

export default Contact;
