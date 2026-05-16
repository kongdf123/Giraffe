import { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, Button, Container, Stack, Typography } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { approveTask, getPendingTasks, rejectTask } from "../api/taskApi";

type TaskRow = {
  taskId: number;
  workflowTitle: string;
  requesterName: string;
};

export default function TaskPage() {
  const [rows, setRows] = useState<TaskRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [processingTaskId, setProcessingTaskId] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getPendingTasks();
      setRows(response.data);
    } catch {
      setError("Unable to load pending tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    queueMicrotask(() => {
      void load();
    });
  }, [load]);

  const handleApprove = useCallback(async (id: number) => {
    setProcessingTaskId(id);
    setError(null);

    try {
      await approveTask(id);
      await load();
    } catch {
      setError("Unable to approve the task. Please try again.");
    } finally {
      setProcessingTaskId(null);
    }
  }, [load]);

  const handleReject = useCallback(async (id: number) => {
    setProcessingTaskId(id);
    setError(null);

    try {
      await rejectTask(id);
      await load();
    } catch {
      setError("Unable to reject the task. Please try again.");
    } finally {
      setProcessingTaskId(null);
    }
  }, [load]);

  const columns = useMemo<GridColDef<TaskRow>[]>(
    () => [
      { field: "taskId", headerName: "Task ID", width: 110 },
      { field: "workflowTitle", headerName: "Workflow", flex: 1, minWidth: 220 },
      { field: "requesterName", headerName: "Requester", width: 180 },
      {
        field: "action",
        headerName: "Action",
        align: "center",
        headerAlign: "center",
        sortable: false,
        filterable: false,
        width: 190,
        renderCell: ({ row }) => {
          const isProcessing = processingTaskId === row.taskId;

          return (
            <Stack direction="row" spacing={1}>
              <Button
                size="small"
                variant="contained"
                disabled={isProcessing}
                onClick={() => handleApprove(row.taskId)}
              >
                Approve
              </Button>
              <Button
                size="small"
                color="error"
                variant="outlined"
                disabled={isProcessing}
                onClick={() => handleReject(row.taskId)}
              >
                Reject
              </Button>
            </Stack>
          );
        },
      },
    ],
    [handleApprove, handleReject, processingTaskId],
  );

  return (
    <Container maxWidth={false} sx={{ mt: 3 }}>
      <Stack spacing={2}>
        <Typography component="h1" variant="h5">
          Pending Tasks
        </Typography>
        {error ? <Alert severity="error">{error}</Alert> : null}
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.taskId}
          loading={loading}
          autoHeight
          disableRowSelectionOnClick
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
        />
      </Stack>
    </Container>
  );
}
