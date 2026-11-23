package com.undec.fisica2.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "student_errors")
public class StudentErrorEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer unitNumber;

    @Column(nullable = false)
    private String category; // 'simetria', 'signo', 'limites', 'unidades', 'formula', etc.

    @Column(nullable = false)
    private String sourceContext;

    @Column(nullable = false)
    private String topicTitle;

    @Column(columnDefinition = "TEXT")
    private String mistakeDescription;

    @Column(columnDefinition = "TEXT")
    private String correctionExplanation;

    private int occurrences;

    private boolean resolved;

    private LocalDateTime createdAt;

    public StudentErrorEntity() {
        this.occurrences = 1;
        this.resolved = false;
        this.createdAt = LocalDateTime.now();
    }

    public StudentErrorEntity(Integer unitNumber, String category, String sourceContext,
                              String topicTitle, String mistakeDescription, String correctionExplanation) {
        this();
        this.unitNumber = unitNumber;
        this.category = category;
        this.sourceContext = sourceContext;
        this.topicTitle = topicTitle;
        this.mistakeDescription = mistakeDescription;
        this.correctionExplanation = correctionExplanation;
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public Integer getUnitNumber() {
        return unitNumber;
    }

    public void setUnitNumber(Integer unitNumber) {
        this.unitNumber = unitNumber;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getSourceContext() {
        return sourceContext;
    }

    public void setSourceContext(String sourceContext) {
        this.sourceContext = sourceContext;
    }

    public String getTopicTitle() {
        return topicTitle;
    }

    public void setTopicTitle(String topicTitle) {
        this.topicTitle = topicTitle;
    }

    public String getMistakeDescription() {
        return mistakeDescription;
    }

    public void setMistakeDescription(String mistakeDescription) {
        this.mistakeDescription = mistakeDescription;
    }

    public String getCorrectionExplanation() {
        return correctionExplanation;
    }

    public void setCorrectionExplanation(String correctionExplanation) {
        this.correctionExplanation = correctionExplanation;
    }

    public int getOccurrences() {
        return occurrences;
    }

    public void setOccurrences(int occurrences) {
        this.occurrences = occurrences;
    }

    public boolean isResolved() {
        return resolved;
    }

    public void setResolved(boolean resolved) {
        this.resolved = resolved;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
