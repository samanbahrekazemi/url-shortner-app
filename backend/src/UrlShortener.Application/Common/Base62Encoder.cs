
using System.Text;

namespace UrlShortener.Application.Common
{
    public class Base62Encoder
    {
        private const string Base62Chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        private static readonly Random _random = new();
        private static readonly object _lock = new();
        private static long _counter = DateTime.UtcNow.Ticks;

        /// <summary>
        /// Generate a Base62 slug with timestamp + counter (guarantees uniqueness)
        /// </summary>
        public string GenerateBase62Slug()
        {
            var timestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
            var counter = GetNextCounter();

            // Combine timestamp and counter for uniqueness
            var value = (timestamp << 20) + (counter & 0xFFFFF);

            return EncodeToBase62(value);
        }

        /// <summary>
        /// Generate a random Base62 slug (for short URLs)
        /// </summary>
        public string GenerateRandomBase62Slug(int length = 7)
        {
            var sb = new StringBuilder(length);

            for (int i = 0; i < length; i++)
            {
                lock (_lock)
                {
                    sb.Append(Base62Chars[_random.Next(Base62Chars.Length)]);
                }
            }

            return sb.ToString();
        }

        /// <summary>
        /// Encode a long number to Base62
        /// </summary>
        public string EncodeToBase62(long value)
        {
            if (value == 0)
                return Base62Chars[0].ToString();

            var sb = new StringBuilder();

            while (value > 0)
            {
                var remainder = (int)(value % 62);
                sb.Insert(0, Base62Chars[remainder]);
                value /= 62;
            }

            return sb.ToString();
        }

        /// <summary>
        /// Decode Base62 string back to long
        /// </summary>
        public long DecodeFromBase62(string base62)
        {
            long result = 0;

            foreach (char c in base62)
            {
                result = result * 62 + Base62Chars.IndexOf(c);
            }

            return result;
        }

        private static long GetNextCounter()
        {
            lock (_lock)
            {
                return ++_counter;
            }
        }
    }
}