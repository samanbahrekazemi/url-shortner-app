using FluentValidation;
using UrlShortener.Application.DTOs;

namespace UrlShortener.Application.Validators;

public sealed class CreateUrlRequestValidator : AbstractValidator<CreateUrlRequest>
{
    public CreateUrlRequestValidator()
    {
        RuleFor(x => x.OriginalUrl)
            .NotEmpty().WithMessage("URL is required.")
            .Must(uri => Uri.TryCreate(uri, UriKind.Absolute, out _))
            .WithMessage("URL must be a valid absolute URL.")
            .MaximumLength(2048).WithMessage("URL must not exceed 2048 characters.");
    }
}