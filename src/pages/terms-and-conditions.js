import React from "react";
import Link from "next/link";

import Layout from "@layout/Layout";
import useGetSetting from "@hooks/useGetSetting";
import PageHeader from "@components/header/PageHeader";
import CMSkeleton from "@components/preloader/CMSkeleton";
import useUtilsFunction from "@hooks/useUtilsFunction";

const TermAndConditions = () => {
  const { showingTranslateValue } = useUtilsFunction();
  const { storeCustomizationSetting, loading, error } = useGetSetting();

  if (loading) {
    return (
      <Layout
        title="Terms & Conditions"
        description="This is terms and conditions page"
      >
        <PageHeader
          headerBg={storeCustomizationSetting?.term_and_condition?.header_bg}
          title={showingTranslateValue(
            storeCustomizationSetting?.term_and_condition?.title
          )}
        />
        <div className="bg-leather-white">
          <div className="max-w-screen-2xl mx-auto lg:py-20 py-10 px-3 sm:px-10">
            <div className="max-w-4xl mx-auto">
              <CMSkeleton
                html
                count={15}
                height={15}
                error={error}
                loading={loading}
                data={
                  storeCustomizationSetting?.term_and_condition?.description
                }
              />
              <br />
              <CMSkeleton count={15} height={15} loading={loading} />
              <br />
              <CMSkeleton count={15} height={15} loading={loading} />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title="Terms & Conditions"
      description="This is terms and conditions page"
    >
      <PageHeader
        headerBg={storeCustomizationSetting?.term_and_condition?.header_bg}
        title={showingTranslateValue(
          storeCustomizationSetting?.term_and_condition?.title
        )}
      />
      <div className="bg-leather-white">
        <div className="max-w-screen-2xl mx-auto lg:py-20 py-10 px-3 sm:px-10">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <div className="mb-8 lg:mb-12 last:mb-0">
              <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-4 text-leather-black">
                Acceptance of Terms
              </h2>
              <div className="font-sans leading-7 text-leather-charcoal-700">
                <p>
                  By accessing and purchasing from LeatherCraft, you accept and
                  agree to be bound by these Terms and Conditions. Our
                  handcrafted leather goods are subject to the following terms.
                </p>
              </div>
            </div>

            <div className="mb-8 lg:mb-12 last:mb-0">
              <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-4 text-leather-black">
                Product Information & Authenticity
              </h2>
              <div className="font-sans leading-7 text-leather-charcoal-700">
                <p>All leather products featured on our platform are:</p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>
                    Handcrafted using genuine leather and traditional techniques
                  </li>
                  <li>Photographed to represent actual colors and textures</li>
                  <li>
                    Subject to natural variations in leather grain and color
                  </li>
                  <li>
                    Priced according to craftsmanship and material quality
                  </li>
                </ul>
                <p className="mt-4">
                  We guarantee the authenticity of all our leather materials and
                  craftsmanship.
                </p>
              </div>
            </div>

            <div className="mb-8 lg:mb-12 last:mb-0">
              <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-4 text-leather-black">
                Ordering & Payment
              </h2>
              <div className="font-sans leading-7 text-leather-charcoal-700">
                <p>
                  <strong>Order Process:</strong>
                </p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>
                    All orders are subject to availability and confirmation
                  </li>
                  <li>Custom orders require additional production time</li>
                  <li>Prices are in USD and include applicable taxes</li>
                  <li>
                    We accept major credit cards and secure payment methods
                  </li>
                </ul>
                <p className="mt-4">
                  <strong>Payment Security:</strong> All transactions are
                  encrypted and processed through PCI-compliant payment
                  gateways.
                </p>
              </div>
            </div>

            <div className="mb-8 lg:mb-12 last:mb-0">
              <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-4 text-leather-black">
                Shipping & Delivery
              </h2>
              <div className="font-sans leading-7 text-leather-charcoal-700">
                <p>
                  <strong>Production & Shipping Times:</strong>
                </p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>Ready-to-ship items: 1-3 business days processing</li>
                  <li>Custom orders: 2-4 weeks production time</li>
                  <li>International shipping: 7-21 business days</li>
                  <li>Tracking information provided for all orders</li>
                </ul>
                <p className="mt-4">
                  Shipping costs are calculated at checkout based on destination
                  and package weight.
                </p>
              </div>
            </div>

            <div className="mb-8 lg:mb-12 last:mb-0">
              <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-4 text-leather-black">
                Returns & Exchanges
              </h2>
              <div className="font-sans leading-7 text-leather-charcoal-700">
                <p>
                  <strong>30-Day Return Policy:</strong>
                </p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>Items must be returned in original condition</li>
                  <li>Custom and personalized items are final sale</li>
                  <li>Return shipping costs are customer's responsibility</li>
                  <li>Refunds processed within 7-10 business days</li>
                </ul>
                <p className="mt-4">
                  <strong>Defective Products:</strong> We stand behind our
                  craftsmanship. Defective items will be repaired or replaced at
                  our discretion.
                </p>
              </div>
            </div>

            <div className="mb-8 lg:mb-12 last:mb-0">
              <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-4 text-leather-black">
                Leather Care & Maintenance
              </h2>
              <div className="font-sans leading-7 text-leather-charcoal-700">
                <p>Our leather products require proper care:</p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>Keep away from direct sunlight and heat sources</li>
                  <li>Use leather conditioner periodically</li>
                  <li>Clean with damp cloth and mild soap</li>
                  <li>Store in breathable dust bags provided</li>
                </ul>
                <p className="mt-4">
                  Improper care may void warranty coverage.
                </p>
              </div>
            </div>

            <div className="mb-8 lg:mb-12 last:mb-0">
              <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-4 text-leather-black">
                Intellectual Property
              </h2>
              <div className="font-sans leading-7 text-leather-charcoal-700">
                <p>All content on LeatherCraft is protected:</p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>Product designs are original and copyrighted</li>
                  <li>Photography and content may not be reproduced</li>
                  <li>Brand names and logos are registered trademarks</li>
                  <li>Unauthorized commercial use is prohibited</li>
                </ul>
              </div>
            </div>

            <div className="mb-8 lg:mb-12 last:mb-0">
              <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-4 text-leather-black">
                User Accounts & Responsibilities
              </h2>
              <div className="font-sans leading-7 text-leather-charcoal-700">
                <p>When creating an account, you agree to:</p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>Provide accurate and current information</li>
                  <li>
                    Maintain account security and password confidentiality
                  </li>
                  <li>Not use the site for illegal or unauthorized purposes</li>
                  <li>
                    Accept responsibility for all activities under your account
                  </li>
                </ul>
              </div>
            </div>

            <div className="mb-8 lg:mb-12 last:mb-0">
              <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-4 text-leather-black">
                Limitation of Liability
              </h2>
              <div className="font-sans leading-7 text-leather-charcoal-700">
                <p>LeatherCraft shall not be liable for:</p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>Indirect, incidental, or consequential damages</li>
                  <li>Natural variations in leather products</li>
                  <li>Shipping delays beyond our control</li>
                  <li>Improper care or misuse of products</li>
                  <li>Third-party services or links</li>
                </ul>
              </div>
            </div>

            <div className="mb-8 lg:mb-12 last:mb-0">
              <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-4 text-leather-black">
                Privacy & Data Protection
              </h2>
              <div className="font-sans leading-7 text-leather-charcoal-700">
                <p>
                  Your privacy is important to us. Please review our{" "}
                  <Link
                    href="/privacy-policy"
                    className="text-leather-brown hover:text-leather-brown-600 transition-colors"
                  >
                    Privacy Policy
                  </Link>{" "}
                  for detailed information about how we collect, use, and
                  protect your personal data.
                </p>
              </div>
            </div>

            <div className="mb-8 lg:mb-12 last:mb-0">
              <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-4 text-leather-black">
                Governing Law & Dispute Resolution
              </h2>
              <div className="font-sans leading-7 text-leather-charcoal-700">
                <p>
                  These terms are governed by the laws of California. Any
                  disputes shall be resolved through arbitration in San
                  Francisco, CA.
                </p>
              </div>
            </div>

            <div className="mb-8 lg:mb-12 last:mb-0">
              <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-4 text-leather-black">
                Changes to Terms
              </h2>
              <div className="font-sans leading-7 text-leather-charcoal-700">
                <p>
                  We reserve the right to modify these terms at any time.
                  Continued use of our services constitutes acceptance of
                  updated terms.
                </p>
                <p className="mt-4">
                  <strong>Last Updated:</strong>{" "}
                  {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="mb-8 lg:mb-12 last:mb-0">
              <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-4 text-leather-black">
                Contact Information
              </h2>
              <div className="font-sans leading-7 text-leather-charcoal-700">
                <p>For questions about these Terms & Conditions:</p>
                <ul className="list-none pl-0 mt-3 space-y-2">
                  <li>
                    <strong>Email:</strong> legal@leathercraft.com
                  </li>
                  <li>
                    <strong>Phone:</strong> +1 (555) 123-LEGAL
                  </li>
                  <li>
                    <strong>Address:</strong> Legal Department, LeatherCraft
                    Ltd., 123 Artisan Street, Craftville, CA 94102
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermAndConditions;
