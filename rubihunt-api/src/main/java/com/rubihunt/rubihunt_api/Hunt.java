package com.rubihunt.rubihunt_api;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Hunt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String vocation;
    private String level;
    private String xp;
    private String profit;
    private String imgUrl;
    private String videoUrl;

    // NOVO CAMPO: Controle de Moderação
    // Começa como 'false', ou seja, a hunt nasce invisível no site.
    private boolean approved = false;

    // --- CONSTRUTORES ---

    // Construtor Vazio (Obrigatório para o JPA/Banco)
    public Hunt() {
    }

    // Construtor Completo
    public Hunt(String title, String vocation, String level, String xp, String profit, String imgUrl, String videoUrl) {
        this.title = title;
        this.vocation = vocation;
        this.level = level;
        this.xp = xp;
        this.profit = profit;
        this.imgUrl = imgUrl;
        this.videoUrl = videoUrl;
        this.approved = false; // Garante que nasce pendente
    }

    // --- GETTERS (Leitura) ---
    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getVocation() { return vocation; }
    public String getLevel() { return level; }
    public String getXp() { return xp; }
    public String getProfit() { return profit; }
    public String getImgUrl() { return imgUrl; }
    public String getVideoUrl() { return videoUrl; }
    
    // Getter especial para boolean (isApproved em vez de getApproved)
    public boolean isApproved() { return approved; }

    // --- SETTERS (Escrita/Edição) ---
    public void setTitle(String title) { this.title = title; }
    public void setVocation(String vocation) { this.vocation = vocation; }
    public void setLevel(String level) { this.level = level; }
    public void setXp(String xp) { this.xp = xp; }
    public void setProfit(String profit) { this.profit = profit; }
    public void setImgUrl(String imgUrl) { this.imgUrl = imgUrl; }
    public void setVideoUrl(String videoUrl) { this.videoUrl = videoUrl; }
    
    // Setter para o Admin aprovar ou reprovar
    public void setApproved(boolean approved) { this.approved = approved; }
}