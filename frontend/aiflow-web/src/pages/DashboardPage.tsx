import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider
} from "@mui/material";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const kpiData = [
  {
    title: "Pending Approvals",
    value: 8,
    caption: "Awaiting review"
  },
  {
    title: "Completed Today",
    value: 15,
    caption: "Workflows finished"
  },
  {
    title: "Urgent Requests",
    value: 3,
    caption: "Needs attention"
  },
  {
    title: "AI Suggestions",
    value: 6,
    caption: "Automated recommendations"
  }
];

const chartData = [
  { day: "Mon", tasks: 4 },
  { day: "Tue", tasks: 6 },
  { day: "Wed", tasks: 8 },
  { day: "Thu", tasks: 5 },
  { day: "Fri", tasks: 9 }
];

const recentActivities = [
  { title: "Workflow #1023 submitted", time: "2m ago" },
  { title: "Approval task assigned to manager", time: "15m ago" },
  { title: "AI summarized pending requests", time: "45m ago" },
  { title: "Workflow #1020 completed", time: "1h ago" },
  { title: "Urgent approval escalated", time: "2h ago" }
];

export default function DashboardPage() {
  return (
    <Box sx={{ p: 3, minHeight: "100%" }}>
      <Stack spacing={1} sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1">
          Workflow Dashboard
        </Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 680 }}>
          Track approvals, monitor task flow, and review the latest activity in one place.
          The dashboard helps your team stay focused on high-priority workflows and AI-driven
          recommendations.
        </Typography>
      </Stack>

      <Box
        sx={{
          display: "grid",
          gap: 3,
          gridTemplateColumns: {
            xs: "repeat(1, minmax(0, 1fr))",
            sm: "repeat(2, minmax(0, 1fr))",
            md: "repeat(4, minmax(0, 1fr))"
          },
          mb: 3
        }}
      >
        {kpiData.map((item) => (
          <Card
            key={item.title}
            sx={{
              borderRadius: 3,
              minHeight: 140,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              background: (theme) => (theme.palette.mode === "dark" ? "#1f2030" : "#ffffff"),
              boxShadow: (theme) => theme.shadows[1]
            }}
          >
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" sx={{ textTransform: "uppercase", letterSpacing: 0.8 }}>
                {item.title}
              </Typography>
              <Typography variant="h3" sx={{ mt: 1.5, mb: 1 }}>
                {item.value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.caption}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box
        sx={{
          display: "grid",
          gap: 3,
          gridTemplateColumns: {
            xs: "repeat(1, minmax(0, 1fr))",
            md: "2fr 1fr"
          }
        }}
      >
        <Card sx={{ borderRadius: 3, boxShadow: (theme) => theme.shadows[1] }}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
              <Box>
                <Typography variant="h6">Pending Tasks Trend</Typography>
                <Typography color="text.secondary" variant="body2">
                  Daily workload for the current week.
                </Typography>
              </Box>
              <Typography color="success.main" variant="body2">
                +18% compared to last week
              </Typography>
            </Stack>

            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={chartData} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: "rgba(0, 0, 0, 0.04)" }} />
                <Bar dataKey="tasks" fill="#7B61FF" radius={[8, 8, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Stack spacing={3}>
          <Card sx={{ borderRadius: 3, boxShadow: (theme) => theme.shadows[1] }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Summary
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Review the current state of your workflows, approvals, and AI insights at a glance.
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2">
                  <strong>High-priority workflows:</strong> 5 active
                </Typography>
                <Typography variant="body2">
                  <strong>Approval SLA:</strong> 92% on time
                </Typography>
                <Typography variant="body2">
                  <strong>AI automation:</strong> 3 suggestions pending
                </Typography>
              </Stack>
            </CardContent>
          </Card>

          <Card sx={{ borderRadius: 3, boxShadow: (theme) => theme.shadows[1] }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>
              <List disablePadding>
                {recentActivities.map((item, index) => (
                  <Box key={index} sx={{ px: 0 }}>
                    <ListItem sx={{ py: 1.25 }}>
                      <ListItemText
                        primary={item.title}
                        secondary={item.time}
                        primaryTypographyProps={{ variant: "body2" }}
                        secondaryTypographyProps={{ variant: "caption" }}
                      />
                    </ListItem>
                    {index < recentActivities.length - 1 && <Divider component="li" />}
                  </Box>
                ))}
              </List>
            </CardContent>
          </Card>
        </Stack>
      </Box>
    </Box>
  );
}