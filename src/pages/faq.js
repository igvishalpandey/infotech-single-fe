import React from "react";
import Image from "next/image";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";

import Layout from "@layout/Layout";
import useGetSetting from "@hooks/useGetSetting";
import PageHeader from "@components/header/PageHeader";
import useUtilsFunction from "@hooks/useUtilsFunction";

const Faq = () => {
  const { storeCustomizationSetting } = useGetSetting();
  const { showingTranslateValue } = useUtilsFunction();

  const DisclosureItem = ({ question, answer, open }) => (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex justify-between w-full px-4 py-3 text-base font-medium text-left text-leather-charcoal-700 focus:text-leather-brown bg-leather-tan-50 hover:bg-leather-tan-100 rounded-leather focus:outline-none focus-visible:ring focus-visible:ring-leather-brown focus-visible:ring-opacity-75 transition-colors">
            <span>{question}</span>
            <ChevronUpIcon
              className={`${
                open ? "transform rotate-180 text-leather-brown" : ""
              } w-5 h-5 text-leather-charcoal-600 transition-transform`}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="px-4 pt-3 pb-8 text-sm leading-7 text-leather-charcoal-600">
            {answer}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );

  return (
    <Layout title="FAQ" description="This is faq page">
      <PageHeader
        headerBg={storeCustomizationSetting?.faq?.header_bg}
        title={showingTranslateValue(storeCustomizationSetting?.faq?.title)}
      />
      <div className="bg-leather-white">
        <div className="max-w-screen-2xl mx-auto px-3 sm:px-10 py-10 lg:py-12">
          <div className="grid gap-8 lg:mb-8 items-center md:grid-cols-2 xl:grid-cols-2">
            <div className="pr-8">
              <Image
                width={720}
                height={550}
                src={storeCustomizationSetting?.faq?.left_img || "/faq.svg"}
                alt="FAQ Illustration"
                className="rounded-leather"
              />
            </div>
            <div className="space-y-3">
              <DisclosureItem
                question={showingTranslateValue(
                  storeCustomizationSetting?.faq?.faq_one
                )}
                answer={showingTranslateValue(
                  storeCustomizationSetting?.faq?.description_one
                )}
              />

              <DisclosureItem
                question={showingTranslateValue(
                  storeCustomizationSetting?.faq?.faq_two
                )}
                answer={showingTranslateValue(
                  storeCustomizationSetting?.faq?.description_two
                )}
              />

              <DisclosureItem
                question={showingTranslateValue(
                  storeCustomizationSetting?.faq?.faq_three
                )}
                answer={showingTranslateValue(
                  storeCustomizationSetting?.faq?.description_three
                )}
              />

              <DisclosureItem
                question={showingTranslateValue(
                  storeCustomizationSetting?.faq?.faq_four
                )}
                answer={showingTranslateValue(
                  storeCustomizationSetting?.faq?.description_four
                )}
              />

              <DisclosureItem
                question={showingTranslateValue(
                  storeCustomizationSetting?.faq?.faq_five
                )}
                answer={showingTranslateValue(
                  storeCustomizationSetting?.faq?.description_five
                )}
              />

              <DisclosureItem
                question={showingTranslateValue(
                  storeCustomizationSetting?.faq?.faq_six
                )}
                answer={showingTranslateValue(
                  storeCustomizationSetting?.faq?.description_six
                )}
              />

              <DisclosureItem
                question={showingTranslateValue(
                  storeCustomizationSetting?.faq?.faq_seven
                )}
                answer={showingTranslateValue(
                  storeCustomizationSetting?.faq?.description_seven
                )}
              />

              <DisclosureItem
                question={showingTranslateValue(
                  storeCustomizationSetting?.faq?.faq_eight
                )}
                answer={showingTranslateValue(
                  storeCustomizationSetting?.faq?.description_eight
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Faq;
