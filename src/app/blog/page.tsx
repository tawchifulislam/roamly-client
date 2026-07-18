import { Calendar, ArrowRight } from 'lucide-react';
import Container from '@/components/Container';

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
    <Container className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900">
          Travel Blog
        </h1>
        <p className="text-gray-600 mt-3">
          Stories, guides, and tips from the road - curated by the Roamly team.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {posts.map(post => (
          <article
            key={post.title}
            className="rounded-xl border border-gray-200 p-6 flex flex-col hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-3">
              <Calendar size={13} />
              {post.date}
            </div>
            <h2 className="font-heading text-lg font-semibold text-gray-900 mb-2 flex-1">
              {post.title}
            </h2>
            <p className="text-gray-500 text-sm mb-4">{post.excerpt}</p>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-teal-700">
              Read more <ArrowRight size={14} />
            </span>
          </article>
        ))}
      </div>
    </Container>
  );
}
