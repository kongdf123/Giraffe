import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText
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
  { title: "Pending Approvals", value: 8 },
  { title: "Completed Today", value: 15 },
  { title: "Urgent Requests", value: 3 },
  { title: "AI Suggestions", value: 6 }
];

const chartData = [
  { day: "Mon", tasks: 4 },
  { day: "Tue", tasks: 6 },
  { day: "Wed", tasks: 8 },
  { day: "Thu", tasks: 5 },
  { day: "Fri", tasks: 9 }
];

const recentActivities = [
  "Workflow #1023 submitted",
  "Approval task assigned to manager",
  "AI summarized pending requests",
  "Workflow #1020 completed",
  "Urgent approval escalated"
];

export default function DashboardPage() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Workflow Dashboard
      </Typography>

      <Grid container spacing={3}>
        {kpiData.map((item) => (
          <Grid item xs={12} md={3} key={item.title}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="h4">{item.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}

        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Pending Tasks Trend
              </Typography>

              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="tasks" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>

              <List>
                {recentActivities.map((item, index) => (
                  <ListItem key={index} divider>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}