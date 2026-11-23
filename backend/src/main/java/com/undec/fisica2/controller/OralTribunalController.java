package com.undec.fisica2.controller;

import com.undec.fisica2.service.OralTribunalService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/tribunal")
public class OralTribunalController {

    private final OralTribunalService tribunalService;

    public OralTribunalController(OralTribunalService tribunalService) {
        this.tribunalService = tribunalService;
    }

    @GetMapping
    public ResponseEntity<java.util.List<OralTribunalService.TribunalCase>> getAllCases() {
        return ResponseEntity.ok(tribunalService.getAllCases());
    }

    @GetMapping("/{unitNumber}")
    public ResponseEntity<OralTribunalService.TribunalCase> getCase(@PathVariable int unitNumber) {
        return ResponseEntity.ok(tribunalService.getCaseForUnit(unitNumber));
    }

    @PostMapping("/{unitNumber}/evaluate")
    public ResponseEntity<OralTribunalService.TribunalEvaluationResult> evaluate(
            @PathVariable int unitNumber,
            @RequestBody Map<String, String> body
    ) {
        String initial = body.getOrDefault("initialDefense", "");
        String followUp = body.getOrDefault("followUpDefense", "");
        return ResponseEntity.ok(tribunalService.evaluateDefense(unitNumber, initial, followUp));
    }
}
