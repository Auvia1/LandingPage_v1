import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

export function FinalCTA({ onOpenForm }: { onOpenForm: () => void }) {
  return (
    <section className="relative overflow-hidden bg-secondary/60 px-6 py-24">
      {/* Decorative elements */}
      <div className="absolute left-10 top-10 size-32 rounded-full bg-accent/30 blur-3xl"></div>
      <div className="absolute bottom-10 right-10 size-40 rounded-full bg-accent/20 blur-3xl"></div>

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-6 text-4xl font-bold leading-tight text-slate-900 md:text-5xl lg:text-6xl">
            Begin Your Clinic Transformation
          </h2>
          <p className="mb-8 text-xl leading-relaxed text-slate-600">
            Bring calm, consistent patient communication to your front desk with an always-on AI receptionist.
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                onClick={onOpenForm}
                className="rounded-full bg-primary px-10 py-6 text-base font-semibold text-white shadow-sm hover:opacity-95"
              >
                Book a Demo
                <ArrowRight className="ml-2 size-5" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
