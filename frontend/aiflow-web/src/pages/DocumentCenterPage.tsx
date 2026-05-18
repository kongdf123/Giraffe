import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import { fetchDocuments, uploadDocument } from "../api/documentApi";

export default function DocumentCenterPage() {
  const [files, setFiles] = useState<string[]>([]);

  const loadFiles = async () => {
    const res = await fetchDocuments();
    setFiles(res.data);
  };

  useEffect(() => {
    loadFiles();
  }, []);

  const handleUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files?.length) return;

    await uploadDocument(event.target.files[0]);
    await loadFiles();
  };

  return (
    <Container maxWidth={false} sx={{ mt: 3 }}>
      <Stack spacing={3}>
        <Typography variant="h5">
          Document Center
        </Typography>

        <Card variant="outlined">
          <CardContent>
            <Stack spacing={2}>
              <Button variant="contained" component="label">
                Upload Document
                <input hidden type="file" onChange={handleUpload} />
              </Button>
            </Stack>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Uploaded Documents
            </Typography>

            <List>
              {files.map((file) => (
                <ListItem key={file}>
                  <ListItemText primary={file} />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
}