package com.undec.fisica2.model;

import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "program_units")
public class ProgramUnitEntity implements Serializable {

    @Id
    private Integer unitNumber;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String subtitle;

    @Column(nullable = false)
    private String parcialGroup;

    @Column(nullable = false)
    private String labId;

    // Progreso de las 4 etapas (0 a 100)
    private int progressTeoria;
    private int progressLaboratorio;
    private int progressPractico;
    private int progressPruebaDominio;

    // Estado de certificación: "no_iniciada", "en_progreso", "inestable", "certificado"
    @Column(nullable = false)
    private String certificationStatus;

    public ProgramUnitEntity() {
    }

    public ProgramUnitEntity(Integer unitNumber, String title, String subtitle, String parcialGroup, String labId) {
        this.unitNumber = unitNumber;
        this.title = title;
        this.subtitle = subtitle;
        this.parcialGroup = parcialGroup;
        this.labId = labId;
        this.progressTeoria = 0;
        this.progressLaboratorio = 0;
        this.progressPractico = 0;
        this.progressPruebaDominio = 0;
        this.certificationStatus = "no_iniciada";
    }

    // Getters y Setters
    public Integer getUnitNumber() {
        return unitNumber;
    }

    public void setUnitNumber(Integer unitNumber) {
        this.unitNumber = unitNumber;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSubtitle() {
        return subtitle;
    }

    public void setSubtitle(String subtitle) {
        this.subtitle = subtitle;
    }

    public String getParcialGroup() {
        return parcialGroup;
    }

    public void setParcialGroup(String parcialGroup) {
        this.parcialGroup = parcialGroup;
    }

    public String getLabId() {
        return labId;
    }

    public void setLabId(String labId) {
        this.labId = labId;
    }

    public int getProgressTeoria() {
        return progressTeoria;
    }

    public void setProgressTeoria(int progressTeoria) {
        this.progressTeoria = progressTeoria;
    }

    public int getProgressLaboratorio() {
        return progressLaboratorio;
    }

    public void setProgressLaboratorio(int progressLaboratorio) {
        this.progressLaboratorio = progressLaboratorio;
    }

    public int getProgressPractico() {
        return progressPractico;
    }

    public void setProgressPractico(int progressPractico) {
        this.progressPractico = progressPractico;
    }

    public int getProgressPruebaDominio() {
        return progressPruebaDominio;
    }

    public void setProgressPruebaDominio(int progressPruebaDominio) {
        this.progressPruebaDominio = progressPruebaDominio;
    }

    public String getCertificationStatus() {
        return certificationStatus;
    }

    public void setCertificationStatus(String certificationStatus) {
        this.certificationStatus = certificationStatus;
    }

    public int calculateMasteryPercentage() {
        double weighted = (0.20 * progressTeoria) +
                          (0.25 * progressLaboratorio) +
                          (0.25 * progressPractico) +
                          (0.30 * progressPruebaDominio);
        return (int) Math.round(Math.max(0, Math.min(100, weighted)));
    }
}
