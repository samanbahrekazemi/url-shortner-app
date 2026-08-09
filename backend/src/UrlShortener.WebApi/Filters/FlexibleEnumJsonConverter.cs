using System.Text.Json;
using System.Text.Json.Serialization;

namespace UrlShortener.WebApi.Filters;

public sealed class FlexibleEnumJsonConverter<TEnum> : JsonConverter<TEnum>
    where TEnum : struct, Enum
{
    public override TEnum Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        if (reader.TokenType == JsonTokenType.Number && reader.TryGetInt32(out var num))
            return (TEnum)Enum.ToObject(typeof(TEnum), num);

        var raw = reader.GetString();
        if (raw is not null && Enum.TryParse<TEnum>(raw, ignoreCase: true, out var parsed))
            return parsed;

        throw new JsonException($"Cannot convert '{raw}' to enum {typeof(TEnum).Name}.");
    }

    public override void Write(Utf8JsonWriter writer, TEnum value, JsonSerializerOptions options) =>
        writer.WriteStringValue(value.ToString());
}

public sealed class FlexibleEnumJsonConverterFactory : JsonConverterFactory
{
    public override bool CanConvert(Type typeToConvert) => typeToConvert.IsEnum;

    public override JsonConverter CreateConverter(Type typeToConvert, JsonSerializerOptions options) =>
        (JsonConverter)Activator.CreateInstance(
            typeof(FlexibleEnumJsonConverter<>).MakeGenericType(typeToConvert))!;
}
