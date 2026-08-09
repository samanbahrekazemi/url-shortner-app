using System.ComponentModel;
using System.Globalization;
using Microsoft.Extensions.DependencyInjection;

namespace UrlShortener.Application.Common;

public sealed class FlexibleEnumTypeConverter : TypeConverter
{
    public override bool CanConvertFrom(ITypeDescriptorContext? context, Type sourceType) =>
        sourceType == typeof(string) || base.CanConvertFrom(context, sourceType);

    public override object? ConvertFrom(ITypeDescriptorContext? context, CultureInfo? culture, object value)
    {
        if (value is not string s)
            return base.ConvertFrom(context, culture, value);

        var trimmed = s.Trim();
        var type = context?.Instance?.GetType()
                   ?? context?.PropertyDescriptor?.PropertyType
                   ?? throw new InvalidOperationException("Cannot resolve enum type.");

        if (int.TryParse(trimmed, out var num))
            return Enum.ToObject(type, num);

        if (Enum.TryParse(type, trimmed, ignoreCase: true, out var parsed))
            return parsed;

        return base.ConvertFrom(context, culture, value);
    }
}

public static class FlexibleEnumConfiguration
{
    public static void AddFlexibleEnums(this IServiceCollection services)
    {
        TypeDescriptor.AddProviderTransparent(new FlexibleEnumTypeDescriptionProvider(), typeof(Enum));
    }
}

internal sealed class FlexibleEnumTypeDescriptionProvider : TypeDescriptionProvider
{
    private static readonly FlexibleEnumTypeConverter Converter = new();

    public override ICustomTypeDescriptor? GetTypeDescriptor(Type objectType, object? instance) =>
        new Descriptor(objectType, base.GetTypeDescriptor(objectType, instance));

    private sealed class Descriptor : CustomTypeDescriptor
    {
        private readonly Type _type;
        public Descriptor(Type type, ICustomTypeDescriptor? parent) : base(parent) => _type = type;
        public override TypeConverter GetConverter() => _type.IsEnum ? Converter : base.GetConverter();
    }
}
