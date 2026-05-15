package com.kent.aiflow.workflow.repository;

import com.kent.aiflow.workflow.entity.ApprovalTaskEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApprovalTaskRepository extends JpaRepository<ApprovalTaskEntity, Long> {
}