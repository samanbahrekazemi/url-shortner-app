using Microsoft.AspNetCore.Authentication;
using System.Security.Claims;
using Microsoft.Extensions.Options;
using System.Text.Encodings.Web;

public class BasicAuthenticationHandler : AuthenticationHandler<AuthenticationSchemeOptions>
{
    private readonly IConfiguration _config;

    public BasicAuthenticationHandler(
        IOptionsMonitor<AuthenticationSchemeOptions> options,
        ILoggerFactory logger,
        UrlEncoder encoder,
        IConfiguration config)
        : base(options, logger, encoder)
    {
        _config = config;
    }

    protected override Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        if (!Request.Headers.ContainsKey("Authorization"))
            return Task.FromResult(AuthenticateResult.Fail("Missing Authorization header"));

        var authHeader = Request.Headers["Authorization"].ToString();
        if (!authHeader.StartsWith("Basic ", StringComparison.OrdinalIgnoreCase))
            return Task.FromResult(AuthenticateResult.Fail("Invalid Authorization header"));

        var encodedCredentials = authHeader.Substring("Basic ".Length).Trim();
        var credentials = System.Text.Encoding.UTF8.GetString(Convert.FromBase64String(encodedCredentials)).Split(':');

        if (credentials.Length != 2)
            return Task.FromResult(AuthenticateResult.Fail("Invalid credentials format"));

        var username = credentials[0];
        var password = credentials[1];

        // Get credentials from configuration (or hardcode for simplicity)
        var configUser = _config["Auth:User"] ?? "admin";
        var configPass = _config["Auth:Password"] ?? "admin";

        if (username != configUser || password != configPass)
            return Task.FromResult(AuthenticateResult.Fail("Invalid username or password"));

        var claims = new[] { new Claim(ClaimTypes.Name, username) };
        var identity = new ClaimsIdentity(claims, Scheme.Name);
        var principal = new ClaimsPrincipal(identity);
        var ticket = new AuthenticationTicket(principal, Scheme.Name);

        return Task.FromResult(AuthenticateResult.Success(ticket));
    }
}