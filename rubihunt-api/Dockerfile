# Usa uma imagem leve do Java 17
FROM eclipse-temurin:17-jdk-alpine

# Define a pasta de trabalho
WORKDIR /app

# Copia os arquivos do projeto para dentro do container
COPY . .

# Dá permissão para o Maven rodar e constrói o projeto
RUN chmod +x mvnw
RUN ./mvnw clean package -DskipTests

# Comando para iniciar o servidor
ENTRYPOINT ["java","-jar","target/rubihunt-api-0.0.1-SNAPSHOT.jar"]