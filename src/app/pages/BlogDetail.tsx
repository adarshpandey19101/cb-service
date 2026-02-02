import { motion } from 'motion/react';
import { Link, useParams } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export function BlogDetail() {
  const { id } = useParams();

  // Mock blog post data - in real app, this would fetch from API
  const post = {
    id: id,
    title: 'Building Scalable Web Applications: Best Practices for 2025',
    image: 'https://images.unsplash.com/photo-1760548425425-e42e77fa38f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWJzaXRlJTIwZGV2ZWxvcG1lbnQlMjBjb2RlfGVufDF8fHx8MTc2OTk5NjQzOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    date: 'January 28, 2026',
    readTime: '8 min read',
    category: 'Web Development',
    author: 'CodingBits Team',
    content: `
      <p>In today's fast-paced digital landscape, building web applications that can scale efficiently is more important than ever. Whether you're launching a startup or expanding an existing business, the decisions you make early in development can significantly impact your application's long-term success.</p>

      <h2>Understanding Scalability</h2>
      <p>Scalability isn't just about handling more users—it's about maintaining performance, reliability, and user experience as your application grows. This requires careful planning and architectural decisions from the very beginning.</p>

      <h2>Key Principles for Scalable Architecture</h2>
      
      <h3>1. Modular Design</h3>
      <p>Breaking your application into smaller, independent modules allows for easier maintenance, testing, and scaling. Each module can be developed, deployed, and scaled independently based on demand.</p>

      <h3>2. Database Optimization</h3>
      <p>Your database is often the bottleneck in web applications. Implementing proper indexing, query optimization, and considering database sharding for large datasets can dramatically improve performance.</p>

      <h3>3. Caching Strategies</h3>
      <p>Implementing effective caching at multiple levels—from browser caching to server-side caching and CDNs—can reduce server load and improve response times significantly.</p>

      <h3>4. Asynchronous Processing</h3>
      <p>For time-consuming tasks, implementing asynchronous processing using message queues ensures your application remains responsive while handling heavy workloads in the background.</p>

      <h2>Technology Choices Matter</h2>
      <p>Selecting the right technology stack is crucial. Modern frameworks like React, Next.js, and Node.js offer excellent scalability features when properly implemented. However, the best technology is the one that aligns with your team's expertise and your specific use case.</p>

      <h2>Monitoring and Optimization</h2>
      <p>Continuous monitoring of your application's performance helps identify bottlenecks before they become critical issues. Implement proper logging, monitoring tools, and regular performance audits.</p>

      <h2>Conclusion</h2>
      <p>Building scalable web applications requires thoughtful planning, proper architecture, and ongoing optimization. By following these best practices and staying current with industry trends, you can create applications that grow seamlessly with your business.</p>

      <p>At CodingBits, we specialize in building scalable web applications that are designed for growth. If you're planning to build or scale your web presence, we'd love to discuss how we can help.</p>
    `
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-primary hover:text-blue-900 transition-colors mb-6"
            >
              <ArrowLeft size={20} />
              Back to Blog
            </Link>
            <span className="inline-block px-3 py-1 bg-primary text-white text-sm rounded-full mb-4">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-6">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-600">
              <span className="flex items-center gap-2">
                <Calendar size={16} />
                {post.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock size={16} />
                {post.readTime}
              </span>
              <span>By {post.author}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-96 object-cover rounded-2xl shadow-xl"
          />
        </motion.div>
      </section>

      {/* Content */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-3xl mx-auto prose prose-lg prose-blue"
        >
          <div
            className="text-gray-600 leading-relaxed space-y-6"
            dangerouslySetInnerHTML={{ __html: post.content }}
            style={{
              fontSize: '1.125rem',
              lineHeight: '1.75'
            }}
          />
        </motion.article>

        {/* Share Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-3xl mx-auto mt-12 pt-8 border-t border-gray-200"
        >
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Share this article</span>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-primary rounded-lg hover:bg-blue-100 transition-colors">
              <Share2 size={18} />
              Share
            </button>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl text-gray-900 mb-6">
              Need Help With Your Project?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              We specialize in building scalable web applications. Let's discuss how we can help bring your ideas to life.
            </p>
            <Link
              to="/contact"
              className="inline-block px-8 py-3 bg-primary text-white rounded-lg hover:bg-blue-900 transition-colors"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
