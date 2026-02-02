import { motion } from 'motion/react';
import { Rocket, Users, TrendingUp, Heart, Mail } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export function Careers() {
  const perks = [
    {
      icon: Rocket,
      title: 'Growth & Learning',
      description: 'Work on diverse projects and continuously expand your skill set with the latest technologies.'
    },
    {
      icon: Users,
      title: 'Ownership & Impact',
      description: 'Take ownership of projects and see the direct impact of your work on real businesses.'
    },
    {
      icon: TrendingUp,
      title: 'Early-Stage Opportunity',
      description: 'Join us in the early stages and help shape the future direction of the company.'
    },
    {
      icon: Heart,
      title: 'Collaborative Culture',
      description: 'Work in a transparent, supportive environment where your ideas and contributions matter.'
    }
  ];

  const openings = [
    {
      title: 'Full Stack Developer',
      type: 'Full-time',
      location: 'Remote / India',
      description: 'We\'re looking for experienced full stack developers who can work across the entire technology stack and deliver end-to-end solutions.'
    },
    {
      title: 'Mobile App Developer',
      type: 'Full-time',
      location: 'Remote / India',
      description: 'Join our team to build cutting-edge mobile applications using React Native and Flutter for startups and businesses.'
    },
    {
      title: 'UI/UX Designer',
      type: 'Full-time / Contract',
      location: 'Remote / India',
      description: 'Help us create beautiful, intuitive user experiences that delight users and drive business results.'
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
              Build Your Career at <span className="text-primary">CodingBits</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600">
              We're a growing technology company looking for talented individuals who are passionate about building great products and growing together.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16"
          >
            <img
              src="https://images.unsplash.com/photo-1531539427495-97c44a449837?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwdGVhbSUyMHN0YXJ0dXAlMjBjdWx0dXJlfGVufDF8fHx8MTc2OTk5NjQ0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Team Culture"
              className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Why Join Us */}
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
              Why Join CodingBits?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're building something special, and we want you to be part of it
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {perks.map((perk, index) => (
              <motion.div
                key={perk.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-blue-50 p-8 rounded-2xl"
              >
                <perk.icon className="text-primary mb-4" size={36} />
                <h3 className="text-xl text-gray-900 mb-3">{perk.title}</h3>
                <p className="text-gray-600">{perk.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
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
              Open Positions
            </h2>
            <p className="text-lg text-gray-600">
              Explore opportunities to join our growing team
            </p>
          </motion.div>

          <div className="space-y-6">
            {openings.map((job, index) => (
              <motion.div
                key={job.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 md:p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl text-gray-900 mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                      <span className="px-3 py-1 bg-blue-100 text-primary rounded-full">
                        {job.type}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                        {job.location}
                      </span>
                    </div>
                  </div>
                  <a
                    href={`mailto:adarshpandey@codingbits.in?subject=Application for ${job.title}`}
                    className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-blue-900 transition-colors text-center whitespace-nowrap"
                  >
                    Apply Now
                  </a>
                </div>
                <p className="text-gray-600">{job.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Mail className="mx-auto text-white mb-6" size={48} />
            <h2 className="text-3xl md:text-4xl text-white mb-6">
              Don't See the Right Role?
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              We're always interested in connecting with talented people. Send us your portfolio and let's talk about future opportunities.
            </p>
            <a
              href="mailto:adarshpandey@codingbits.in?subject=Career Inquiry"
              className="inline-block px-8 py-3 bg-white text-primary rounded-lg hover:bg-blue-50 transition-colors"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
