const posts = [
  {
    title: "5 Hidden Beaches in Bangladesh You Haven't Explored Yet",
    excerpt:
      "Beyond Cox's Bazar, these quiet coastal spots offer a peaceful escape from crowds.",
    date: 'June 2026',
  },
  {
    title: "A First-Timer's Guide to Sundarbans Boat Safaris",
    excerpt:
      'What to pack, when to go, and what wildlife you can realistically expect to see.',
    date: 'May 2026',
  },
  {
    title: "Planning a Budget Trip to Sylhet's Tea Gardens",
    excerpt:
      'How to experience the rolling green hills without overspending on tours.',
    date: 'April 2026',
  },
];

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="font-heading text-3xl font-bold mb-10">Travel Blog</h1>
      <div className="space-y-8">
        {posts.map(post => (
          <article key={post.title} className="border-b pb-8">
            <p className="text-xs text-gray-400 mb-1">{post.date}</p>
            <h2 className="font-heading text-xl font-semibold mb-2">
              {post.title}
            </h2>
            <p className="text-gray-600 text-sm">{post.excerpt}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
