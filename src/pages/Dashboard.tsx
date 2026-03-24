import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { moodOptions, type MoodEntry } from "@/lib/questions";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const MOOD_KEY = "mindfulme_moods";

const moodToValue: Record<string, number> = {
  Happy: 5,
  Calm: 4,
  Neutral: 3,
  Anxious: 2,
  Sad: 1,
  Stressed: 0,
};

const Dashboard = () => {
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [note, setNote] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem(MOOD_KEY);
    if (stored) setEntries(JSON.parse(stored));
  }, []);

  const save = (updated: MoodEntry[]) => {
    setEntries(updated);
    localStorage.setItem(MOOD_KEY, JSON.stringify(updated));
  };

  const logMood = () => {
    if (!selectedMood) return;
    const opt = moodOptions.find((m) => m.mood === selectedMood)!;
    const entry: MoodEntry = {
      date: new Date().toISOString(),
      mood: opt.mood,
      emoji: opt.emoji,
      note: note.trim() || undefined,
    };
    save([entry, ...entries]);
    setSelectedMood(null);
    setNote("");
  };

  const deleteEntry = (index: number) => {
    const updated = entries.filter((_, i) => i !== index);
    save(updated);
  };

  const chartData = [...entries]
    .reverse()
    .slice(-30)
    .map((e) => ({
      date: new Date(e.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      value: moodToValue[e.mood] ?? 3,
      mood: e.mood,
    }));

  const todayLogged = entries.length > 0 && new Date(entries[0].date).toDateString() === new Date().toDateString();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="mb-2 font-display text-3xl font-bold">Mood Tracker</h1>
        <p className="mb-8 text-muted-foreground">Log how you're feeling and watch your trends over time.</p>

        {/* Mood selector */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h3 className="mb-4 font-display font-semibold">
              {todayLogged ? "You've already logged today! Log again?" : "How are you feeling right now?"}
            </h3>
            <div className="mb-4 flex flex-wrap gap-3">
              {moodOptions.map((m) => (
                <button
                  key={m.mood}
                  onClick={() => setSelectedMood(m.mood)}
                  className={`flex flex-col items-center gap-1 rounded-xl border p-3 transition-all hover:scale-105 ${
                    selectedMood === m.mood ? "border-primary bg-primary/10 shadow-md" : "bg-card"
                  }`}
                >
                  <span className="text-2xl">{m.emoji}</span>
                  <span className="text-xs font-medium">{m.mood}</span>
                </button>
              ))}
            </div>
            <Textarea
              placeholder="Add a note (optional)..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="mb-4 resize-none"
              rows={2}
            />
            <Button onClick={logMood} disabled={!selectedMood} className="rounded-full px-6">
              Log Mood
            </Button>
          </CardContent>
        </Card>

        {/* Chart */}
        {chartData.length > 1 && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="mb-4 font-display font-semibold">Mood Trends</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} className="fill-muted-foreground" />
                    <YAxis
                      domain={[0, 5]}
                      ticks={[0, 1, 2, 3, 4, 5]}
                      tickFormatter={(v: number) =>
                        ["Stressed", "Sad", "Anxious", "Neutral", "Calm", "Happy"][v] || ""
                      }
                      tick={{ fontSize: 11 }}
                      className="fill-muted-foreground"
                      width={70}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "0.75rem",
                        border: "1px solid hsl(var(--border))",
                        background: "hsl(var(--card))",
                      }}
                      formatter={(value: number) =>
                        ["Stressed", "Sad", "Anxious", "Neutral", "Calm", "Happy"][value] || ""
                      }
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2.5}
                      dot={{ fill: "hsl(var(--primary))", r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}

        {/* History */}
        <h3 className="mb-4 font-display text-xl font-bold">Mood History</h3>
        {entries.length === 0 ? (
          <p className="text-muted-foreground">No entries yet. Log your first mood above!</p>
        ) : (
          <div className="grid gap-3">
            {entries.slice(0, 20).map((e, i) => (
              <Card key={i}>
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{e.emoji}</span>
                    <div>
                      <p className="font-medium">{e.mood}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(e.date).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </p>
                      {e.note && <p className="mt-1 text-sm text-muted-foreground">{e.note}</p>}
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => deleteEntry(i)}>
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;
