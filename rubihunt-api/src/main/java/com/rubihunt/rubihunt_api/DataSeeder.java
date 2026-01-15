package com.rubihunt.rubihunt_api;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.util.Arrays;

@Component
public class DataSeeder implements CommandLineRunner {

    private final HuntRepository repository;

    public DataSeeder(HuntRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Só cria dados se o banco estiver vazio
        if (repository.count() == 0) {
            
            // 1. Criar uma Hunt APROVADA (Vai aparecer na Home)
            Hunt h1 = new Hunt();
            h1.setTitle("Asura Mirror");
            h1.setVocation("Knights,Paladins");
            h1.setLevel("400+");
            h1.setXp("8kk/h");
            h1.setProfit("500k/h");
            h1.setImgUrl("https://tibiawiki.com.br/images/e/e0/Asura_Palace.jpg");
            h1.setVideoUrl("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
            h1.setApproved(true); // <--- IMPORTANTE: Aprovada!
            
            // 2. Criar uma Hunt PENDENTE (Não aparece na Home, só no Admin)
            Hunt h2 = new Hunt();
            h2.setTitle("Cobra Bastion");
            h2.setVocation("Sorcerers,Druids");
            h2.setLevel("600+");
            h2.setXp("15kk/h");
            h2.setProfit("1.5kk/h");
            h2.setImgUrl("https://tibiawiki.com.br/images/6/66/Cobra_Bastion.jpg");
            h2.setVideoUrl("");
            h2.setApproved(false); // <--- IMPORTANTE: Reprovada/Pendente!

            // Salva as duas no banco
            repository.saveAll(Arrays.asList(h1, h2));
            
            System.out.println("--- DADOS DE TESTE CRIADOS COM SUCESSO ---");
        }
    }
}