import Link from "next/link";
import { FiLock, FiMail } from "react-icons/fi";

import Layout from "@layout/Layout";
import Error from "@components/form/Error";
import useLoginSubmit from "@hooks/useLoginSubmit";
import InputArea from "@components/form/InputArea";
import BottomNavigation from "@components/login/BottomNavigation";

const Login = () => {
  const { handleSubmit, submitHandler, register, errors, loading } =
    useLoginSubmit();

  const handleFormSubmit = (data) => {
    submitHandler(data);
  };

  return (
    <Layout title="Login" description="This is login page">
      <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
        <div className="py-4 flex flex-col lg:flex-row w-full">
          <div className="w-full sm:p-5 lg:p-8">
            <div className="mx-auto text-left justify-center w-full max-w-lg px-4 py-8 sm:p-10 overflow-hidden align-middle transition-all transform bg-white shadow-leather rounded-2xl">
              <div className="overflow-hidden mx-auto">
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold font-serif text-leather-black">
                    Login
                  </h2>
                  <p className="text-sm md:text-base text-leather-charcoal-600 mt-2 mb-8 sm:mb-10">
                    Login with your email and password
                  </p>
                </div>
                <form
                  onSubmit={handleSubmit(handleFormSubmit)}
                  className="flex flex-col justify-center"
                >
                  <div className="grid grid-cols-1 gap-5">
                    <div className="form-group">
                      <InputArea
                        register={register}
                        defaultValue="justin@gmail.com"
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        Icon={FiMail}
                        autocomplete="email"
                      />
                      <Error errorName={errors.email} />
                    </div>
                    <div className="form-group">
                      <InputArea
                        register={register}
                        defaultValue="12345678"
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        Icon={FiLock}
                        autocomplete="current-password"
                      />
                      <Error errorName={errors.password} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex ms-auto">
                        <Link
                          href="/auth/forget-password"
                          className="text-end text-sm text-leather-brown ps-3 underline hover:no-underline focus:outline-none transition-colors"
                        >
                          Forgot password?
                        </Link>
                      </div>
                    </div>

                    {loading ? (
                      <button
                        disabled={loading}
                        type="submit"
                        className="md:text-sm leading-5 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-medium text-center justify-center border-0 border-transparent rounded-leather placeholder-white focus-visible:outline-none focus:outline-none bg-leather-brown text-leather-white px-5 md:px-6 lg:px-8 py-2 md:py-3 lg:py-3 hover:bg-leather-brown-600 h-12 mt-1 text-sm lg:text-sm w-full"
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
                        disabled={loading}
                        type="submit"
                        className="w-full text-center py-3 rounded-leather bg-leather-brown text-leather-white hover:bg-leather-brown-600 transition-all focus:outline-none my-1 h-12 font-medium"
                      >
                        Login
                      </button>
                    )}
                  </div>
                </form>
                <BottomNavigation
                  or={true}
                  route={"/auth/signup"}
                  pageName={"Sign Up"}
                  loginTitle="Login"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
