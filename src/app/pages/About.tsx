import { motion } from 'motion/react';
import { Linkedin, Target, Eye, Heart } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export function About() {
  const values = [
    {
      icon: Target,
      title: 'Purpose-Driven',
      description: 'Every solution we build serves a clear business purpose and solves real problems.'
    },
    {
      icon: Eye,
      title: 'Transparent',
      description: 'We maintain open communication and set realistic expectations from day one.'
    },
    {
      icon: Heart,
      title: 'Client-Focused',
      description: 'Your success is our success. We invest ourselves in understanding your goals.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6">
              Building the Future, <span className="text-primary">One Solution at a Time</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600">
              We're a technology services company on a mission to make digital transformation accessible and practical for businesses of all sizes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-gray-600 mb-4">
                CodingBits was founded in 2023 with a simple yet powerful vision: to bridge the gap between complex technology and practical business needs.
              </p>
              <p className="text-gray-600 mb-4">
                We recognized that many businesses struggle not because they lack ambition, but because they lack access to reliable, transparent technology partners who truly understand their challenges.
              </p>
              <p className="text-gray-600">
                Today, we work with startups, founders, and growing businesses across India, helping them leverage technology to scale, optimize, and innovate.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="https://images.unsplash.com/photo-1531539427495-97c44a449837?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwdGVhbSUyMHN0YXJ0dXAlMjBjdWx0dXJlfGVufDF8fHx8MTc2OTk5NjQ0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Technology Team"
                className="w-full h-96 object-cover rounded-2xl shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl text-gray-900 mb-4">
              Meet Our Founder
            </h2>
            <p className="text-lg text-gray-600">
              Leadership rooted in experience and vision
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="md:flex">
              <div className="md:w-1/3">
                <img
                  src="https://images.unsplash.com/photo-1681164314433-7964ccf32bc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBpbmRpYW4lMjB0ZWNoJTIwZm91bmRlciUyMGNlb3xlbnwxfHx8fDE3Njk5OTY0Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Adarsh Kumar Pandey - Founder"
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="p-8 md:w-2/3">
                <h3 className="text-2xl text-gray-900 mb-2">
                  Adarsh Kumar Pandey
                </h3>
                <p className="text-primary mb-4">Founder</p>
                <p className="text-gray-600 mb-6">
                  Adarsh founded CodingBits with a vision to make technology services more accessible, transparent, and results-driven. With expertise in software development and a deep understanding of business challenges, he leads the company with a focus on delivering practical solutions that create real value.
                </p>
                <p className="text-gray-600 mb-6">
                  His approach combines technical excellence with business acumen, ensuring that every project not only meets technical standards but also drives meaningful business outcomes.
                </p>
                <a
                  href="https://www.linkedin.com/in/adarshkumarpandey19101/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:text-blue-900 transition-colors"
                >
                  <Linkedin size={20} />
                  Connect on LinkedIn
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <value.icon className="text-primary" size={32} />
                </div>
                <h3 className="text-xl text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl text-white mb-6">
              Our Vision
            </h2>
            <p className="text-lg text-blue-100">
              To become the most trusted technology partner for businesses looking to scale and innovate. We envision a future where every business, regardless of size, has access to world-class technology solutions that drive meaningful growth and create lasting impact.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
