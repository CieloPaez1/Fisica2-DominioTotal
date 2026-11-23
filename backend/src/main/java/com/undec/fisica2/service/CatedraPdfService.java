package com.undec.fisica2.service;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.*;

@Service
public class CatedraPdfService {

    @Value("${catedra.pdf.directory:C:/Users/Cielo/Documents/fisica2}")
    private String pdfDirectoryPath;

    public record PdfMetadataDto(
            String filename,
            long sizeBytes,
            long sizeKB,
            int pageCount,
            String category,
            List<Integer> unitNumbers,
            String description
    ) {}

    public List<PdfMetadataDto> listAvailablePdfs() {
        File dir = new File(pdfDirectoryPath);
        if (!dir.exists() || !dir.isDirectory()) {
            return Collections.emptyList();
        }

        File[] files = dir.listFiles((d, name) -> name.toLowerCase().endsWith(".pdf"));
        if (files == null) return Collections.emptyList();

        Arrays.sort(files, Comparator.comparing(File::getName));

        List<PdfMetadataDto> result = new ArrayList<>();
        for (File f : files) {
            String name = f.getName();
            long sizeKB = Math.max(1, f.length() / 1024);
            result.add(new PdfMetadataDto(
                    name,
                    f.length(),
                    sizeKB,
                    0,
                    inferCategory(name),
                    inferUnits(name),
                    inferDescription(name)
            ));
        }
        return result;
    }

    public File getPdfFile(String filename) {
        // Prevent path traversal
        String safeName = new File(filename).getName();
        File pdfFile = new File(pdfDirectoryPath, safeName);
        if (!pdfFile.exists() || !pdfFile.isFile()) {
            throw new IllegalArgumentException("Archivo PDF no encontrado: " + safeName);
        }
        return pdfFile;
    }

    public Map<String, Object> inspectPdfPages(String filename, int maxPages) throws IOException {
        File pdfFile = getPdfFile(filename);

        try (PDDocument document = Loader.loadPDF(pdfFile)) {
            int totalPages = document.getNumberOfPages();
            PDFTextStripper stripper = new PDFTextStripper();

            List<String> pagesText = new ArrayList<>();
            int pagesToExtract = Math.min(totalPages, maxPages);

            for (int p = 1; p <= pagesToExtract; p++) {
                stripper.setStartPage(p);
                stripper.setEndPage(p);
                String text = stripper.getText(document).trim();
                pagesText.add(text.isEmpty() ? "[Página con diagramas o esquemas gráficos de cátedra]" : text);
            }

            Map<String, Object> response = new HashMap<>();
            response.put("filename", pdfFile.getName());
            response.put("totalPages", totalPages);
            response.put("extractedPagesCount", pagesText.size());
            response.put("unitNumbers", inferUnits(pdfFile.getName()));
            response.put("category", inferCategory(pdfFile.getName()));
            response.put("pages", pagesText);
            return response;
        }
    }

    public Map<String, Object> saveAndInspectUploadedPdf(MultipartFile file) throws IOException {
        if (file.isEmpty() || file.getOriginalFilename() == null) {
            throw new IllegalArgumentException("El archivo PDF subido está vacío.");
        }
        String safeName = new File(file.getOriginalFilename()).getName();
        if (!safeName.toLowerCase().endsWith(".pdf")) {
            throw new IllegalArgumentException("Solo se permiten archivos con extensión .pdf");
        }
        File dir = new File(pdfDirectoryPath);
        if (!dir.exists()) {
            dir.mkdirs();
        }
        Path target = dir.toPath().resolve(safeName);
        Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);
        return inspectPdfPages(safeName, 10);
    }

    private String inferCategory(String name) {
        String lower = name.toLowerCase();
        if (lower.contains("programa") || lower.contains("2025-2013")) return "programa";
        if (lower.contains("tp") || lower.contains("trabajo")) return "tp";
        if (lower.contains("unidad") || lower.contains("electro") || lower.contains("magnet")) return "teoria";
        if (lower.contains("resumen") || lower.contains("formula")) return "resumen";
        return "teoria";
    }

    private List<Integer> inferUnits(String name) {
        String lower = name.toLowerCase();
        if (lower.contains("03-electrostatica")) return List.of(1, 2, 3);
        if (lower.contains("04-electrodinamica")) return List.of(4, 5);
        if (lower.contains("05-magnetismo")) return List.of(6, 7);
        if (lower.contains("06-electromagnetismo")) return List.of(8, 9);
        if (lower.contains("unidad 2") || lower.contains("tp n°2") || lower.contains("tp n° 2")) return List.of(2);
        if (lower.contains("unidad 8")) return List.of(8);
        if (lower.contains("unidad 9")) return List.of(9);
        if (lower.contains("tp n°1") || lower.contains("tp n° 1")) return List.of(1);
        if (lower.contains("tp n°3") || lower.contains("tp n° 3")) return List.of(3);
        if (lower.contains("tp n°4") || lower.contains("tp n° 4")) return List.of(4);
        if (lower.contains("tp n°5") || lower.contains("tp n° 5")) return List.of(5);
        if (lower.contains("tp n°6") || lower.contains("tp n° 6")) return List.of(6, 7);
        if (lower.contains("tp n°7") || lower.contains("tp n° 7")) return List.of(8);
        return List.of(1, 2, 3, 4, 5, 6, 7, 8, 9);
    }

    private String inferDescription(String name) {
        String lower = name.toLowerCase();
        if (lower.contains("2025-2013")) return "Programa Analítico Oficial UNdeC — Unidades 1 a 9 y régimen de evaluación final.";
        if (lower.contains("03-electrostatica")) return "Apunte Oficial Cátedra UNdeC: Carga Eléctrica, Coulomb, Campo Eléctrico, Ley de Gauss y Potencial.";
        if (lower.contains("04-electrodinamica")) return "Apunte Oficial Cátedra UNdeC: Capacitores, Dieléctricos, Corriente Continua y Circuitos RC.";
        if (lower.contains("05-magnetismo")) return "Apunte Oficial Cátedra UNdeC: Fuerza Magnética de Lorentz, Efecto Hall, Biot-Savart y Ley de Ampère.";
        if (lower.contains("06-electromagnetismo")) return "Apunte Oficial Cátedra UNdeC: Inducción de Faraday-Lenz, Autoinductancia, Corriente Alterna y Maxwell.";
        if (lower.contains("tp")) return "Guía de Trabajos Prácticos de la Cátedra con ejercicios resueltos y propuestos para examen.";
        return "Documento Académico Oficial de la Cátedra de Física 2 (UNdeC).";
    }
}
