import { motion } from 'motion/react';
import { Code, Smartphone, Brain, ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export function Services() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const services = [
    {
      id: 'web-development',
      icon: Code,
      title: 'Website Development',
      tagline: 'Your digital presence, perfected',
      description: 'We build modern, responsive websites that not only look great but deliver real business results. From marketing sites to complex web applications, we create digital experiences that engage users and drive conversions.',
      image: 'https://images.unsplash.com/photo-1760548425425-e42e77fa38f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWJzaXRlJTIwZGV2ZWxvcG1lbnQlMjBjb2RlfGVufDF8fHx8MTc2OTk5NjQzOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      whoItsFor: [
        'Startups launching their first product',
        'Businesses needing a modern web presence',
        'Companies scaling their digital operations'
      ],
      whatWeSolve: [
        'Outdated or slow-performing websites',
        'Poor mobile experiences',
        'Difficulty managing and updating content',
        'Low conversion rates'
      ],
      technologies: ['React', 'Next.js', 'Node.js', 'Tailwind CSS', 'TypeScript']
    },
    {
      id: 'mobile-development',
      icon: Smartphone,
      title: 'Mobile Application Development',
      tagline: 'Powerful apps, seamless experiences',
      description: 'We develop native and cross-platform mobile applications that users love. Whether you need an iOS app, Android app, or both, we deliver solutions that are intuitive, performant, and built to scale.',
      image: 'https://images.unsplash.com/photo-1762341119237-98df67c9c3c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXZlbG9wbWVudCUyMHNtYXJ0cGhvbmV8ZW58MXx8fHwxNzY5OTYwMDIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      whoItsFor: [
        'Entrepreneurs with innovative app ideas',
        'Businesses expanding to mobile platforms',
        'Companies modernizing legacy mobile apps'
      ],
      whatWeSolve: [
        'Limited mobile presence',
        'Poor user experience on mobile devices',
        'High development costs for multiple platforms',
        'Difficulty reaching mobile-first customers'
      ],
      technologies: ['React Native', 'Flutter', 'iOS', 'Android', 'Firebase']
    },
    {
      id: 'ai-automation',
      icon: Brain,
      title: 'AI & Automation Solutions',
      tagline: 'Intelligent systems, amplified efficiency',
      description: 'We implement AI-powered solutions and automation workflows that transform how you work. From intelligent chatbots to process automation, we help you leverage artificial intelligence to save time, reduce costs, and unlock new capabilities.',
      image: 'https://images.unsplash.com/photo-1768323275769-6615e7cfcbe4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwYXV0b21hdGlvbiUyMHRlY2h8ZW58MXx8fHwxNzY5OTk2NDM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      whoItsFor: [
        'Businesses with repetitive manual processes',
        'Companies looking to scale operations',
        'Teams seeking data-driven insights'
      ],
      whatWeSolve: [
        'Time-consuming manual tasks',
        'Inconsistent process execution',
        'Limited ability to analyze large datasets',
        'High operational costs'
      ],
      technologies: ['OpenAI', 'TensorFlow', 'Python', 'Automation Tools', 'API Integration']
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
              Technology Services That <span className="text-primary">Drive Results</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600">
              We offer comprehensive digital solutions tailored to your business needs. From web development to AI automation, we build technology that works.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Detail */}
      {services.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={`py-20 px-4 sm:px-6 lg:px-8 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
        >
          <div className="max-w-7xl mx-auto">
            <div className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={index % 2 === 1 ? 'md:order-2' : ''}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-100 rounded-xl mb-4">
                  <service.icon className="text-primary" size={28} />
                </div>
                <h2 className="text-3xl md:text-4xl text-gray-900 mb-3">
                  {service.title}
                </h2>
                <p className="text-lg text-primary mb-4">{service.tagline}</p>
                <p className="text-gray-600 mb-6">{service.description}</p>

                <div className="mb-6">
                  <h3 className="text-xl text-gray-900 mb-3">Who It's For</h3>
                  <ul className="space-y-2">
                    {service.whoItsFor.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-gray-600">
                        <Check className="text-primary flex-shrink-0 mt-1" size={18} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl text-gray-900 mb-3">What We Solve</h3>
                  <ul className="space-y-2">
                    {service.whatWeSolve.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-gray-600">
                        <ArrowRight className="text-primary flex-shrink-0 mt-1" size={18} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2">
                  {service.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-blue-100 text-primary text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={index % 2 === 1 ? 'md:order-1' : ''}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-96 object-cover rounded-2xl shadow-xl"
                />
              </motion.div>
            </div>
          </div>
        </section>
      ))}

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
              Ready to Get Started?
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              Let's discuss which service is right for your business and how we can help you achieve your goals.
            </p>
            <Link
              to="/contact"
              className="inline-block px-8 py-3 bg-white text-primary rounded-lg hover:bg-blue-50 transition-colors"
            >
              Schedule a Consultation
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
