"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";
import { GoLocation } from "react-icons/go";
import { differenceInDays } from "date-fns";

import useSearchModal from "../../hooks/useSearchModal";
import useCountries from "../../hooks/useCountries";

const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getByValue } = useCountries();

  const locationValue = params?.get("locationValue");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestCount");

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label;
    }

    return "Place";
  }, [locationValue, getByValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1;
      }

      return `${diff} Days`;
    }

    return "Date";
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }

    return "Add Guests";
  }, [guestCount]);

  return (
    <div
      onClick={searchModal.onOpen}
      className="
        border-[1px] 
        w-full 
        md:w-auto 
        py-2 
        rounded-lg 
        shadow-sm 
        hover:shadow-sm 
        transition 
        cursor-pointer
      "
    >
      <div
        className="
          flex 
          flex-row 
          items-center 
          justify-between
        "
      >
        <div
          className="
            text-sm 
            px-4
            flex 
            flex-row 
            items-center 
            gap-2
          "
        >
          <GoLocation size={15} />
          {locationLabel}
        </div>
        <div
          className="
            text-sm 
            px-4 
            flex-row 
            items-center 
            justify-center
            gap-2
            hidden
            sm:block
          "
        >
          {durationLabel}
        </div>
        <div
          className="
            text-sm 
            px-4 
            text-gray-600 
            flex 
            flex-row 
            items-center 
            gap-2
          "
        >
          <div className="flex-row items-center gap-2 hidden sm:block">
            {/* <div className="flex flex-row items-center hidden sm:block"> */}
            {guestLabel}
          </div>
          <div
            className="
              p-2 
              bg-blue-500 
              rounded-lg 
              text-white
            "
          >
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
