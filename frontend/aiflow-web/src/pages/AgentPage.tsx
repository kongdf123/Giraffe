import { useCallback, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  TextField,
  Typography, Tabs,
  Tab
} from "@mui/material";
import { sendAgentMessage } from "../api/agentApi";
import { sendRagMessage } from "../api/ragApi";

export default function AgentPage() {
  const [message, setMessage] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [mode, setMode] = useState(0);

  const handleSend = useCallback(async () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || loading) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      //const res = await sendAgentMessage(trimmedMessage);
      const res =
        mode === 0
          ? await sendAgentMessage(trimmedMessage)
          : await sendRagMessage(trimmedMessage);
      setAnswer(res.data.answer ?? "");
      setMessage("");
    } catch {
      setError("Unable to reach the copilot. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [loading, message, mode]);

  return (
    <Container maxWidth={false} sx={{ mt: 3 }}>
      <Stack spacing={2}>
        <Typography component="h1" variant="h5">
          AI Workflow Copilot
        </Typography>
        {error ? <Alert severity="error">{error}</Alert> : null}
        <Card variant="outlined">
          <CardContent>
            <Stack spacing={2}>
              <Tabs value={mode} onChange={(_, v) => setMode(v)}>
                <Tab label="Workflow AI" />
                <Tab label="Knowledge AI" />
              </Tabs>
              <TextField
                fullWidth
                multiline
                minRows={3}
                disabled={loading}
                label="Ask AI"
                placeholder="Ask about a workflow, pending approval, or next step"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                    void handleSend();
                  }
                }}
              />

              <Box>
                <Button
                  variant="contained"
                  disabled={!message.trim() || loading}
                  onClick={handleSend}
                >
                  {loading ? "Sending..." : "Send"}
                </Button>
              </Box>

              <Box>
                <Typography component="h2" variant="subtitle1" gutterBottom>
                  AI Response
                </Typography>
                <Typography
                  color={answer ? "text.primary" : "text.secondary"}
                  sx={{ whiteSpace: "pre-wrap" }}
                >
                  {answer || "Responses will appear here after you send a message."}
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
}
