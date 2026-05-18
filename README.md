# Giraffe AI Workflow Platform

An enterprise-grade AI workflow assistant demo project built with Java, React, Python, and modern AI technologies.

This project simulates a real-world internal workflow system enhanced by AI capabilities such as:

- Workflow request management
- Approval task processing
- AI chat assistant
- RAG knowledge assistant
- Document upload and semantic search
- AI action agent (tool calling)

---

## Project Overview

The goal of this project is to demonstrate how AI can be integrated into traditional enterprise systems such as:

- ERP
- MES
- OA
- Approval systems
- Internal knowledge platforms

Typical scenarios:

- AI helps create workflow requests
- AI answers company policy questions
- AI searches uploaded SOP documents
- AI automatically invokes backend APIs
- AI summarizes workflow content

---


### Dashboard

![Dashboard screen](docs/screenshots/Dashboard.png)

### Workflows

![Workflow screen](docs/screenshots/Workflows.png)

### Pending Tasks

![Pending Tasks screen](docs/screenshots/PendingTasks.png)

### AI Agent

![AI Agent screen](docs/screenshots/AIAgent.png)


---


## Tech Stack

### Backend

- Java 17
- Spring Boot 3
- Mybatis-plus
- Postgres
- Maven

### Frontend

- React
- TypeScript
- Material UI
- React Router
- Axios
- Recharts

### AI Service

- Python 3.12
- FastAPI
- LangGraph
- DeepSeek API
- LangChain

### RAG

- Qdrant
- sentence-transformers
- local document indexing
- semantic retrieval

---

## Architecture

```text
React Frontend
     ↓
Java Spring Boot API
     ↓
Postgres Business Data

React Frontend
     ↓
Python FastAPI AI Service
     ↓
DeepSeek / LangGraph
     ↓
Qdrant Vector DB
````

---

## Key Features

### 1. Workflow Management

* Create workflow request
* List workflow requests
* Approval task management
* Dashboard KPI monitoring

### 2. AI Chat Assistant

* Ask workflow-related questions
* AI explains current business requests
* AI summarizes approval tasks

### 3. RAG Knowledge Assistant

* Upload internal documents
* Auto indexing
* Semantic search
* Source citation answer

### 4. AI Action Agent

Natural language instructions:

* create urgent procurement request
* show pending approvals
* summarize request 1

The agent automatically calls backend Java APIs.

---

## Folder Structure

```text
giraffe-ai-workflow/
├── backend-java
├── frontend-react
├── ai-agent-python
├── docker-compose-rag.yml
└── README.md
```

---

## Screenshots

### Dashboard

* KPI cards
* pending task charts
* activity timeline

### AI Agent

* workflow assistant
* knowledge assistant
* action agent

### Document Center

* document upload
* auto indexing
* citation answers

---

## Quick Start

### 1. Start Java backend

```bash
cd backend-java
mvn spring-boot:run
```

---

### 2. Start Python AI service

```bash
cd ai-agent-python
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000
```

---

### 3. Start Qdrant

```bash
docker compose -f docker-compose-rag.yml up -d
```

---

### 4. Start React frontend

```bash
cd frontend-react
npm install
npm run dev
```

---

## Example AI Queries

### Workflow Assistant

```text
show pending approvals
```

```text
summarize workflow request 3
```

---

### Knowledge Assistant

```text
what is urgent approval process
```

```text
who approves purchases above 50000 RMB
```

---

### Action Agent

```text
create urgent procurement request for 50 steel plates
```

---

## Business Scenario

This demo is designed for enterprise workflow scenarios such as:

* MES process approval
* ERP procurement workflow
* manufacturing SOP knowledge base
* internal process automation
* AI-assisted office systems

---

## Future Roadmap

* Multi-agent orchestration
* Role-based AI permissions
* Voice assistant
* OCR document parsing
* Workflow recommendation engine
* Production planning AI assistant

---

## Author

Senior Full Stack Engineer

Background:

* .NET / Java
* ERP / MES
* Workflow systems
* Smart manufacturing
* AI application integration

---

## License

MIT

```
 
