FROM mcr.microsoft.com/dotnet/sdk:10.0 AS base
WORKDIR /src
COPY Api/Api.csproj Api/
RUN dotnet restore Api/Api.csproj
COPY . .
RUN dotnet publish Api/Api.csproj -c Release -o /app

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app
COPY --from=base /app ./
ENV ASPNETCORE_URLS=http://+:5000
EXPOSE 5000
ENTRYPOINT ["dotnet", "Api.dll"]