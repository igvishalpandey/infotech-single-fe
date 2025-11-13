import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import React, { useEffect, useState, useCallback } from "react";
import { FiUser, FiMapPin, FiPhone, FiMail, FiCamera } from "react-icons/fi";

//internal import
import Label from "@components/form/Label";
import Error from "@components/form/Error";
import Dashboard from "@pages/user/dashboard";
import InputArea from "@components/form/InputArea";
import useGetSetting from "@hooks/useGetSetting";
import CustomerServices from "@services/CustomerServices";
import Uploader from "@components/image-uploader/Uploader";
import { notifySuccess, notifyError } from "@utils/toast";
import useUtilsFunction from "@hooks/useUtilsFunction";

const UpdateProfile = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDemoMode] = useState(true);
  const { data: session, update } = useSession();

  const { storeCustomizationSetting } = useGetSetting();
  const { showingTranslateValue } = useUtilsFunction();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      address: "",
      phone: "",
    },
  });

  const watchedValues = watch();

  const initializeForm = useCallback(() => {
    if (session?.user) {
      setValue("name", session.user.name || "");
      setValue("email", session.user.email || "");
      setValue("address", session.user.address || "");
      setValue("phone", session.user.phone || "");
      setImageUrl(session.user.image || "");
    }
  }, [session?.user, setValue]);

  useEffect(() => {
    initializeForm();
  }, [initializeForm]);

  const onSubmit = async (data) => {
    if (isDemoMode) {
      notifySuccess("Profile update simulated successfully! (Demo mode)");
      return;
    }

    if (loading) return;
    setLoading(true);

    const userData = {
      name: data.name?.trim(),
      email: data.email?.trim(),
      address: data.address?.trim(),
      phone: data.phone?.trim(),
      image: imageUrl,
    };

    try {
      const res = await CustomerServices.updateCustomer(
        session?.user?.id,
        userData
      );

      await update({
        ...session,
        user: {
          ...session.user,
          ...userData,
        },
      });

      notifySuccess("Profile Update Successfully!");
    } catch (error) {
      notifyError(
        error?.response?.data?.message || error?.message || "Update failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const validationRules = {
    name: {
      required: "Name is required",
      minLength: {
        value: 2,
        message: "Name must be at least 2 characters",
      },
    },
    phone: {
      pattern: {
        value: /^[+]?[\d\s-()]+$/,
        message: "Invalid phone number",
      },
    },
  };

  const isFormDisabled = loading || !isDirty || !isValid;

  return (
    <Dashboard
      title={showingTranslateValue(
        storeCustomizationSetting?.dashboard?.update_profile
      )}
      description="Update your personal information"
    >
      <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
        <div className="py-4 flex flex-col lg:flex-row w-full">
          <div className="w-full">
            {/* Demo Mode Banner */}
            {isDemoMode && (
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-leather">
                <p className="text-sm text-leather-charcoal-600">
                  <strong>Demo Mode:</strong> Profile updates are simulated for
                  demonstration purposes.
                </p>
              </div>
            )}

            <div className="mx-auto text-left w-full max-w-4xl px-4 py-8 sm:p-10 overflow-hidden transition-all transform bg-white shadow-leather rounded-2xl">
              <div className="overflow-hidden mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold font-serif text-leather-black">
                    Update Profile
                  </h2>
                  <p className="text-sm md:text-base text-leather-charcoal-600 mt-2">
                    Manage your personal information
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col justify-center"
                >
                  <div className="space-y-6">
                    {/* Profile Photo Section */}
                    <div className="text-center">
                      <Label
                        label="Profile Photo"
                        className="text-leather-black font-medium mb-3"
                      />
                      <div className="flex justify-center">
                        <Uploader
                          imageUrl={imageUrl}
                          setImageUrl={setImageUrl}
                        />
                      </div>
                      <p className="mt-2 text-sm text-leather-charcoal-600">
                        JPG, PNG or WebP. Max 5MB.
                      </p>
                    </div>

                    {/* Personal Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="form-group">
                        <InputArea
                          register={register}
                          label="Full Name"
                          name="name"
                          type="text"
                          placeholder="Enter your full name"
                          Icon={FiUser}
                          validation={validationRules.name}
                          disabled={loading}
                        />
                        <Error errorName={errors.name} />
                      </div>

                      {/* Email */}
                      <div className="form-group">
                        <InputArea
                          register={register}
                          name="email"
                          type="email"
                          readOnly={true}
                          label="Email Address"
                          placeholder="Your email address"
                          Icon={FiMail}
                          className="bg-gray-50 cursor-not-allowed"
                        />
                        <p className="mt-1 text-xs text-leather-charcoal-600">
                          Email cannot be changed
                        </p>
                      </div>

                      {/* Phone */}
                      <div className="form-group">
                        <InputArea
                          register={register}
                          label="Phone Number"
                          name="phone"
                          type="tel"
                          placeholder="Your phone number"
                          Icon={FiPhone}
                          validation={validationRules.phone}
                          disabled={loading}
                        />
                        <Error errorName={errors.phone} />
                      </div>

                      {/* Address */}
                      <div className="form-group md:col-span-2">
                        <InputArea
                          register={register}
                          label="Address"
                          name="address"
                          type="text"
                          placeholder="Your complete address"
                          Icon={FiMapPin}
                          disabled={loading}
                        />
                        <Error errorName={errors.address} />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-between pt-4">
                      <button
                        type="button"
                        onClick={initializeForm}
                        disabled={loading || !isDirty}
                        className="px-6 py-3 border border-gray-300 rounded-leather text-sm font-medium text-leather-charcoal-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-leather-brown focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                      >
                        Reset Changes
                      </button>

                      {loading ? (
                        <button
                          disabled={loading}
                          type="submit"
                          className="md:text-sm leading-5 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-medium text-center justify-center border-0 border-transparent rounded-leather placeholder-white focus-visible:outline-none focus:outline-none bg-leather-brown text-leather-white px-5 md:px-6 lg:px-8 py-2 md:py-3 lg:py-3 hover:bg-leather-brown-600 h-12 mt-1 text-sm lg:text-sm w-full sm:w-auto"
                        >
                          <img
                            src="/loader/spinner.gif"
                            alt="Loading"
                            width={20}
                            height={10}
                          />
                          <span className="font-serif ml-2 font-light">
                            Processing
                          </span>
                        </button>
                      ) : (
                        <button
                          disabled={isFormDisabled}
                          type="submit"
                          className="w-full sm:w-auto text-center py-3 px-8 rounded-leather bg-leather-brown text-leather-white hover:bg-leather-brown-600 transition-all focus:outline-none focus:ring-2 focus:ring-leather-brown focus:ring-offset-2 h-12 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Update Profile
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default UpdateProfile;
