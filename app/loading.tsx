export default function Loading() {
  const messages = [
      "Almost there! Retrieving your latest blog posts and interactions.",
      "Fetching your recent activity. Hang tight!",
      "Setting up your view.",
      "Loading spicy blogs.",
      "Preparing the freshest content for you.",
      "Just a moment, curating your latest posts.",
      "Gathering all the juicy details for you.",
      "Organizing your feed for an awesome experience.",
      "Working on fetching new and exciting content.",
      "Hang tight, were getting your blog posts ready.",
      "Crafting a personalized experience for you.",
      "Spicing things up with the latest updates.",
      "Loading your favorite reads just for you.",
      "Almost done! Bringing your blog posts to life.",
  ];

  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#f1f5f9]">
          <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-[#6b7280]" />
          <div className="mt-8 text-2xl font-bold text-[#374151]">Loading...</div>
          <div className="mt-4 text-[#6b7280]">{randomMessage}</div>
      </div>
  );
}
