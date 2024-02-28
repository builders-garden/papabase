"use client";

import { Button, Link } from "@nextui-org/react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="bg-white h-screen">
      <section
        id="hero"
        className="flex flex-col items-center justify-center h-full w-full"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-primary font-bold text-9xl font-clash-display"
        >
          papabase
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="text-primary text-3xl font-clash-display-regular"
        >
          web3 is just a family business
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="flex flex-row items-center space-x-4 justify-center mt-4 font-clash-display-regular"
        >
          <Button
            as={Link}
            href="/campaigns/new"
            color="primary"
            className="font-bold"
          >
            Create campaign
          </Button>
          <Button
            as={Link}
            href="/donate"
            color="primary"
            variant="flat"
            className="font-bold"
          >
            Donate now
          </Button>
        </motion.div>
      </section>
    </main>
  );
}
