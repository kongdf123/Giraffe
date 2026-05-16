CREATE TABLE users (
                       id BIGSERIAL PRIMARY KEY,
                       username VARCHAR(50) NOT NULL,
                       full_name VARCHAR(100),
                       email VARCHAR(100),
                       department VARCHAR(100),
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE workflow_template (
                                   id BIGSERIAL PRIMARY KEY,
                                   code VARCHAR(50) UNIQUE NOT NULL,
                                   name VARCHAR(100) NOT NULL,
                                   description TEXT,
                                   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE workflow_request (
                                  id BIGSERIAL PRIMARY KEY,
                                  title VARCHAR(200),
                                  content TEXT,
                                  status VARCHAR(30),
                                  requester_id BIGINT REFERENCES users(id),
                                  template_id BIGINT REFERENCES workflow_template(id),
                                  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE approval_task (
                               id BIGSERIAL PRIMARY KEY,
                               workflow_request_id BIGINT REFERENCES workflow_request(id),
                               approver_id BIGINT REFERENCES users(id),
                               task_status VARCHAR(30),
                               comment TEXT,
                               created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, full_name, email, department)
VALUES ('zhangsan', 'Zhang San', 'zhang@test.com', 'IT');

INSERT INTO users (username, full_name, email, department)
VALUES ('lisi', 'Li Si', 'li@test.com', 'Finance');

INSERT INTO workflow_template (code, name, description)
VALUES ('PURCHASE', 'Purchase Request', 'Purchase approval workflow');

INSERT INTO workflow_template (code, name, description)
VALUES ('LEAVE', 'Leave Request', 'Leave workflow');

ALTER TABLE approval_task
    ADD COLUMN action_time TIMESTAMP NULL;

ALTER TABLE approval_task
    ADD COLUMN action_by VARCHAR(50) NULL;