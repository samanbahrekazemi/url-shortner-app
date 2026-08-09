using System.Net;
using Microsoft.AspNetCore.Mvc.Testing;

namespace UrlShortener.WebApi.Tests;

public class HealthEndpointTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public HealthEndpointTests(WebApplicationFactory<Program> factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task GetV1Health_ReturnsOk()
    {
        var response = await _client.GetAsync("/api/v1/health");

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);

        var content = await response.Content.ReadAsStringAsync();
        Assert.Contains("\"status\":\"healthy\"", content);
        Assert.Contains("\"version\":\"v1\"", content);
    }

    [Fact]
    public async Task GetV2Health_ReturnsOk()
    {
        var response = await _client.GetAsync("/api/v2/health");

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);

        var content = await response.Content.ReadAsStringAsync();
        Assert.Contains("\"status\":\"healthy\"", content);
        Assert.Contains("\"version\":\"v2\"", content);
    }

    [Theory]
    [InlineData("/api/v1/health", "POST")]
    [InlineData("/api/v1/health", "PUT")]
    [InlineData("/api/v1/health", "DELETE")]
    [InlineData("/api/v2/health", "POST")]
    [InlineData("/api/v2/health", "PUT")]
    [InlineData("/api/v2/health", "DELETE")]
    public async Task HealthEndpoints_RejectNonGetMethods(string url, string method)
    {
        var request = new HttpRequestMessage(new HttpMethod(method), url);
        var response = await _client.SendAsync(request);

        Assert.Equal(HttpStatusCode.MethodNotAllowed, response.StatusCode);
    }

    [Fact]
    public async Task V1Health_ReturnsCorrectMediaType()
    {
        var response = await _client.GetAsync("/api/v1/health");

        Assert.Equal("application/json", response.Content.Headers.ContentType?.MediaType);
    }

    [Fact]
    public async Task V2Health_ReturnsCorrectMediaType()
    {
        var response = await _client.GetAsync("/api/v2/health");

        Assert.Equal("application/json", response.Content.Headers.ContentType?.MediaType);
    }
}
