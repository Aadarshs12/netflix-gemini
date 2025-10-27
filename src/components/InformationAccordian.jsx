import React from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { IoChevronDownSharp } from "react-icons/io5";

const InformationAccordian = () => {
  return (
    <div className="w-full p-6">
      <div className="mx-auto w-full divide-y divide-white/5 rounded-xl bg-white/5">
        <Disclosure as="div" className="p-6" defaultOpen={true}>
          <DisclosureButton className="group flex w-full items-center justify-between">
            <span className="text-xl font-bold text-start text-white group-data-[hover]:text-white/80">
              What is NetGeminiFlix?
            </span>
            <IoChevronDownSharp className="size-5 text-white fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180" />
          </DisclosureButton>
          <DisclosurePanel className="mt-2 text-sm/5 text-white/50">
            <strong className="text-purple-500">NetGeminiFlix</strong> is a platform designed for movie
            lovers who are always curious to explore a wide variety of genres.
            It features an integrated <strong className="text-purple-500">Gemini Search</strong>, which
            intelligently recommends movies based on your favorite actors and
            preferred genres — including horror, thriller, romance, and more.
          </DisclosurePanel>
        </Disclosure>
        <Disclosure as="div" className="p-6">
          <DisclosureButton className="group flex w-full items-center justify-between">
            <span className="text-xl font-bold text-start text-white group-data-[hover]:text-white/80">
              Is it free or subscription-based?
            </span>
            <IoChevronDownSharp className="size-5 text-white fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180" />
          </DisclosureButton>
          <DisclosurePanel className="mt-2 text-sm/5 text-white/50">
            Yes, NetGeminiFlix is completely free to use. All you need to do is
            sign up and log in with your credentials to start exploring.
          </DisclosurePanel>
        </Disclosure>
        <Disclosure as="div" className="p-6">
          <DisclosureButton className="group flex w-full items-center justify-between">
            <span className="text-xl font-bold text-start text-white group-data-[hover]:text-white/80">
              Who is the Greatest of all time?
            </span>
            <IoChevronDownSharp className="size-5 text-white fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180" />
          </DisclosureButton>
          <DisclosurePanel className="mt-2 text-sm/5 text-white/50">
            As confirmed by totally unbiased, not-at-all made-up sources, the
            GOAT is none other than{" "}
            <strong className="text-purple-500">Aadarsh Singh</strong>. Move
            over, legends — the guy who probably invented sliced bread is here.
          </DisclosurePanel>
        </Disclosure>
      </div>
    </div>
  );
};

export default InformationAccordian;
