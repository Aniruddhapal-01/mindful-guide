import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, RotateCcw, AlertTriangle, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  relationshipQuestions,
  relationshipAnswerOptions,
  getRelationshipLevel,
  relationshipAdvice,
  type RelationshipLevel,
} from "@/lib/questions";

type Phase = "intro" | "questions" | "results";

const Relationship = () => {
  const [phase, setPhase] = useState<Phase>("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
  const level = getRelationshipLevel(totalScore);
  const progress = phase === "results" ? 100 : (Object.keys(answers).length / relationshipQuestions.length) * 100;

  const levelConfig: Record<RelationshipLevel, { label: string; color: string; bg: string; icon: React.ReactNode; desc: string }> = {
    healthy: {
      label: "Healthy",
      color: "text-wellness-green",
      bg: "bg-wellness-green/15",
      icon: <CheckCircle2 className="h-8 w-8 text-wellness-green" />,
      desc: "Your relationship appears to have strong, healthy foundations. Keep nurturing these positive patterns!",
    },
    "needs-attention": {
      label: "Needs Attention",
      color: "text-wellness-yellow",
      bg: "bg-wellness-yellow/15",
      icon: <AlertCircle className="h-8 w-8 text-wellness-yellow" />,
      desc: "Some areas of your relationship could benefit from focused attention and improved communication.",
    },
    "potentially-toxic": {
      label: "Potentially Toxic",
      color: "text-wellness-rose",
      bg: "bg-wellness-rose/15",
      icon: <AlertTriangle className="h-8 w-8 text-wellness-rose" />,
      desc: "Several concerning patterns were identified. Your safety and well-being should be your top priority.",
    },
  };

  const handleAnswer = (value: number) => {
    const qId = relationshipQuestions[currentQ].id;
    setAnswers((prev) => ({ ...prev, [qId]: value }));
    if (currentQ < relationshipQuestions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setPhase("results");
    }
  };

  const reset = () => {
    setPhase("intro");
    setCurrentQ(0);
    setAnswers({});
  };

  if (phase === "intro") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="mb-4 font-display text-3xl font-bold">Relationship Health Check</h1>
          <p className="mb-6 text-muted-foreground">
            Reflect on your closest relationship — romantic partner, close friend, or family member.
            Answer honestly based on your overall experience.
          </p>
          <Card className="mb-6 border-wellness-peach/30 bg-wellness-peach/10">
            <CardContent className="flex items-start gap-3 p-4">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-wellness-rose" />
              <p className="text-sm">
                This is a self-reflection tool, not a professional assessment. 
                For serious relationship concerns, please seek guidance from a qualified counselor.
              </p>
            </CardContent>
          </Card>
          <Button onClick={() => setPhase("questions")} size="lg" className="rounded-full px-8">
            Begin Check <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    );
  }

  if (phase === "results") {
    const cfg = levelConfig[level];
    const advice = relationshipAdvice[level];

    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="mb-8 font-display text-3xl font-bold">Your Results</h1>

          <Card className="mb-8">
            <CardContent className="flex flex-col items-center p-8 text-center">
              {cfg.icon}
              <h2 className={`mt-3 font-display text-2xl font-bold ${cfg.color}`}>{cfg.label}</h2>
              <p className="mt-1 text-sm text-muted-foreground">Score: {totalScore} / 30</p>
              <div className="mt-4 w-full max-w-xs">
                <Progress value={(totalScore / 30) * 100} className="h-2.5" />
              </div>
              <p className="mt-4 max-w-md text-muted-foreground">{cfg.desc}</p>
            </CardContent>
          </Card>

          <h3 className="mb-4 font-display text-xl font-bold">💡 Tips for You</h3>
          <div className="mb-8 grid gap-3">
            {advice.tips.map((tip, i) => (
              <Card key={i}>
                <CardContent className="flex items-start gap-3 p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <p className="text-sm">{tip}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {advice.redFlags.length > 0 && (
            <>
              <h3 className="mb-4 font-display text-xl font-bold">🚩 Red Flags to Watch For</h3>
              <div className="mb-8 grid gap-3">
                {advice.redFlags.map((flag, i) => (
                  <Card key={i} className="border-destructive/20">
                    <CardContent className="flex items-start gap-3 p-4">
                      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
                      <p className="text-sm">{flag}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}

          <Button onClick={reset} variant="outline" className="rounded-full">
            <RotateCcw className="mr-2 h-4 w-4" /> Take Again
          </Button>
        </motion.div>
      </div>
    );
  }

  // Questions
  const q = relationshipQuestions[currentQ];

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="mb-6">
        <p className="mb-1 text-sm font-medium text-muted-foreground">
          Relationship Health — {q.category.charAt(0).toUpperCase() + q.category.slice(1)}
        </p>
        <Progress value={progress} className="h-2" />
        <p className="mt-1 text-xs text-muted-foreground">
          Question {currentQ + 1} of {relationshipQuestions.length}
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="mb-6 font-display text-xl font-semibold">{q.text}</h2>
          <div className="grid gap-3">
            {relationshipAnswerOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleAnswer(opt.value)}
                className={`rounded-xl border p-4 text-left transition-all hover:border-primary hover:bg-primary/5 ${
                  answers[q.id] === opt.value ? "border-primary bg-primary/10" : "bg-card"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-6">
        <Button
          variant="outline"
          disabled={currentQ === 0}
          onClick={() => setCurrentQ(currentQ - 1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
      </div>
    </div>
  );
};

export default Relationship;
