import React from "react";

import Layout from "@layout/Layout";
import useGetSetting from "@hooks/useGetSetting";
import PageHeader from "@components/header/PageHeader";
import CMSkeleton from "@components/preloader/CMSkeleton";
import useUtilsFunction from "@hooks/useUtilsFunction";

const PrivacyPolicy = () => {
  const { storeCustomizationSetting, loading, error } = useGetSetting();
  const { showingTranslateValue } = useUtilsFunction();

  if (loading) {
    return (
      <Layout title="Privacy Policy" description="This is privacy policy page">
        <PageHeader
          headerBg={storeCustomizationSetting?.privacy_policy?.header_bg}
          title={showingTranslateValue(
            storeCustomizationSetting?.privacy_policy?.title
          )}
        />
        <div className="bg-leather-white">
          <div className="max-w-screen-2xl mx-auto lg:py-20 py-10 px-4 sm:px-10">
            <div className="max-w-4xl mx-auto">
              <CMSkeleton
                html
                count={15}
                height={15}
                error={error}
                loading={loading}
                data={storeCustomizationSetting?.privacy_policy?.description}
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
    <Layout title="Privacy Policy" description="This is privacy policy page">
      <PageHeader
        headerBg={storeCustomizationSetting?.privacy_policy?.header_bg}
        title={showingTranslateValue(
          storeCustomizationSetting?.privacy_policy?.title
        )}
      />
      <div className="bg-leather-white">
        <div className="max-w-screen-2xl mx-auto lg:py-20 py-10 px-4 sm:px-10">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <div className="mb-8 lg:mb-12 last:mb-0">
              <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-4 text-leather-black">
                Information We Collect
              </h2>
              <div className="font-sans leading-7 text-leather-charcoal-700">
                <p>When you use our leather goods platform, we collect:</p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>Personal information (name, email, shipping address)</li>
                  <li>Payment information for order processing</li>
                  <li>Product preferences and browsing history</li>
                  <li>Customer service interactions and feedback</li>
                  <li>Device and usage information for analytics</li>
                </ul>
              </div>
            </div>

            <div className="mb-8 lg:mb-12 last:mb-0">
              <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-4 text-leather-black">
                How We Use Your Information
              </h2>
              <div className="font-sans leading-7 text-leather-charcoal-700">
                <p>We use your information to:</p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>Process and fulfill your leather product orders</li>
                  <li>Provide personalized product recommendations</li>
                  <li>Send order confirmations and shipping updates</li>
                  <li>Improve our leather craftsmanship and services</li>
                  <li>Communicate about promotions and new collections</li>
                  <li>Ensure secure transactions and prevent fraud</li>
                </ul>
              </div>
            </div>

            <div className="mb-8 lg:mb-12 last:mb-0">
              <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-4 text-leather-black">
                Data Protection & Security
              </h2>
              <div className="font-sans leading-7 text-leather-charcoal-700">
                <p>
                  We implement robust security measures to protect your data:
                </p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>SSL encryption for all data transmissions</li>
                  <li>Secure payment processing with PCI compliance</li>
                  <li>Regular security audits and monitoring</li>
                  <li>Limited employee access to personal data</li>
                  <li>Data anonymization for analytics purposes</li>
                </ul>
              </div>
            </div>

            <div className="mb-8 lg:mb-12 last:mb-0">
              <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-4 text-leather-black">
                Cookies & Tracking
              </h2>
              <div className="font-sans leading-7 text-leather-charcoal-700">
                <p>We use cookies to enhance your shopping experience:</p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>Session cookies for cart functionality</li>
                  <li>Analytics cookies to improve our website</li>
                  <li>Preference cookies for personalized content</li>
                  <li>Marketing cookies for relevant promotions</li>
                </ul>
                <p className="mt-4">
                  You can control cookie settings through your browser
                  preferences.
                </p>
              </div>
            </div>

            <div className="mb-8 lg:mb-12 last:mb-0">
              <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-4 text-leather-black">
                Third-Party Services
              </h2>
              <div className="font-sans leading-7 text-leather-charcoal-700">
                <p>We work with trusted partners to provide our services:</p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>Payment processors (Stripe, PayPal)</li>
                  <li>Shipping carriers (UPS, FedEx, DHL)</li>
                  <li>Analytics providers (Google Analytics)</li>
                  <li>Marketing platforms (Mailchimp)</li>
                  <li>Customer support tools</li>
                </ul>
                <p className="mt-4">
                  These partners only receive necessary information to perform
                  their services.
                </p>
              </div>
            </div>

            <div className="mb-8 lg:mb-12 last:mb-0">
              <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-4 text-leather-black">
                Your Rights & Choices
              </h2>
              <div className="font-sans leading-7 text-leather-charcoal-700">
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>Access and download your personal data</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your account and data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Restrict certain data processing</li>
                  <li>Data portability to other services</li>
                </ul>
                <p className="mt-4">
                  Contact our privacy team at privacy@leathercraft.com to
                  exercise these rights.
                </p>
              </div>
            </div>

            <div className="mb-8 lg:mb-12 last:mb-0">
              <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-4 text-leather-black">
                Data Retention
              </h2>
              <div className="font-sans leading-7 text-leather-charcoal-700">
                <p>We retain your information only as long as necessary:</p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>Order data: 7 years for tax and legal purposes</li>
                  <li>Account information: Until account deletion</li>
                  <li>Marketing preferences: Until opt-out</li>
                  <li>Analytics data: 26 months anonymized</li>
                  <li>Customer service records: 3 years</li>
                </ul>
              </div>
            </div>

            <div className="mb-8 lg:mb-12 last:mb-0">
              <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-4 text-leather-black">
                International Data Transfers
              </h2>
              <div className="font-sans leading-7 text-leather-charcoal-700">
                <p>
                  As a global leather goods retailer, your data may be
                  transferred internationally with appropriate safeguards:
                </p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>EU-US Privacy Shield compliance</li>
                  <li>Standard contractual clauses</li>
                  <li>Adequacy decisions where applicable</li>
                  <li>Encrypted data transfers</li>
                </ul>
              </div>
            </div>

            <div className="mb-8 lg:mb-12 last:mb-0">
              <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-4 text-leather-black">
                Policy Updates
              </h2>
              <div className="font-sans leading-7 text-leather-charcoal-700">
                <p>
                  We may update this policy to reflect changes in our practices
                  or legal requirements. Significant changes will be
                  communicated via email or website notification.
                </p>
                <p className="mt-4">
                  <strong>Last Updated:</strong>{" "}
                  {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="mb-8 lg:mb-12 last:mb-0">
              <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-4 text-leather-black">
                Contact Us
              </h2>
              <div className="font-sans leading-7 text-leather-charcoal-700">
                <p>For privacy-related questions or concerns:</p>
                <ul className="list-none pl-0 mt-3 space-y-2">
                  <li>
                    <strong>Email:</strong> privacy@leathercraft.com
                  </li>
                  <li>
                    <strong>Phone:</strong> +1 (555) 123-LEATHER
                  </li>
                  <li>
                    <strong>Address:</strong> Privacy Team, LeatherCraft Ltd.,
                    123 Artisan Street, Craftville, CA 94102
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

export default PrivacyPolicy;
