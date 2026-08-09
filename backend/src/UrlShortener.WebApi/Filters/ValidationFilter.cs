using FluentValidation;
using Microsoft.AspNetCore.Http;
using System.Text.Json;

namespace UrlShortener.WebApi.Filters;

public sealed class ValidationFilter<T> : IEndpointFilter where T : class
{
    private readonly IValidator<T> _validator;

    public ValidationFilter(IValidator<T> validator)
    {
        _validator = validator;
    }

    public async ValueTask<object?> InvokeAsync(EndpointFilterInvocationContext context, EndpointFilterDelegate next)
    {
        var request = context.Arguments.OfType<T>().FirstOrDefault();
        if (request is null)
            return Results.BadRequest();

        var result = await _validator.ValidateAsync(request);
        if (!result.IsValid)
        {
            var errors = result.Errors
                .GroupBy(e => JsonNamingPolicy.SnakeCaseLower.ConvertName(e.PropertyName))
                .ToDictionary(
                    g => g.Key,
                    g => g.Select(e => e.ErrorMessage).ToArray());

            return Results.ValidationProblem(errors);
        }

        return await next(context);
    }
}
