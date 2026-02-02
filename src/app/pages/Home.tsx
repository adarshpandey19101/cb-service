import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Smartphone, Brain, CheckCircle } from 'lucide-react';
import { SEO } from '@/app/components/SEO';
import heroImage from '/Users/adarshkumarpandey21/.gemini/antigravity/brain/7ac1f6f6-8985-450e-9094-73175bd19f4b/hero_tech_network_1770059465837.png';
import aboutImage from '/Users/adarshkumarpandey21/.gemini/antigravity/brain/7ac1f6f6-8985-450e-9094-73175bd19f4b/about_tech_collaboration_1770059550200.png';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export function Home() {
  const services = [
    {
      icon: Code,
      title: 'Website Development',
      description: 'Modern, responsive websites built with the latest technologies to help your business grow online.',
      link: '/services#web-development'
    },
    {
      icon: Smartphone,
      title: 'Mobile Applications',
      description: 'Native and cross-platform mobile apps that deliver seamless experiences on iOS and Android.',
      link: '/services#mobile-development'
    },
    {
      icon: Brain,
      title: 'AI & Automation',
      description: 'Intelligent solutions that automate workflows and enhance efficiency through artificial intelligence.',
      link: '/services#ai-automation'
    }
  ];

  const philosophy = [
    {
      title: 'Clear Communication',
      description: 'We believe in transparent, honest dialogue throughout every project.'
    },
    {
      title: 'Quality First',
      description: 'We build solutions that are reliable, scalable, and built to last.'
    },
    {
      title: 'Practical Approach',
      description: 'We focus on real business outcomes, not just technical complexity.'
    },
    {
      title: 'Continuous Learning',
      description: 'We stay current with technology trends to deliver modern solutions.'
    }
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Home - Building Digital Solutions That Drive Growth"
        description="CodingBits is a technology services company helping startups and businesses build modern web applications, mobile apps, and AI automation solutions."
      />
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerChildren}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6"
            >
              Building Digital Solutions That{' '}
              <span className="text-primary">Drive Growth</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            >
              We're a technology services company helping startups and businesses transform their ideas into powerful digital products.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                to="/contact"
                className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-blue-900 transition-colors flex items-center gap-2"
              >
                Talk to Us
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/services"
                className="px-8 py-3 bg-white text-primary border-2 border-primary rounded-lg hover:bg-blue-50 transition-colors"
              >
                Explore Services
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 relative"
          >
            <img
              src={heroImage}
              alt="Technology Network"
              className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
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
                Founded on the belief that <span className="text-primary">technology should empower</span>
              </h2>
              <p className="text-gray-600 mb-4">
                CodingBits was founded in 2023 with a clear vision: to help businesses leverage technology in practical, meaningful ways.
              </p>
              <p className="text-gray-600 mb-6">
                We work with startups, founders, and growing businesses to build digital products that solve real problems. Our approach combines technical expertise with a deep understanding of business needs.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center text-primary hover:text-blue-900 transition-colors gap-2"
              >
                Learn More About Us
                <ArrowRight size={20} />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={aboutImage}
                alt="Modern Tech Office"
                className="w-full h-96 object-cover rounded-2xl shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl text-gray-900 mb-4">
              Our Philosophy
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We believe in building lasting relationships through transparency, quality, and practical solutions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {philosophy.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <CheckCircle className="text-primary mb-4" size={32} />
                <h3 className="text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
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
              What We Do
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We offer comprehensive technology services to help your business succeed in the digital world.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-blue-50 p-8 rounded-2xl hover:shadow-lg transition-shadow group"
              >
                <service.icon className="text-primary mb-4 group-hover:scale-110 transition-transform" size={40} />
                <h3 className="text-xl text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link
                  to={service.link}
                  className="inline-flex items-center text-primary hover:text-blue-900 transition-colors gap-2"
                >
                  Learn More
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl text-white mb-6">
              Ready to Transform Your Ideas?
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              Let's discuss how we can help you build the digital solutions your business needs.
            </p>
            <Link
              to="/contact"
              className="inline-block px-8 py-3 bg-white text-primary rounded-lg hover:bg-blue-50 transition-colors"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}