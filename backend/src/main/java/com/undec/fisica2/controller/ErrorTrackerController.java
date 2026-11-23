package com.undec.fisica2.controller;

import com.undec.fisica2.model.StudentErrorEntity;
import com.undec.fisica2.repository.StudentErrorRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/errors")
public class ErrorTrackerController {

    private final StudentErrorRepository errorRepository;

    public ErrorTrackerController(StudentErrorRepository errorRepository) {
        this.errorRepository = errorRepository;
    }

    @GetMapping
    public ResponseEntity<List<StudentErrorEntity>> getAllActiveErrors() {
        return ResponseEntity.ok(errorRepository.findByResolvedFalseOrderByCreatedAtDesc());
    }

    @PostMapping
    public ResponseEntity<StudentErrorEntity> logError(@RequestBody StudentErrorEntity newError) {
        Optional<StudentErrorEntity> existing = errorRepository.findByUnitNumberAndCategoryAndTopicTitle(
                newError.getUnitNumber(), newError.getCategory(), newError.getTopicTitle()
        );

        if (existing.isPresent()) {
            StudentErrorEntity err = existing.get();
            err.setOccurrences(err.getOccurrences() + 1);
            err.setResolved(false);
            err.setMistakeDescription(newError.getMistakeDescription());
            err.setCorrectionExplanation(newError.getCorrectionExplanation());
            return ResponseEntity.ok(errorRepository.save(err));
        }

        return ResponseEntity.ok(errorRepository.save(newError));
    }

    @PatchMapping("/{id}/resolve")
    public ResponseEntity<StudentErrorEntity> resolveError(@PathVariable Long id) {
        StudentErrorEntity err = errorRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Error no encontrado: " + id));
        err.setResolved(true);
        return ResponseEntity.ok(errorRepository.save(err));
    }
}
