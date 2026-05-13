import React from "react";

const AboutUs = () => {
  return (
    <main className="min-h-screen text-base-content py-10 px-4 md:px-10">
      <section className="max-w-5xl mx-auto">
        {/* Brand Logo & Title */}
        <div className="flex flex-col items-center gap-4 mb-10">
          <h1 className="text-4xl font-bold text-primary mb-2 text-center">About Garden Nest</h1>
          <p className="max-w-2xl text-center text-lg text-base-content/80">
            Welcome to Garden Nest – your community hub for gardening inspiration, tips, and sharing! Whether you’re new to gardening or a seasoned grower, our platform helps you connect, learn, and flourish together.
          </p>
        </div>

        {/* Mission */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-secondary mb-2">Our Mission</h2>
          <p className="text-base md:text-lg">
            Our mission is to make gardening accessible and joyful for everyone. We believe that by sharing experiences, advice, and support, we can help gardens – and gardeners – thrive everywhere.
          </p>
        </section>

        {/* What We Offer */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-secondary mb-2">What We Offer</h2>
          <ul className="list-disc pl-6 space-y-3 text-base md:text-lg">
            <li>
              <span className="font-medium text-primary">Gardening Tips & Guides:</span> Explore practical advice and best practices for all kinds of gardens.
            </li>
            <li>
              <span className="font-medium text-primary">Featured Gardeners:</span> Meet passionate gardeners and learn from their journeys.
            </li>
            <li>
              <span className="font-medium text-primary">Interactive Forums:</span> Join our community discussions to ask questions, share your progress, and get help.
            </li>
            <li>
              <span className="font-medium text-primary">Inspiring Campaigns:</span> Discover special projects, challenges, and seasonal highlights.
            </li>
            <li>
              <span className="font-medium text-primary">Resource Library:</span> Access curated articles, how-tos, and troubleshooting tips.
            </li>
          </ul>
        </section>

        {/* Community Values */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-secondary mb-2">Our Values</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Exclusivity and respect for all gardeners, regardless of experience.</li>
            <li>Knowledge sharing and support.</li>
            <li>Sustainable and responsible gardening practices.</li>
            <li>Celebrating creativity and diversity in gardening styles.</li>
          </ul>
        </section>

        {/* Call to Action */}
        <section className="text-center mt-16">
          <h3 className="text-xl font-semibold mb-2 text-primary">Ready to Grow with Us?</h3>
          <p className="mb-4 text-base md:text-lg">
            Join Garden Nest today and become part of a friendly, thriving gardening community. Whether you want to share your story, ask a question, or find inspiration, we’re here to help you grow!
          </p>
          <a
            href="/register"
            className="inline-block px-6 py-2 rounded bg-primary text-white font-medium hover:bg-primary-focus transition"
          >
            Get Started
          </a>
        </section>
      </section>
    </main>
  );
};

export default AboutUs;