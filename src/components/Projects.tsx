export default function Projects() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[40vh] py-16">
      <h2 className="text-4xl font-bold text-purple-400 mb-8">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="bg-[#18171c] rounded-2xl p-8 shadow-lg flex flex-col items-start"
          >
            <h3 className="text-2xl font-semibold text-purple-300 mb-2">
              Project Title {i}
            </h3>
            <p className="text-gray-400 mb-4">
              Short project description goes here. You can add more details or
              links.
            </p>
            <a href="#" className="text-purple-400 hover:underline">
              View Project
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
