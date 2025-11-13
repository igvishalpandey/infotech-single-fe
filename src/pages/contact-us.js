import React from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import useTranslation from "next-translate/useTranslation";
import { FiMail, FiMapPin, FiBell } from "react-icons/fi";

import Layout from "@layout/Layout";
import Label from "@components/form/Label";
import Error from "@components/form/Error";
import { notifySuccess } from "@utils/toast";
import useGetSetting from "@hooks/useGetSetting";
import InputArea from "@components/form/InputArea";
import PageHeader from "@components/header/PageHeader";
import CMSkeleton from "@components/preloader/CMSkeleton";
import useUtilsFunction from "@hooks/useUtilsFunction";

const ContactUs = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { showingTranslateValue } = useUtilsFunction();
  const { storeCustomizationSetting, loading, error } = useGetSetting();

  const submitHandler = () => {
    notifySuccess(
      "your message sent successfully. We will contact you shortly."
    );
  };

  const ContactCard = ({ icon: Icon, title, content, loading }) => {
    if (loading) {
      return (
        <CMSkeleton count={10} height={20} error={error} loading={loading} />
      );
    }

    return (
      <div className="border border-leather-border p-10 rounded-leather text-center bg-leather-white hover:shadow-leather transition-all">
        <span className="flex justify-center text-4xl text-leather-brown mb-4">
          <Icon />
        </span>
        <h5 className="text-xl mb-2 font-bold text-leather-black">{title}</h5>
        <p className="mb-0 text-base text-leather-charcoal-600 leading-7">
          {content}
        </p>
      </div>
    );
  };

  return (
    <Layout title="Contact Us" description="This is contact us page">
      <PageHeader
        headerBg={storeCustomizationSetting?.contact_us?.header_bg}
        title={showingTranslateValue(
          storeCustomizationSetting?.contact_us?.title
        )}
      />

      <div className="bg-leather-white">
        <div className="max-w-screen-2xl mx-auto lg:py-20 py-10 px-4 sm:px-10">
          <div className="grid md:grid-cols-2 gap-6 lg:grid-cols-3 xl:gap-8 font-serif">
            <ContactCard
              icon={FiMail}
              title={showingTranslateValue(
                storeCustomizationSetting?.contact_us?.email_box_title
              )}
              content={
                <>
                  <a
                    href={`mailto:${storeCustomizationSetting?.contact_us?.email_box_email}`}
                    className="text-leather-brown hover:text-leather-brown-600 transition-colors"
                  >
                    {showingTranslateValue(
                      storeCustomizationSetting?.contact_us?.email_box_email
                    )}
                  </a>{" "}
                  {showingTranslateValue(
                    storeCustomizationSetting?.contact_us?.email_box_text
                  )}
                </>
              }
              loading={loading}
            />

            <ContactCard
              icon={FiBell}
              title={showingTranslateValue(
                storeCustomizationSetting?.contact_us?.call_box_title
              )}
              content={
                <>
                  <a
                    href={`tel:${storeCustomizationSetting?.contact_us?.call_box_phone}`}
                    className="text-leather-brown hover:text-leather-brown-600 transition-colors"
                  >
                    {showingTranslateValue(
                      storeCustomizationSetting?.contact_us?.call_box_phone
                    )}
                  </a>{" "}
                  {showingTranslateValue(
                    storeCustomizationSetting?.contact_us?.call_box_text
                  )}
                </>
              }
              loading={loading}
            />

            <ContactCard
              icon={FiMapPin}
              title={showingTranslateValue(
                storeCustomizationSetting?.contact_us?.address_box_title
              )}
              content={
                <>
                  <span>
                    {showingTranslateValue(
                      storeCustomizationSetting?.contact_us
                        ?.address_box_address_one
                    )}
                  </span>{" "}
                  <br />
                  {showingTranslateValue(
                    storeCustomizationSetting?.contact_us
                      ?.address_box_address_two
                  )}{" "}
                  <br />
                  {showingTranslateValue(
                    storeCustomizationSetting?.contact_us
                      ?.address_box_address_three
                  )}
                </>
              }
              loading={loading}
            />
          </div>

          <div className="px-0 pt-24 mx-auto items-center flex flex-col md:flex-row w-full justify-between">
            <div className="hidden md:w-full lg:w-5/12 lg:flex flex-col h-full">
              <Image
                width={874}
                height={874}
                src={
                  storeCustomizationSetting?.contact_us?.midLeft_col_img ||
                  "/contact-us.png"
                }
                alt="Contact Us"
                className="block w-auto rounded-leather"
              />
            </div>
            <div className="px-0 pb-2 lg:w-5/12 flex flex-col md:flex-row">
              <form
                onSubmit={handleSubmit(submitHandler)}
                className="w-full mx-auto flex flex-col justify-center"
              >
                <div className="mb-12">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold font-serif mb-3 text-leather-black">
                    <CMSkeleton
                      count={1}
                      height={50}
                      loading={loading}
                      data={storeCustomizationSetting?.contact_us?.form_title}
                    />
                  </h3>
                  <p className="text-base text-leather-charcoal-600 leading-7">
                    <CMSkeleton
                      count={2}
                      height={20}
                      loading={loading}
                      data={
                        storeCustomizationSetting?.contact_us?.form_description
                      }
                    />
                  </p>
                </div>

                <div className="flex flex-col space-y-5">
                  <div className="flex flex-col md:flex-row space-y-5 md:space-y-0">
                    <div className="w-full md:w-1/2 ">
                      <InputArea
                        register={register}
                        label={t("common:contact-page-form-input-name")}
                        name="name"
                        type="text"
                        placeholder={t(
                          "common:contact-page-form-plaholder-name"
                        )}
                      />
                      <Error errorName={errors.name} />
                    </div>
                    <div className="w-full md:w-1/2 md:ml-2.5 lg:ml-5 mt-2 md:mt-0">
                      <InputArea
                        register={register}
                        label={t("common:contact-page-form-input-email")}
                        name="email"
                        type="email"
                        placeholder={t(
                          "common:contact-page-form-plaholder-email"
                        )}
                      />
                      <Error errorName={errors.email} />
                    </div>
                  </div>
                  <div className="relative">
                    <InputArea
                      register={register}
                      label={t("common:contact-page-form-input-subject")}
                      name="subject"
                      type="text"
                      placeholder={t(
                        "common:contact-page-form-plaholder-subject"
                      )}
                    />
                    <Error errorName={errors.subject} />
                  </div>
                  <div className="relative mb-4">
                    <Label
                      label={t("common:contact-page-form-input-message")}
                    />
                    <textarea
                      {...register("message", {
                        required: `Message is required!`,
                      })}
                      name="message"
                      className="px-4 py-3 flex items-center w-full rounded-leather appearance-none opacity-75 transition duration-300 ease-in-out text-sm focus:ring-0 bg-leather-white border border-leather-border focus:shadow-none focus:outline-none focus:border-leather-brown placeholder-leather-charcoal-600"
                      autoComplete="off"
                      spellCheck="false"
                      rows="4"
                      placeholder={t(
                        "common:contact-page-form-plaholder-message"
                      )}
                    ></textarea>
                    <Error errorName={errors.message} />
                  </div>
                  <div className="relative">
                    <button className="md:text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold text-center justify-center border-0 border-transparent rounded-leather placeholder-white focus-visible:outline-none focus:outline-none bg-leather-brown text-leather-white px-5 md:px-6 lg:px-8 py-3 md:py-3.5 lg:py-3 hover:text-white hover:bg-leather-brown-600 h-12 mt-1 text-sm lg:text-base w-full sm:w-auto">
                      {t("common:contact-page-form-send-btn")}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactUs;
