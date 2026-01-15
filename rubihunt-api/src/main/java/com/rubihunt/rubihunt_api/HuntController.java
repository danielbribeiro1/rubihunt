package com.rubihunt.rubihunt_api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;

@RestController
@RequestMapping("/hunts")
@CrossOrigin(origins = "*") // Permite que o React acesse o Java
public class HuntController {

    @Autowired
    private HuntRepository repository;

    // --- 1. BUSCA PÚBLICA (Só mostra Aprovadas) ---
    @GetMapping
    public List<Hunt> getAllHunts(
        @RequestParam(required = false) String title, 
        @RequestParam(required = false) String vocation,
        @RequestParam(required = false) Integer minLevel,
        @RequestParam(required = false) Integer maxLevel
    ) {
        // Pega todas as hunts do banco
        List<Hunt> lista = repository.findAll();

        // FILTRO DE SEGURANÇA: Só mostra o que já foi aprovado
        lista = lista.stream()
            .filter(h -> h.isApproved())
            .toList();

        // Filtro de Nome
        if (title != null && !title.isEmpty()) {
            lista = lista.stream()
                .filter(h -> h.getTitle().toLowerCase().contains(title.toLowerCase()))
                .toList();
        }

        // Filtro de Vocação (Com 'contains' para suportar múltiplas vocações)
        if (vocation != null && !vocation.isEmpty() && !vocation.equals("all")) {
            lista = lista.stream()
                .filter(h -> h.getVocation().toLowerCase().contains(vocation.toLowerCase()))
                .toList();
        }

        // Filtro de Level Mínimo
        if (minLevel != null) {
            lista = lista.stream()
                .filter(h -> extractLevel(h.getLevel()) >= minLevel)
                .toList();
        }

        // Filtro de Level Máximo
        if (maxLevel != null) {
            lista = lista.stream()
                .filter(h -> extractLevel(h.getLevel()) <= maxLevel)
                .toList();
        }

        return lista;
    }

    // --- 2. BUSCA POR ID (Página de Detalhes) ---
    @GetMapping("/{id}")
    public Hunt getHuntById(@PathVariable Long id) {
        return repository.findById(id).orElse(null);
    }

    // --- 3. ADMIN: VER PENDENTES (Para moderação) ---
    @GetMapping("/pending")
    public List<Hunt> getPendingHunts() {
        return repository.findAll().stream()
                .filter(h -> !h.isApproved()) // Retorna só as que NÃO estão aprovadas
                .toList();
    }

    // --- 4. ADMIN: APROVAR HUNT ---
    @PutMapping("/{id}/approve")
    public Hunt approveHunt(@PathVariable Long id) {
        return repository.findById(id)
            .map(hunt -> {
                hunt.setApproved(true); // Carimba como aprovada
                return repository.save(hunt);
            })
            .orElse(null);
    }

    // --- 5. CRIAR NOVA HUNT (Nasce pendente por padrão) ---
    @PostMapping
    public Hunt createHunt(@RequestBody Hunt hunt) {
        // Garante que approved seja false ao criar (segurança extra)
        hunt.setApproved(false);
        return repository.save(hunt);
    }

    // --- 6. ATUALIZAR HUNT EXISTENTE ---
    @PutMapping("/{id}")
    public Hunt updateHunt(@PathVariable Long id, @RequestBody Hunt dadosAtualizados) {
        return repository.findById(id)
            .map(huntExistente -> {
                huntExistente.setTitle(dadosAtualizados.getTitle());
                huntExistente.setVocation(dadosAtualizados.getVocation());
                huntExistente.setLevel(dadosAtualizados.getLevel());
                huntExistente.setXp(dadosAtualizados.getXp());
                huntExistente.setProfit(dadosAtualizados.getProfit());
                huntExistente.setImgUrl(dadosAtualizados.getImgUrl());
                huntExistente.setVideoUrl(dadosAtualizados.getVideoUrl());
                // Obs: Não atualizamos o 'approved' aqui para evitar que alguém aprove via edição
                return repository.save(huntExistente);
            })
            .orElse(null);
    }

    // --- 7. DELETAR HUNT ---
    @DeleteMapping("/{id}")
    public void deleteHunt(@PathVariable Long id) {
        repository.deleteById(id);
    }

    // --- 8. UPLOAD DE IMAGEM ---
    @PostMapping("/upload")
    public String uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            String pastaUploads = "uploads/";
            Path pathPasta = Paths.get(pastaUploads);
            
            if (!Files.exists(pathPasta)) {
                Files.createDirectories(pathPasta);
            }

            String nomeArquivo = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path caminhoCompleto = pathPasta.resolve(nomeArquivo);

            Files.copy(file.getInputStream(), caminhoCompleto, StandardCopyOption.REPLACE_EXISTING);

            return "http://localhost:8080/images/" + nomeArquivo;

        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    // --- AUXILIAR: Extrair número do level ---
    private int extractLevel(String levelString) {
        try {
            String numbers = levelString.replaceAll("[^0-9]", "");
            return numbers.isEmpty() ? 0 : Integer.parseInt(numbers);
        } catch (Exception e) {
            return 0;
        }
    }
}