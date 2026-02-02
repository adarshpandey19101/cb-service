import { motion } from 'motion/react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export function TermsConditions() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl text-gray-900 mb-4">
              Terms & Conditions
            </h1>
            <p className="text-gray-600">
              Last updated: February 2, 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto prose prose-lg"
        >
          <div className="text-gray-600 space-y-8">
            <section>
              <h2 className="text-2xl text-gray-900 mb-4">Agreement to Terms</h2>
              <p>
                These Terms and Conditions ("Terms") govern your use of the CodingBits website and services. By accessing or using our website and services, you agree to be bound by these Terms. If you do not agree with these Terms, please do not use our website or services.
              </p>
              <p>
                CodingBits reserves the right to modify these Terms at any time. We will notify you of any changes by posting the updated Terms on our website. Your continued use of our services after such modifications constitutes your acceptance of the updated Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-gray-900 mb-4">Services</h2>
              <p>
                CodingBits provides technology services including but not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Website development</li>
                <li>Mobile application development</li>
                <li>AI and automation solutions</li>
                <li>Technical consulting</li>
                <li>Custom software development</li>
              </ul>
              <p>
                The specific scope, deliverables, timelines, and pricing for each project will be outlined in a separate agreement or statement of work.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-gray-900 mb-4">User Responsibilities</h2>
              <p>
                When using our services, you agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate and complete information</li>
                <li>Maintain the confidentiality of your account credentials</li>
                <li>Use our services only for lawful purposes</li>
                <li>Not interfere with or disrupt our services or servers</li>
                <li>Not attempt to gain unauthorized access to our systems</li>
                <li>Respect intellectual property rights</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl text-gray-900 mb-4">Intellectual Property Rights</h2>
              <h3 className="text-xl text-gray-900 mb-3">Our Rights</h3>
              <p>
                Unless otherwise specified in a project agreement, CodingBits retains ownership of all intellectual property rights in:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Our website content and design</li>
                <li>Our proprietary tools, frameworks, and methodologies</li>
                <li>Pre-existing code and components we incorporate into projects</li>
              </ul>

              <h3 className="text-xl text-gray-900 mb-3 mt-6">Your Rights</h3>
              <p>
                Upon full payment for services rendered, you will receive the agreed-upon rights to the deliverables as specified in your project agreement. This typically includes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Rights to use the final deliverables for your business purposes</li>
                <li>Source code for custom-developed features (where applicable)</li>
                <li>Rights specified in your project-specific agreement</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl text-gray-900 mb-4">Payment Terms</h2>
              <p>
                Payment terms will be specified in each project agreement. Generally:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Payment schedules and milestones will be clearly defined</li>
                <li>Invoices are due within the timeframe specified (typically 15-30 days)</li>
                <li>Late payments may incur additional fees</li>
                <li>We reserve the right to suspend services for non-payment</li>
                <li>All fees are in Indian Rupees (INR) unless otherwise specified</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl text-gray-900 mb-4">Project Timelines and Delays</h2>
              <p>
                We strive to meet all agreed-upon timelines. However, timelines may be affected by:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Delays in receiving required information or materials from you</li>
                <li>Changes in project scope or requirements</li>
                <li>Technical issues beyond our reasonable control</li>
                <li>Force majeure events</li>
              </ul>
              <p className="mt-4">
                We will communicate any anticipated delays promptly and work with you to minimize impact.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-gray-900 mb-4">Confidentiality</h2>
              <p>
                We respect the confidentiality of your business information. We will:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Not disclose your confidential information to third parties without your consent</li>
                <li>Use your information only for the purpose of providing our services</li>
                <li>Implement reasonable security measures to protect your information</li>
              </ul>
              <p className="mt-4">
                For projects requiring enhanced confidentiality, we are happy to sign a mutual Non-Disclosure Agreement (NDA).
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-gray-900 mb-4">Warranties and Disclaimers</h2>
              <p>
                We warrant that:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Services will be performed in a professional and workmanlike manner</li>
                <li>Deliverables will materially conform to agreed-upon specifications</li>
                <li>We have the right to provide the services</li>
              </ul>
              <p className="mt-4">
                EXCEPT AS EXPRESSLY PROVIDED, OUR SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT OUR SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-gray-900 mb-4">Limitation of Liability</h2>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, CODINGBITS SHALL NOT BE LIABLE FOR:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Indirect, incidental, special, consequential, or punitive damages</li>
                <li>Loss of profits, revenue, data, or business opportunities</li>
                <li>Damages exceeding the amount paid to us in the 12 months preceding the claim</li>
              </ul>
              <p className="mt-4">
                This limitation applies regardless of the legal theory upon which the claim is based.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-gray-900 mb-4">Termination</h2>
              <p>
                Either party may terminate a project agreement:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>By mutual written agreement</li>
                <li>For material breach by the other party (with reasonable opportunity to cure)</li>
                <li>If the other party becomes insolvent or bankrupt</li>
              </ul>
              <p className="mt-4">
                Upon termination, you agree to pay for all services performed up to the termination date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-gray-900 mb-4">Dispute Resolution</h2>
              <p>
                In the event of any dispute arising from these Terms or our services, the parties agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>First attempt to resolve the dispute through good faith negotiations</li>
                <li>If negotiations fail, consider mediation before pursuing legal action</li>
                <li>Submit to the jurisdiction of courts in India</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl text-gray-900 mb-4">General Provisions</h2>
              <h3 className="text-xl text-gray-900 mb-3">Governing Law</h3>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of India.
              </p>

              <h3 className="text-xl text-gray-900 mb-3 mt-6">Entire Agreement</h3>
              <p>
                These Terms, together with any project-specific agreements, constitute the entire agreement between you and CodingBits regarding our services.
              </p>

              <h3 className="text-xl text-gray-900 mb-3 mt-6">Severability</h3>
              <p>
                If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in full force and effect.
              </p>

              <h3 className="text-xl text-gray-900 mb-3 mt-6">Waiver</h3>
              <p>
                Our failure to enforce any right or provision of these Terms will not constitute a waiver of such right or provision.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-gray-900 mb-4">Contact Information</h2>
              <p>
                If you have any questions about these Terms & Conditions, please contact us:
              </p>
              <div className="mt-4 p-6 bg-blue-50 rounded-lg">
                <p className="mb-2"><strong>CodingBits</strong></p>
                <p className="mb-2">Email: adarshpandey@codingbits.in</p>
                <p className="mb-2">Phone: +91 8810220691</p>
                <p>Location: India</p>
              </div>
            </section>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
