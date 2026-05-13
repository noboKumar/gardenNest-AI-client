import React, { useRef } from "react";
import Swal from "sweetalert2";

const JoinEventModal = () => {
  const formRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = formRef.current;
    const formData = new FormData(form);
    const { name } = Object.fromEntries(formData.entries());

    document.getElementById("join_event_modal").close();

    Swal.fire({
      icon: "success",
      title: `Thank you, ${name}!`,
      text: "You have successfully joined the event.",
      timer: 1800,
      showConfirmButton: false,
    });

    form.reset();
  };

  return (
    <dialog id="join_event_modal" className="modal">
      <div className="modal-box bg-base-200">
        <form ref={formRef} method="dialog" onSubmit={handleSubmit}>
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => document.getElementById("join_event_modal").close()}
            tabIndex={-1}
          >
            ✕
          </button>
          <h3 className="font-bold text-lg">Join Event</h3>
          <div className="py-4 space-y-3">
            <input
              type="text"
              name="name"
              className="input input-bordered w-full"
              placeholder="Your Name"
              required
            />
            <input
              type="email"
              name="email"
              className="input input-bordered w-full"
              placeholder="Your Email"
              required
            />
            <input
              type="tel"
              name="phone"
              className="input input-bordered w-full"
              placeholder="Your Phone Number"
              required
            />
            <input
              type="text"
              name="location"
              className="input input-bordered w-full"
              placeholder="Your Location"
              required
            />
            <select
              name="gender"
              className="select select-bordered w-full"
              required
              defaultValue=""
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <input
              type="text"
              name="interest"
              className="input input-bordered w-full"
              placeholder="Why do you want to join? (optional)"
            />
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="terms"
                value="accepted"
                className="checkbox"
                required
              />
              <span>
                I accept the{" "}
                <a
                  href="/aboutUs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link link-primary"
                >
                  terms and conditions
                </a>
              </span>
            </label>
          </div>
          <div className="modal-action">
            <button type="submit" className="btn btn-primary w-full text-white">
              Confirm
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default JoinEventModal;
