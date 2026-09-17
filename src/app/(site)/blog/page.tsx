"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, CalendarDays, Inbox } from "lucide-react";
import { subscribeBlogPosts, type BlogPost } from "@/lib/blogService";
import Button from "@/components/Button";
import { withBasePath } from "@/lib/paths";

function formatDate(post: BlogPost) {
  if (!post.createdAt) return "";
  return post.createdAt.toDate().toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function BlogContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get("yazi");

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeBlogPosts((data) => {
      setPosts(data);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const activePost = postId ? posts.find((post) => post.id === postId) : null;

  if (postId && activePost) {
    return (
      <section className="container-page py-10 max-w-3xl">
        <button
          onClick={() => router.push(withBasePath("/blog"))}
          className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700 mb-6"
        >
          <ArrowLeft size={16} />
          Tüm Yazılara Dön
        </button>
        {activePost.coverImage && (
          <div className="relative w-full h-[240px] sm:h-[360px] rounded-3xl overflow-hidden mb-6">
            <Image
              src={activePost.coverImage}
              alt={activePost.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="flex items-center gap-2 text-xs text-muted mb-3">
          <CalendarDays size={14} className="text-primary-500" />
          {formatDate(activePost)}
        </div>
        <h1 className="font-extrabold text-3xl sm:text-4xl text-ink leading-tight">
          {activePost.title}
        </h1>
        <div className="mt-6 text-[15px] text-ink-soft leading-relaxed whitespace-pre-line">
          {activePost.content}
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="relative overflow-hidden pb-6">
        <div className="container-page pt-10 lg:pt-14 text-center max-w-2xl mx-auto">
          <h1 className="font-extrabold tracking-tight text-4xl sm:text-[42px] leading-[1.15] text-ink">
            Gayrimenkul Dünyasından
            <br />
            <span className="text-primary-500">Haberler ve Rehberler</span>
          </h1>
          <p className="mt-5 text-muted text-[15px] leading-relaxed">
            Piyasa gelişmeleri, yatırım tavsiyeleri ve sektörel rehberlerle
            gayrimenkul kararlarınızda size yol gösteriyoruz.
          </p>
        </div>
      </section>

      <section className="container-page py-8">
        {loading ? (
          <p className="text-center text-sm text-muted py-10">Yükleniyor...</p>
        ) : posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center gap-3 py-16">
            <Inbox size={28} className="text-muted" />
            <p className="text-sm text-muted">Henüz blog yazısı eklenmedi.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <button
                key={post.id}
                onClick={() => router.push(withBasePath(`/blog?yazi=${post.id}`))}
                className="text-left bg-white rounded-2xl border border-border-soft overflow-hidden hover:shadow-lg hover:shadow-black/5 transition-shadow"
              >
                <div className="relative w-full h-[180px] bg-cream-dark">
                  {post.coverImage && (
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-muted mb-2">
                    <CalendarDays size={13} className="text-primary-500" />
                    {formatDate(post)}
                  </div>
                  <h3 className="font-bold text-ink text-[16px] leading-snug line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-[13.5px] text-muted mt-2 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <span className="inline-block mt-3 text-[13px] font-semibold text-primary-600">
                    Devamını Oku →
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </section>

      <section className="container-page pb-14 text-center">
        <Button href="/iletisim" variant="primary" size="lg">
          Sorularınız İçin Bize Ulaşın
        </Button>
      </section>
    </>
  );
}

export default function BlogPage() {
  return (
    <Suspense fallback={null}>
      <BlogContent />
    </Suspense>
  );
}
