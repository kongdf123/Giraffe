import { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, Button, Chip, Container, Stack, Typography } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { getWorkflows, submitWorkflow } from "../api/workflowApi";

type WorkflowRow = {
  id: number;
  title: string;
  requesterName: string;
  status: string;
};

export default function WorkflowPage() {
  const [rows, setRows] = useState<WorkflowRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittingWorkflowId, setSubmittingWorkflowId] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await getWorkflows();
      setRows(data);
    } catch {
      setError("Unable to load workflows. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    queueMicrotask(() => {
      void load();
    });
  }, [load]);

  const handleSubmit = useCallback(async (id: number) => {
    setSubmittingWorkflowId(id);
    setError(null);

    try {
      await submitWorkflow(id);
      await load();
    } catch {
      setError("Unable to submit the workflow. Please try again.");
    } finally {
      setSubmittingWorkflowId(null);
    }
  }, [load]);

  const columns = useMemo<GridColDef<WorkflowRow>[]>(
    () => [
      { field: "id", headerName: "ID", width: 90 },
      { field: "title", headerName: "Title", flex: 1, minWidth: 220 },
      { field: "requesterName", headerName: "Requester", width: 180 },
      {
        field: "status",
        headerName: "Status",
        width: 140,
        renderCell: ({ value }) => (
          <Chip label={String(value ?? "Unknown")} size="small" variant="outlined" />
        ),
      },
      {
        field: "action",
        headerName: "Action",
        align: "center",
        headerAlign: "center",
        sortable: false,
        filterable: false,
        width: 150,
        renderCell: ({ row }) => {
          const isSubmitting = submittingWorkflowId === row.id;

          return (
            <Button
              size="small"
              variant="contained"
              disabled={isSubmitting}
              onClick={() => handleSubmit(row.id)}
            >
              Submit
            </Button>
          );
        },
      },
    ],
    [handleSubmit, submittingWorkflowId],
  );

  return (
    <Container maxWidth={false} sx={{ mt: 3 }}>
      <Stack spacing={2}>
        <Typography component="h1" variant="h5">
          Workflows
        </Typography>
        {error ? <Alert severity="error">{error}</Alert> : null}
        <DataGrid
          rows={rows}
          columns={columns}
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
