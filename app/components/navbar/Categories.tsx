"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Container from "../Container";
import CategoryBox from "../CategoryBox";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla } from "react-icons/md";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { motion, useMotionValue, useTransform } from "framer-motion";

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to the beach!",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This property is has windmills!",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property is modern!",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "This property is in the countryside!",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This is property has a beautiful pool!",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This property is on an island!",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is near a lake!",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This property has skiing activies!",
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "This property is an ancient castle!",
  },
  {
    label: "Caves",
    icon: GiCaveEntrance,
    description: "This property is in a spooky cave!",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This property offers camping activities!",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "This property is in arctic environment!",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This property is in the desert!",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This property is in a barn!",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This property is brand new and luxurious!",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();
  const isMainPage = pathname === "/";

  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [maxScrollLeft, setMaxScrollLeft] = useState(0);

  const x = useMotionValue(0);

  useEffect(() => {
    if (scrollRef.current) {
      const { scrollWidth, clientWidth } = scrollRef.current;
      const maxWidth = scrollWidth - clientWidth;
      setMaxScrollLeft(maxWidth);
    }
  }, [scrollRef.current]);

  const xRange = useTransform(x, [0, maxScrollLeft ?? 0], [0, 1]);
  const opacityRange = useTransform(x, [0, maxScrollLeft ?? 0], [0.3, 1]);

  const handleScroll = () => {
    if (scrollRef.current) {
      setScrollLeft(scrollRef.current.scrollLeft);
      setMaxScrollLeft(
        scrollRef.current.scrollWidth - scrollRef.current.clientWidth
      );
    }
  };

  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scroll({
        left: scrollLeft - 300,
        behavior: "smooth",
      });
    }
  };

  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scroll({
        left: scrollLeft + 300,
        behavior: "smooth",
      });
    }
  };

  const handleDrag = (event: MouseEvent | PointerEvent, info: any) => {
    x.set(info.point.x - info.delta.x);
  };

  const handleDragEnd = (event: MouseEvent | PointerEvent, info: any) => {
    if (scrollRef.current) {
      if (info.offset.x > 0) {
        scrollRef.current.scroll({
          left: scrollLeft - 300,
          behavior: "smooth",
        });
      } else if (info.offset.x < 0) {
        scrollRef.current.scroll({
          left: scrollLeft + 300,
          behavior: "smooth",
        });
      }
      x.set(0);
    }
  };

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="pt-4 flex flex-row items-center justify-between gap-4 overflow-x-auto scrollbar-hide"
        onScroll={handleScroll}
        ref={scrollRef}
        style={{ scrollSnapType: "x mandatory" }}
      >
        {scrollLeft > 0 && (
          <IoIosArrowDropleftCircle
            className="absolute hidden sm:block left-5 h-10 w-10 items-center justify-center transition-transform duration-300 ease-in-out text-blue-500"
            onClick={handleScrollLeft}
          />
        )}
        {categories.map((item, index) => (
          <motion.div
            key={index}
            className="flex-shrink-0 flex-grow-0 w-32 h-20"
            style={{ x: xRange }}
            drag="x"
            dragConstraints={{ left: -maxScrollLeft, right: 0 }}
            dragElastic={0.1}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            whileTap={{ cursor: "grabbing" }}
            whileHover={{ cursor: "grab" }}
          >
            <CategoryBox
              key={item.label}
              label={item.label}
              icon={item.icon}
              selected={category === item.label}
            />
          </motion.div>
        ))}
        {scrollLeft < maxScrollLeft && (
          <IoIosArrowDroprightCircle
            className="absolute hidden sm:block right-5 h-10 w-10 items-center justify-center transition-transform duration-300 ease-in-out text-blue-500"
            onClick={handleScrollRight}
          />
        )}
      </div>
    </Container>
  );
};

export default Categories;
