import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React from "react";

function SidebarLinks({ title, children, sidebarMenuIsOpen, gray, href }) {
  return (
    <Link href={href} passHref>
      <div className="flex items-center gap-x-6 cursor-pointer">
        <div
          className={`shrink-0 relative h-10 w-10 md:h-12 md:w-12 2xl:w-16 2xl:h-16  rounded-md overflow-hidden ${
            gray &&
            "text-white flex justify-center items-center bg-slate-700 bg-opacity-50"
          }`}
        >
          {children}
        </div>
        <AnimatePresence>
          {sidebarMenuIsOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { duration: 0.3, delay: 0.1 },
              }}
              exit={{ opacity: 0 }}
              className="text-2xl shrink-0"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Link>
  );
}

export default SidebarLinks;
