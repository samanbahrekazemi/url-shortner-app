using System.Numerics;
using System.Security.Cryptography;
using System.Text;

namespace UrlShortener.Application.Common;

/// <summary>
/// XOR-Based Obfuscation Generator that produces short, obfuscated IDs
/// </summary>
public class XorObfuscationEncoder
{
    private const string Base62Chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    private static readonly RandomNumberGenerator _rng = RandomNumberGenerator.Create();
    private static long _counter = DateTime.UtcNow.Ticks;
    private static readonly object _lock = new();

    // Golden ratio constant for better distribution
    private const long XOR_KEY = unchecked((long)0x9E3779B97F4A7C15UL);
    private const long MIX_KEY = unchecked((long)0xBF58476D1CE4E5B9UL);

    /// <summary>
    /// Generate an obfuscated Base62 slug using XOR and bit mixing
    /// </summary>
    /// <param name="length">Desired length (default: 11)</param>
    public string GenerateSlug(int length = 11)
    {
        lock (_lock)
        {
            _counter++;

            // Get timestamp for time-sortability
            var timestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();

            // Combine counter and timestamp
            var combined = (_counter << 32) ^ (timestamp & 0xFFFFFFFF);

            // XOR obfuscation
            var obfuscated = XorMix(combined);

            // Encode to Base62
            var base62 = EncodeToBase62(obfuscated);

            // Ensure minimum length
            while (base62.Length < length)
            {
                // Add more randomness if needed
                var randomBytes = new byte[4];
                _rng.GetBytes(randomBytes);
                var randomInt = BitConverter.ToUInt32(randomBytes, 0);
                obfuscated = XorMix(obfuscated ^ randomInt);
                base62 = EncodeToBase62(obfuscated);
            }

            return base62[..Math.Min(length, base62.Length)];
        }
    }

    /// <summary>
    /// Generate a slug from a specific ID (for consistency)
    /// </summary>
    public string GenerateSlugFromId(long id, int length = 11)
    {
        var timestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
        var combined = (id << 32) ^ (timestamp & 0xFFFFFFFF);
        var obfuscated = XorMix(combined);
        var base62 = EncodeToBase62(obfuscated);

        return base62.Length >= length ? base62[..length] : base62.PadRight(length, '0');
    }

    /// <summary>
    /// Decode a slug back to its original ID
    /// </summary>
    public long DecodeSlug(string slug)
    {
        var value = DecodeFromBase62(slug);
        var unxored = XorUnmix(value);
        return unxored >> 32;
    }

    /// <summary>
    /// XOR mixing function with multiple passes for better obfuscation
    /// </summary>
    private long XorMix(long value)
    {
        // First pass: XOR with key
        value ^= XOR_KEY;

        // Second pass: Bit rotation and mixing
        value = ((value << 7) | ((value >> 57) & 0x7F)) ^ MIX_KEY;
        value = ((value >> 13) | ((value << 51) & 0x7FFFFFFFFFFFFFFFL)) ^ (XOR_KEY >> 32);
        value = ((value << 23) | ((value >> 41) & 0x7FFFFF)) ^ (MIX_KEY << 16);

        return value;
    }

    /// <summary>
    /// Reverse the XOR mixing
    /// </summary>
    private long XorUnmix(long value)
    {
        // Reverse third pass
        value ^= (MIX_KEY << 16);
        value = ((value >> 23) | ((value << 41) & 0x7FFFFFFFFFFFFFFFL));

        // Reverse second pass
        value ^= (XOR_KEY >> 32);
        value = ((value << 13) | ((value >> 51) & 0x1FFF));

        // Reverse first pass
        value ^= XOR_KEY;

        return value;
    }

    /// <summary>
    /// Encode a long to Base62
    /// </summary>
    private string EncodeToBase62(long value)
    {
        if (value == 0)
            return Base62Chars[0].ToString();

        var sb = new StringBuilder();
        var absValue = value > 0 ? value : -value;

        while (absValue > 0)
        {
            var remainder = (int)(absValue % 62);
            sb.Insert(0, Base62Chars[remainder]);
            absValue /= 62;
        }

        // Add sign indicator for negative numbers
        if (value < 0)
            sb.Insert(0, '-');

        return sb.ToString();
    }

    /// <summary>
    /// Encode a BigInteger to Base62
    /// </summary>
    private string EncodeToBase62(BigInteger value)
    {
        if (value == 0)
            return Base62Chars[0].ToString();

        var sb = new StringBuilder();
        var base62 = new BigInteger(62);
        var absValue = value > 0 ? value : -value;

        while (absValue > 0)
        {
            var remainder = (int)(absValue % 62);
            sb.Insert(0, Base62Chars[remainder]);
            absValue /= 62;
        }

        if (value < 0)
            sb.Insert(0, '-');

        return sb.ToString();
    }

    /// <summary>
    /// Decode Base62 string back to long
    /// </summary>
    private long DecodeFromBase62(string base62)
    {
        long result = 0;
        var startIndex = 0;
        var isNegative = false;

        if (base62.StartsWith('-'))
        {
            isNegative = true;
            startIndex = 1;
        }

        for (int i = startIndex; i < base62.Length; i++)
        {
            result = result * 62 + Base62Chars.IndexOf(base62[i]);
        }

        return isNegative ? -result : result;
    }

    /// <summary>
    /// Generate a timestamp-based slug (time-sortable)
    /// </summary>
    public string GenerateTimestampSlug(int length = 11)
    {
        var timestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
        var randomBytes = new byte[4];
        _rng.GetBytes(randomBytes);
        var random = BitConverter.ToUInt32(randomBytes, 0);

        var combined = (timestamp << 32) | random;
        var obfuscated = XorMix(combined);
        var base62 = EncodeToBase62(obfuscated);

        return base62.Length >= length ? base62[..length] : base62.PadRight(length, '0');
    }

    /// <summary>
    /// Generate a random slug (no timestamp, purely random)
    /// </summary>
    public string GenerateRandomSlug(int length = 11)
    {
        var bytes = new byte[8];
        _rng.GetBytes(bytes);
        var value = BitConverter.ToInt64(bytes, 0);
        var obfuscated = XorMix(value);
        var base62 = EncodeToBase62(obfuscated);

        return base62.Length >= length ? base62[..length] : base62.PadRight(length, '0');
    }

    /// <summary>
    /// Generate a slug with checksum for error detection
    /// </summary>
    public string GenerateSlugWithChecksum(int length = 10)
    {
        var slug = GenerateSlug(length);
        var checksum = CalculateChecksum(slug);
        return $"{slug}{checksum}";
    }

    private string CalculateChecksum(string input)
    {
        var sum = 0;
        foreach (var c in input)
        {
            sum += Base62Chars.IndexOf(c);
        }
        return Base62Chars[sum % 62].ToString();
    }

    public bool ValidateChecksum(string slugWithChecksum)
    {
        if (string.IsNullOrEmpty(slugWithChecksum) || slugWithChecksum.Length < 2)
            return false;

        var data = slugWithChecksum[..^1];
        var checksum = slugWithChecksum[^1];
        var expected = CalculateChecksum(data);
        return checksum == expected[0];
    }
}