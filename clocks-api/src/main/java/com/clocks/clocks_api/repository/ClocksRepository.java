package com.clocks.clocks_api.repository;

import com.clocks.clocks_api.model.Clock;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface ClocksRepository extends JpaRepository<Clock, UUID> {
}