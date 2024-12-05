# Build stage
FROM maven:3.9.9-eclipse-temurin-23 AS builder

WORKDIR /app

COPY pom.xml .
COPY mvnw .
COPY mvnw.cmd .
COPY .mvn ./.mvn
COPY src ./src

RUN ./mvnw clean package

# Runtime stage
FROM openjdk:23-slim-bullseye

WORKDIR /app

COPY --from=builder /app/target/clocks-api-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]