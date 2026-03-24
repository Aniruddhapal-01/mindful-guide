import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Brain, HeartHandshake, BarChart3, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Brain,
    title: "Mental Health Assessment",
    description: "Take guided questionnaires inspired by GAD-7 & PHQ-9 to understand your anxiety and mood levels.",
    to: "/assessment",
    color: "bg-wellness-blue/15 text-wellness-blue",
  },
  {
    icon: HeartHandshake,
    title: "Relationship Health Check",
    description: "Evaluate communication, trust, and conflict patterns in your relationships.",
    to: "/relationship",
    color: "bg-wellness-rose/15 text-wellness-rose",
  },
  {
    icon: BarChart3,
    title: "Mood Tracker Dashboard",
    description: "Log your daily mood and visualize trends over time with interactive charts.",
    to: "/dashboard",
    color: "bg-wellness-green/15 text-wellness-green",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Home = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-20 text-center"
      >
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-sm text-muted-foreground">
          <Sparkles className="h-4 w-4 text-wellness-yellow" />
          Your wellness companion
        </div>
        <h1 className="mb-6 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          Take care of your{" "}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            mental wellness
          </span>
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
          A safe space to assess your well-being, track your mood, and get personalized guidance — all with complete privacy. No data leaves your device.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg" className="rounded-full px-8">
            <Link to="/assessment">Start Assessment</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full px-8">
            <Link to="/dashboard">Track Mood</Link>
          </Button>
        </div>
      </motion.section>

      {/* Feature cards */}
      <motion.section variants={container} initial="hidden" animate="show" className="grid gap-6 md:grid-cols-3">
        {features.map((f) => (
          <motion.div key={f.title} variants={item}>
            <Link to={f.to} className="group block h-full">
              <Card className="h-full transition-shadow hover:shadow-lg">
                <CardContent className="p-6">
                  <div className={`mb-4 inline-flex rounded-xl p-3 ${f.color}`}>
                    <f.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 font-display text-lg font-semibold">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.description}</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.section>

      {/* How it works */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-20 text-center"
      >
        <h2 className="mb-10 font-display text-2xl font-bold sm:text-3xl">How it works</h2>
        <div className="grid gap-8 sm:grid-cols-3">
          {[
            { step: "1", title: "Take an Assessment", desc: "Answer guided questions about how you've been feeling lately." },
            { step: "2", title: "Get Insights", desc: "Receive a personalized wellness summary with actionable suggestions." },
            { step: "3", title: "Track Progress", desc: "Log your mood daily and watch your trends improve over time." },
          ].map((s) => (
            <div key={s.step} className="flex flex-col items-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                {s.step}
              </div>
              <h3 className="mb-2 font-display text-lg font-semibold">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Helpline */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-20 rounded-2xl border bg-card p-8 text-center"
      >
        <h2 className="mb-3 font-display text-xl font-bold">Need Immediate Help?</h2>
        <p className="mb-4 text-muted-foreground">
          If you or someone you know is in crisis, please reach out to a professional.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <div className="rounded-lg border bg-muted px-4 py-2">🇺🇸 988 Suicide & Crisis Lifeline: <strong>988</strong></div>
          <div className="rounded-lg border bg-muted px-4 py-2">🇬🇧 Samaritans: <strong>116 123</strong></div>
          <div className="rounded-lg border bg-muted px-4 py-2">🌍 Crisis Text Line: Text <strong>HOME</strong> to 741741</div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
