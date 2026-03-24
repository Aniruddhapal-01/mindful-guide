import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, RotateCcw, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  anxietyQuestions,
  depressionQuestions,
  answerOptions,
  getAnxietyLevel,
  getDepressionLevel,
  suggestions,
  type ScoreLevel,
} from "@/lib/questions";

type Phase = "intro" | "anxiety" | "depression" | "results";

const Assessment = () => {
  const [phase, setPhase] = useState<Phase>("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [anxietyAnswers, setAnxietyAnswers] = useState<Record<number, number>>({});
  const [depressionAnswers, setDepressionAnswers] = useState<Record<number, number>>({});

  const questions = phase === "anxiety" ? anxietyQuestions : depressionQuestions;
  const answers = phase === "anxiety" ? anxietyAnswers : depressionAnswers;
  const setAnswers = phase === "anxiety" ? setAnxietyAnswers : setDepressionAnswers;
  const totalQuestions = anxietyQuestions.length + depressionQuestions.length;
  const answeredCount =
    Object.keys(anxietyAnswers).length +
    (phase === "depression" || phase === "results" ? Object.keys(depressionAnswers).length : 0);
  const progressPercent = phase === "results" ? 100 : (answeredCount / totalQuestions) * 100;

  const anxietyScore = Object.values(anxietyAnswers).reduce((a, b) => a + b, 0);
  const depressionScore = Object.values(depressionAnswers).reduce((a, b) => a + b, 0);
  const anxietyLevel = getAnxietyLevel(anxietyScore);
  const depressionLevel = getDepressionLevel(depressionScore);
  const overallLevel: ScoreLevel =
    anxietyLevel === "high" || depressionLevel === "high"
      ? "high"
      : anxietyLevel === "moderate" || depressionLevel === "moderate"
      ? "moderate"
      : "low";

  const handleAnswer = (value: number) => {
    const qId = questions[currentQ].id;
    setAnswers((prev) => ({ ...prev, [qId]: value }));
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else if (phase === "anxiety") {
      setPhase("depression");
      setCurrentQ(0);
    } else {
      setPhase("results");
    }
  };

  const reset = () => {
    setPhase("intro");
    setCurrentQ(0);
    setAnxietyAnswers({});
    setDepressionAnswers({});
  };

  const levelConfig = {
    low: { label: "Low", color: "text-wellness-green", bg: "bg-wellness-green/15", desc: "Your responses suggest a low level of concern. Keep up the positive habits!" },
    moderate: { label: "Moderate", color: "text-wellness-yellow", bg: "bg-wellness-yellow/15", desc: "Your responses indicate moderate levels. Consider adopting some wellness practices." },
    high: { label: "High", color: "text-wellness-rose", bg: "bg-wellness-rose/15", desc: "Your responses suggest higher levels of concern. We strongly encourage seeking professional guidance." },
  };

  if (phase === "intro") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="mb-4 font-display text-3xl font-bold">Mental Health Self-Assessment</h1>
          <p className="mb-6 text-muted-foreground">
            This assessment includes questions inspired by the GAD-7 (anxiety) and PHQ-9 (depression) scales. 
            Answer based on how you've been feeling over the <strong>last two weeks</strong>.
          </p>
          <Card className="mb-6 border-wellness-peach/30 bg-wellness-peach/10">
            <CardContent className="flex items-start gap-3 p-4">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-wellness-rose" />
              <p className="text-sm">
                This is not a clinical diagnosis. Results are for self-reflection only. 
                Please consult a licensed professional for medical advice.
              </p>
            </CardContent>
          </Card>
          <Button onClick={() => setPhase("anxiety")} size="lg" className="rounded-full px-8">
            Begin Assessment <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    );
  }

  if (phase === "results") {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="mb-8 font-display text-3xl font-bold">Your Results</h1>

          {overallLevel === "high" && (
            <Card className="mb-6 border-destructive/30 bg-destructive/10">
              <CardContent className="flex items-start gap-3 p-4">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
                <div>
                  <p className="font-semibold">Important Notice</p>
                  <p className="text-sm">
                    This platform is not a substitute for professional help. Please consider consulting a licensed mental health professional.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="mb-8 grid gap-4 sm:grid-cols-2">
            {[
              { label: "Anxiety", score: anxietyScore, max: 21, level: anxietyLevel },
              { label: "Depression", score: depressionScore, max: 27, level: depressionLevel },
            ].map((r) => (
              <Card key={r.label}>
                <CardContent className="p-6">
                  <h3 className="mb-1 font-display text-lg font-semibold">{r.label}</h3>
                  <div className="mb-2 flex items-baseline gap-2">
                    <span className="font-display text-3xl font-bold">{r.score}</span>
                    <span className="text-sm text-muted-foreground">/ {r.max}</span>
                  </div>
                  <div className="mb-3">
                    <Progress value={(r.score / r.max) * 100} className="h-2.5" />
                  </div>
                  <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${levelConfig[r.level].bg} ${levelConfig[r.level].color}`}>
                    {levelConfig[r.level].label}
                  </span>
                  <p className="mt-3 text-sm text-muted-foreground">{levelConfig[r.level].desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <h2 className="mb-4 font-display text-xl font-bold">Personalized Suggestions</h2>
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {suggestions[overallLevel].map((s) => (
              <Card key={s.title}>
                <CardContent className="p-5">
                  <div className="mb-2 text-2xl">{s.icon}</div>
                  <h4 className="mb-1 font-display font-semibold">{s.title}</h4>
                  <p className="text-sm text-muted-foreground">{s.description}</p>
                  <span className="mt-2 inline-block rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
                    {s.category}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button onClick={reset} variant="outline" className="rounded-full">
            <RotateCcw className="mr-2 h-4 w-4" /> Take Again
          </Button>
        </motion.div>
      </div>
    );
  }

  // Questionnaire phase
  const q = questions[currentQ];
  const sectionLabel = phase === "anxiety" ? "Anxiety Assessment (GAD-7)" : "Depression Assessment (PHQ-9)";

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="mb-6">
        <p className="mb-1 text-sm font-medium text-muted-foreground">{sectionLabel}</p>
        <Progress value={progressPercent} className="h-2" />
        <p className="mt-1 text-xs text-muted-foreground">
          Question {currentQ + 1} of {questions.length}
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={q.id + phase}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="mb-2 font-display text-xl font-semibold">
            Over the last 2 weeks, how often have you been bothered by:
          </h2>
          <p className="mb-6 text-lg text-foreground">{q.text}</p>

          <div className="grid gap-3">
            {answerOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleAnswer(opt.value)}
                className={`rounded-xl border p-4 text-left transition-all hover:border-primary hover:bg-primary/5 ${
                  answers[q.id] === opt.value ? "border-primary bg-primary/10" : "bg-card"
                }`}
              >
                <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full border text-sm font-medium">
                  {opt.value}
                </span>
                {opt.label}
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-6 flex gap-3">
        <Button
          variant="outline"
          disabled={currentQ === 0 && phase === "anxiety"}
          onClick={() => {
            if (currentQ > 0) {
              setCurrentQ(currentQ - 1);
            } else if (phase === "depression") {
              setPhase("anxiety");
              setCurrentQ(anxietyQuestions.length - 1);
            }
          }}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
      </div>
    </div>
  );
};

export default Assessment;
