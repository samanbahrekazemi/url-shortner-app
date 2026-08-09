FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY Directory.Packages.props ./
COPY src/UrlShortener.Domain/ src/UrlShortener.Domain/
COPY src/UrlShortener.Application/ src/UrlShortener.Application/
COPY src/UrlShortener.Infrastructure/ src/UrlShortener.Infrastructure/
COPY src/UrlShortener.WebApi/ src/UrlShortener.WebApi/

RUN dotnet publish src/UrlShortener.WebApi/UrlShortener.WebApi.csproj \
    -c Release \
    -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends curl && rm -rf /var/lib/apt/lists/*
COPY --from=build /app/publish .
ENV ASPNETCORE_URLS=http://+:5030
EXPOSE 5030
ENTRYPOINT ["dotnet", "UrlShortener.WebApi.dll"]
